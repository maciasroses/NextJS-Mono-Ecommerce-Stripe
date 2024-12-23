"use server";

import { isAuthenticated } from "@/app/shared/services/auth";
import { getProductBySlug } from "@/app/shared/services/product/controller";
import {
  readCart,
  createCart,
  deleteCart,
  createCartItem,
  deleteCartItem,
  updateCartItem,
} from "../model";
import type { ICartItem, IProduct } from "@/app/shared/interfaces";

export async function getMyCart() {
  try {
    const session = await isAuthenticated();
    return await readCart({
      userId: session.userId as string,
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function createMyNewCart() {
  try {
    const session = await isAuthenticated();
    return await createCart({
      data: {
        userId: session.userId as string,
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function addToMyCart(item: ICartItem) {
  try {
    const session = await isAuthenticated();
    if (!session) throw new Error("Usuario no autenticado");

    const cart = await getMyCart();
    if (!cart) throw new Error("Carrito no encontrado");

    const productItem = (await getProductBySlug({ slug: item.id })) as IProduct;
    if (!productItem) throw new Error("Producto no encontrado");

    // Validar cantidad máxima
    if (item.quantity > productItem.maximumQuantityPerOrder) {
      throw new Error(
        `No puedes agregar más de ${productItem.maximumQuantityPerOrder} unidades de este producto.`
      );
    }

    const existingItem = cart.items.find(
      (cartItem) => cartItem.product.slug === item.id
    );

    const totalQuantity =
      (existingItem ? existingItem.quantity : 0) + item.quantity;

    // Verificar límite total
    if (totalQuantity > productItem.maximumQuantityPerOrder) {
      throw new Error(
        `No puedes tener más de ${productItem.maximumQuantityPerOrder} unidades de este producto en el carrito.`
      );
    }

    if (existingItem) {
      await updateCartItem({
        where: { id: existingItem.id },
        data: { quantity: totalQuantity },
      });
    } else {
      await createCartItem({
        data: {
          cart: { connect: { id: cart.id } },
          product: { connect: { id: productItem.id } },
          quantity: item.quantity,
          priceInCents: item.price,
        },
      });
    }
  } catch (error) {
    console.error("Error al agregar al carrito:", error);
    return null;
  }
}

export async function deleteFromMyCart(itemId: string) {
  try {
    const session = await isAuthenticated();
    if (!session) throw new Error("Usuario no autenticado");

    const cart = await getMyCart();
    if (!cart) throw new Error("Carrito no encontrado");

    const productItem = (await getProductBySlug({ slug: itemId })) as IProduct;
    if (!productItem) throw new Error("Producto no encontrado");

    await deleteCartItem({
      where: {
        productId_cartId: {
          productId: productItem.id,
          cartId: cart.id,
        },
      },
    });
  } catch (error) {
    console.error("Error al eliminar del carrito:", error);
    return null;
  }
}

export async function clearMyCart() {
  try {
    const session = await isAuthenticated();
    if (!session) throw new Error("Usuario no autenticado");

    await deleteCart({
      where: { userId: session.userId as string },
    });
  } catch (error) {
    console.error("Error al limpiar el carrito:", error);
    return null;
  }
}

export async function mergeCarts(localCart: ICartItem[]) {
  try {
    const session = await isAuthenticated();
    if (!session) throw new Error("Usuario no autenticado");

    const remoteCart = await getMyCart();
    if (!remoteCart) throw new Error("Carrito remoto no encontrado");

    for (const localItem of localCart) {
      const product = (await getProductBySlug({
        slug: localItem.id,
      })) as IProduct;
      if (!product)
        throw new Error(`Producto con slug ${localItem.id} no encontrado`);

      const maximumQuantityPerOrder = product.maximumQuantityPerOrder;

      const remoteItem = remoteCart.items.find(
        (remoteCartItem) => remoteCartItem.product.slug === localItem.id
      );

      const totalQuantity =
        (remoteItem ? remoteItem.quantity : 0) + localItem.quantity;

      if (totalQuantity > maximumQuantityPerOrder) {
        const quantityToAdd =
          maximumQuantityPerOrder - (remoteItem?.quantity || 0);

        if (quantityToAdd > 0) {
          if (remoteItem) {
            await updateCartItem({
              where: { id: remoteItem.id },
              data: { quantity: remoteItem.quantity + quantityToAdd },
            });
          } else {
            await createCartItem({
              data: {
                cart: { connect: { id: remoteCart.id } },
                product: { connect: { id: product.id } },
                quantity: quantityToAdd,
                priceInCents: product.priceInCents,
              },
            });
          }
        }
      } else {
        if (remoteItem) {
          await updateCartItem({
            where: { id: remoteItem.id },
            data: { quantity: totalQuantity },
          });
        } else {
          await createCartItem({
            data: {
              cart: { connect: { id: remoteCart.id } },
              product: { connect: { id: product.id } },
              quantity: localItem.quantity,
              priceInCents: product.priceInCents,
            },
          });
        }
      }
    }
  } catch (error) {
    console.error("Error al fusionar el carrito:", error);
    return null;
  }
}
