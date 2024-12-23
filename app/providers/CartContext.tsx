import { isAuthenticated as IsAuth } from "@/app/shared/services/auth";
import {
  useState,
  useEffect,
  ReactNode,
  useCallback,
  createContext,
} from "react";
import {
  getMyCart,
  mergeCarts,
  addToMyCart,
  clearMyCart,
  createMyNewCart,
  deleteFromMyCart,
} from "@/app/shared/services/cart/controller";
import type { ICartItem } from "@/app/shared/interfaces";

export interface ICartContext {
  cart: ICartItem[];
  addToCart: (item: ICartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<ICartContext | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<ICartItem[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = useCallback(async () => {
    try {
      const session = await IsAuth();
      setIsAuthenticated(session ? true : false);
    } catch (error) {
      console.error(error);
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    const loadCart = async () => {
      if (isAuthenticated) {
        const localCart =
          typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("cart") || "[]")
            : [];
        if (localCart.length > 0) {
          await mergeCarts(localCart);
          localStorage.removeItem("cart");
        }

        const myCart = await getMyCart();
        if (myCart) {
          setCart(
            myCart.items.map((item) => ({
              id: item.product.slug,
              name: item.product.name,
              file: item.product.files[0]?.url || "",
              price: item.priceInCents,
              quantity: item.quantity,
              maximumQuantityPerOrder: item.product.maximumQuantityPerOrder,
            }))
          );
        } else {
          await createMyNewCart();
          setCart([]);
        }
      } else if (typeof window !== "undefined") {
        const cartData = localStorage.getItem("cart");
        if (cartData && JSON.parse(cartData).length > 0) {
          setCart(JSON.parse(cartData));
        }
      }
    };

    checkAuth();
    loadCart();
  }, [isAuthenticated, checkAuth]);

  useEffect(() => {
    if (!isAuthenticated && typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isAuthenticated]);

  const addToCart = useCallback(
    async (item: ICartItem) => {
      if (isAuthenticated) {
        try {
          await addToMyCart(item);
        } catch (error) {
          console.error("Error adding item to the database cart:", error);
          return;
        }
      }
      setCart((prevCart) => {
        const itemIndex = prevCart.findIndex(
          (cartItem) => cartItem.id === item.id
        );
        const maxQuantity = item.maximumQuantityPerOrder;

        if (itemIndex >= 0) {
          const updatedCart = [...prevCart];
          const newQuantity = updatedCart[itemIndex].quantity + item.quantity;

          if (newQuantity > maxQuantity) {
            return prevCart;
          }

          updatedCart[itemIndex] = {
            ...updatedCart[itemIndex],
            quantity: newQuantity,
          };
          return updatedCart;
        } else {
          if (item.quantity > maxQuantity) {
            return prevCart;
          }
          return [...prevCart, item];
        }
      });
    },
    [isAuthenticated]
  );

  const removeFromCart = useCallback(
    async (id: string) => {
      if (isAuthenticated) {
        try {
          await deleteFromMyCart(id);
        } catch (error) {
          console.error("Error removing item from the database cart.", error);
        }
      }
      setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    },
    [isAuthenticated]
  );

  const clearCart = useCallback(async () => {
    if (isAuthenticated) {
      try {
        await clearMyCart();
      } catch (error) {
        console.error("Error clearing cart from the database.", error);
      }
    }
    setCart([]);
  }, [isAuthenticated]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
