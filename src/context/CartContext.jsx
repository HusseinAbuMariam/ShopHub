import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([
    { id: 3, name: "Wireless Headphones", price: 79, quantity: 1, image: "/assets/headphones.svg" },
  ]);

  const addToCart = (product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => setItems((prev) => prev.filter((item) => item.id !== id));

  const updateQuantity = (id, nextQuantity) => {
    if (nextQuantity <= 0) return removeFromCart(id);
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: nextQuantity } : item))
    );
  };

  const clearCart = () => setItems([]);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const value = useMemo(
    () => ({ items, addToCart, removeFromCart, updateQuantity, clearCart, itemCount, subtotal }),
    [items, itemCount, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};
