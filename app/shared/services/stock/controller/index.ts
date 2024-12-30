"use server";

import prisma from "@/app/shared/services/prisma";
import { isAuthenticated } from "@/app/shared/services/auth";
import {
  readProductVariant,
  updateProductVariant,
} from "@/app/shared/services/product/model";
import {
  readStockReservation,
  createStockReservation,
  deleteStockReservation,
  updateStockReservation,
} from "../model";
import type {
  ICartItem,
  IProductVariant,
  IStockReservation,
} from "@/app/shared/interfaces";

export async function checkNUpdateStock(cart: ICartItem[]) {
  try {
    const updateCart: ICartItem[] = [];
    const expiredReservations = (await readStockReservation({
      expired: true,
    })) as IStockReservation[];

    for (const reservation of expiredReservations) {
      await deleteStockReservation(reservation.id);
      await updateProductVariant({
        id: reservation.productId,
        data: {
          quantity: {
            increment: reservation.quantity,
          },
        },
      });
    }

    const session = await isAuthenticated();

    for (const item of cart) {
      const product = (await readProductVariant({
        id: item.id,
      })) as IProductVariant;

      const reservation = (await readStockReservation({
        userId: session.userId as string,
        productId: product.id,
      })) as IStockReservation;

      if (!product || (product.quantity === 0 && !reservation)) {
        continue;
      }

      const totalAvailable = product.quantity + (reservation?.quantity || 0);

      if (totalAvailable < item.quantity) {
        updateCart.push({ ...item, quantity: totalAvailable });
      } else {
        updateCart.push(item);
      }
    }
    return updateCart;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to check and update stock");
  }
}

export async function reserverStock(cart: ICartItem[]) {
  try {
    const session = await isAuthenticated();
    const reservations = await prisma.$transaction(async () => {
      const stockReservations = [];

      for (const item of cart) {
        const { id } = (await readProductVariant({
          id: item.id,
        })) as IProductVariant;

        const existingReservation = (await readStockReservation({
          userId: session.userId as string,
          productId: id,
        })) as IStockReservation;

        if (existingReservation) {
          const updatedReservation = await updateStockReservation({
            id: existingReservation.id,
            data: {
              quantity: item.quantity,
              expiresAt: new Date(Date.now() + 1000 * 60 * 15),
            },
          });

          await updateProductVariant({
            id,
            data: {
              quantity: {
                decrement: item.quantity - existingReservation.quantity,
              },
            },
          });

          stockReservations.push(updatedReservation);
        } else {
          const reservation = await createStockReservation({
            userId: session.userId as string,
            productId: id,
            quantity: item.quantity,
          });

          await updateProductVariant({
            id,
            data: {
              quantity: {
                decrement: item.quantity,
              },
            },
          });

          stockReservations.push(reservation);
        }
      }
      return stockReservations;
    });
    return reservations;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to reserve stock");
  }
}
