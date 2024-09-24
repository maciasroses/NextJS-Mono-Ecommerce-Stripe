"use server";

import prisma from "@/app/services/prisma";
import {
  read as readProduct,
  update as updateProduct,
} from "@/app/services/product/model";
import {
  readStockReservation,
  createStockReservation,
  deleteStockReservation,
  updateStockReservation,
} from "./model";
import type { ICartItem, IProduct, IStockReservation } from "@/app/interfaces";

export async function checkNUpdateStock(userId: string, cart: ICartItem[]) {
  const updateCart: ICartItem[] = [];
  const expiredReservations = (await readStockReservation({
    expired: true,
  })) as IStockReservation[];

  for (const reservation of expiredReservations) {
    await deleteStockReservation(reservation.id);
    await updateProduct({
      id: reservation.productId,
      data: {
        quantity: {
          increment: reservation.quantity,
        },
      },
    });
  }

  for (const item of cart) {
    const product = (await readProduct({ slug: item.id })) as IProduct;

    const reservation = (await readStockReservation({
      userId,
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
}

export async function reserverStock(userId: string, cart: ICartItem[]) {
  const reservations = await prisma.$transaction(async () => {
    const stockReservations = [];

    for (const item of cart) {
      const { id } = (await readProduct({ slug: item.id })) as IProduct;

      const existingReservation = (await readStockReservation({
        userId,
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

        await updateProduct({
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
          userId,
          productId: id,
          quantity: item.quantity,
        });

        await updateProduct({
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
}
