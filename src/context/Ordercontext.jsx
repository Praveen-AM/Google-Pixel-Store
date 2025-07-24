import React, { createContext, useContext, useState } from "react";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

 
  const placeOrder = (order) => {
    if (!order?.id) {
      console.error(" Missing order.id");
      return;
    }

    const newOrder = {
      ...order,
      orderId: Date.now(), 
      quantity: order.quantity || 1,
      orderedAt: new Date().toISOString(), 
    };

    setOrders((prev) => [...prev, newOrder]);
    console.log(" Order placed:", order.name);
  };


  const cancelOrderById = (orderId) => {
    setOrders((prev) => prev.filter((order) => order.orderId !== orderId));
    console.log(" Order cancelled:", orderId);

    alert(" Order cancelled successfully");
  };

  const getUserOrders = (userId) => {
    return orders.filter((order) => order.userId === userId);
  };

  const clearOrders = () => {
    setOrders([]);
    console.log("🧹 Orders cleared");
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        setOrders,
        placeOrder,
        getUserOrders,
        cancelOrderById,
        clearOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
