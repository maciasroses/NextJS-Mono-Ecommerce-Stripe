import Stripe from "stripe";
import { Resend } from "resend";
import prisma from "@/app/shared/services/prisma";
import OrderReceipt from "@/app/email/OrderReceipt";
import { NextRequest, NextResponse } from "next/server";
import { getProductBySlug } from "@/app/shared/services/product/controller";
import { createOrderThroughStripeWebHook } from "@/app/shared/services/order/controller";
import {
  readStockReservation,
  deleteStockReservation,
} from "@/app/shared/services/stock/model";
import { createInventoryTransactionThroughStripeWebHook } from "@/app/shared/services/inventoryTrans/controller";
import type {
  IOrder,
  IStockReservation,
  IOrderInfoForEmail,
} from "@/app/shared/interfaces";

const resend = new Resend(process.env.RESEND_API_KEY as string);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      await req.text(),
      req.headers.get("stripe-signature") as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err);
    return new NextResponse("Webhook signature verification failed", {
      status: 400,
    });
  }

  if (event.type === "charge.succeeded") {
    const charge = event.data.object;
    const {
      userId,
      productsIds,
      productsNames,
      productsFiles,
      productsPrices,
      productsQuantities,
    } = charge.metadata;

    if (
      !userId ||
      !productsIds ||
      !productsNames ||
      !productsFiles ||
      !productsPrices ||
      !productsQuantities
    ) {
      console.error("Missing or invalid metadata in charge");
      return new NextResponse("Bad request", { status: 400 });
    }

    try {
      await prisma.$transaction(async () => {
        const order = (await createOrderThroughStripeWebHook({
          userId,
          productsIds: JSON.parse(productsIds),
          productsPrices: JSON.parse(productsPrices),
          productsQuantities: JSON.parse(productsQuantities),
          totalInCents: charge.amount,
        })) as IOrder;

        for (const productSlug of JSON.parse(productsIds)) {
          const { id: productId } = (await getProductBySlug({
            slug: productSlug,
          })) as { id: string };

          const reservation = (await readStockReservation({
            userId,
            productId,
            isForSripeWebHook: true,
          })) as IStockReservation;

          if (reservation) {
            await createInventoryTransactionThroughStripeWebHook({
              productId,
              quantity: reservation.quantity,
              description: `Product ${productId} sold in order ${order.id}`,
            });

            await deleteStockReservation(reservation.id);
          }
        }

        const orderInfoForEmail: IOrderInfoForEmail = {
          email: charge.billing_details.email ?? "no-reply@example.com",
          order,
          products: JSON.parse(productsNames).map(
            (name: string, index: number) => ({
              name,
              file: JSON.parse(productsFiles)[index],
              price: JSON.parse(productsPrices)[index],
              quantity: JSON.parse(productsQuantities)[index],
            })
          ),
          totalInCents: charge.amount,
        };

        try {
          await resend.emails.send({
            from: `Ecommerce <${process.env.RESEND_EMAIL}>`,
            to: charge.billing_details.email ?? "no-reply@example.com",
            subject: "Your receipt from Ecommerce",
            react: <OrderReceipt order={orderInfoForEmail} />,
          });
        } catch (emailError) {
          console.error("Error sending email receipt:", emailError);
          throw new Error("Failed to send email receipt");
        }
      });
    } catch (error) {
      console.error("Transaction failed:", error);
      return new NextResponse("Failed to create order", { status: 500 });
    }
  }

  return new NextResponse("Webhook handled successfully", { status: 200 });
}
