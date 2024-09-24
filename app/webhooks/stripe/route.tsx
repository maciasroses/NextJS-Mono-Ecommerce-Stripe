import Stripe from "stripe";
import { Resend } from "resend";
import prisma from "@/app/services/prisma";
import OrderReceipt from "@/app/email/OrderReceipt";
import { NextRequest, NextResponse } from "next/server";
import { getProductBySlug } from "@/app/services/product/controller";
import { createOrderThroughStripeWebHook } from "@/app/services/order/controller";
import { createInventoryTransactionThroughStripeWebHook } from "@/app/services/inventoryTrans/controller";
import {
  readStockReservation,
  deleteStockReservation,
} from "@/app/services/stock/model";
import type {
  IOrder,
  IStockReservation,
  IOrderInfoForEmail,
} from "@/app/interfaces";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function POST(req: NextRequest) {
  const event = stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get("stripe-signature") as string,
    process.env.STRIPE_WEBHOOK_SECRET as string
  );

  if (event.type === "charge.succeeded") {
    const charge = event.data.object;
    const userId = charge.metadata.userId;
    const email = charge.billing_details.email;
    const productsIds = JSON.parse(charge.metadata.productsIds);
    const productsNames = JSON.parse(charge.metadata.productsNames);
    const productsFiles = JSON.parse(charge.metadata.productsFiles);
    const productsPrices = JSON.parse(charge.metadata.productsPrices);
    const productsQuantities = JSON.parse(charge.metadata.productsQuantities);

    if (email == null || userId == null || productsIds == null) {
      return new Response("Bad request", { status: 400 });
    }

    try {
      await prisma.$transaction(async () => {
        const order = (await createOrderThroughStripeWebHook({
          userId,
          productsIds,
          productsPrices,
          productsQuantities,
          totalInCents: charge.amount,
        })) as IOrder;

        for (const productSlug of productsIds) {
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
          email,
          order,
          products: productsNames.map((name: string, index: number) => ({
            name,
            file: productsFiles[index],
            price: productsPrices[index],
            quantity: productsQuantities[index],
          })),
          totalInCents: charge.amount,
        };

        await resend.emails.send({
          from: `Ecommerce <${process.env.RESEND_EMAIL}>`,
          to: email,
          subject: "Your receipt from Ecommerce",
          react: <OrderReceipt order={orderInfoForEmail} />,
        });
      });
    } catch (error) {
      console.error(error);
      return new Response("Failed to create order", { status: 500 });
    }
  }

  return new NextResponse();
}
