import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const getStoredUser = () => {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  };

  const [isLoggedIn, setIsLoggedIn] = useState(!!getStoredUser());
  const [currentUser, setCurrentUser] = useState(getStoredUser());

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setCurrentUser(userData);
    setIsLoggedIn(true);
  };

  const addToCart = (product) => {
    if (!isLoggedIn) return;
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) =>
    setItems((prev) => prev.filter((item) => item.id !== id));

  const updateQuantity = (id, nextQuantity) => {
    if (nextQuantity <= 0) return removeFromCart(id);
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: nextQuantity } : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const logout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setCurrentUser(null);
    clearCart();
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const value = useMemo(
    () => ({
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      itemCount,
      subtotal,
      isLoggedIn,
      setIsLoggedIn,
      currentUser,
      login,
      logout,
    }),
    [items, itemCount, subtotal, isLoggedIn, currentUser]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};
