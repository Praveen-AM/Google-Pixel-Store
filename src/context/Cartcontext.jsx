import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

 
  const addToCart = (item) => {
    if (!item?.id) {
      console.error(" Invalid item");
      return;
    }

    setCart((prevCart) => {
      const exists = prevCart.find((c) => c.id === item.id);
      return exists
        ? prevCart.map((c) =>
            c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
          )
        : [...prevCart, { ...item, quantity: 1 }];
    });

    console.log(" Item added to cart:", item.name);
  };


  const removeFromCart = (productId) => {
    if (!productId) return;

    setCart((prev) => prev.filter((item) => item.id !== productId));
    console.log(" Removed from cart product ID:", productId);
  };


  const clearCart = () => {
    setCart([]);
    console.log("🧹 Cart cleared");
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price =
        typeof item.discount === "string"
          ? parseFloat(item.discount.replace(/[₹,]/g, ""))
          : parseFloat(item.discount) || 0;
      return total + price * item.quantity;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
