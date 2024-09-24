import cron from "node-cron";
import { update as updateProduct } from "@/app/services/product/model";
import {
  deleteStockReservation,
  readStockReservation,
} from "@/app/services/stock/model";
import type { IStockReservation } from "@/app/interfaces";

cron.schedule("0 0 * * *", async () => {
  console.log("Clearing expired stock reservations...");

  try {
    const expiredReservations = (await readStockReservation({
      expired: true,
    })) as IStockReservation[];

    for (const reservation of expiredReservations) {
      await updateProduct({
        id: reservation.productId,
        data: {
          quantity: {
            increment: reservation.quantity,
          },
        },
      });

      await deleteStockReservation(reservation.id);

      console.log(
        `Cleared reservation for product ${reservation.productId}. Restored ${reservation.quantity} items to stock`
      );
    }

    console.log(
      `Expired stock reservations cleared: ${expiredReservations.length}`
    );
  } catch (error) {
    console.error("Error clearing expired stock reservations: ", error);
  }
});
