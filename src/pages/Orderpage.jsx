import React from "react";
import { useOrder } from "../context/Ordercontext";
import { useAuth } from "../context/Authcontext";

const Orderspage = () => {
  const { orders = [], setOrders } = useOrder();
  const { user } = useAuth();

  const cancelOrder = (orderIndex) => {
    if (!user?.id) return;

    const updatedOrders = [...orders];
    updatedOrders.splice(orderIndex, 1);
    setOrders(updatedOrders);
    alert(" Order cancelled!");
    console.log(" Single order cancelled");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Your Orders</h2>
        
      </div>

      {orders.length === 0 ? (
        <p className="text-gray-500">You haven’t placed any orders yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order, index) => (
            <div
              key={`${order.id}-${index}`}
              className="bg-white rounded shadow p-4 hover:shadow-lg transition relative"
            >
              <img
                src={order.img?.startsWith("http")
                  ? order.img
                  : `/assets/${order.img?.replace(/^\/?assets\//, "")}`}
                alt={order.name}
                className="w-32 h-32 object-contain mx-auto mb-4"
              />
              <h3 className="text-lg font-medium text-center">{order.name}</h3>

              <p className="text-gray-500 text-center line-through">MRP: ₹{order.price?.toLocaleString() ?? "0"}</p>
              <p className="text-green-600 text-center font-bold">
                Discount: ₹{order.discount?.toLocaleString() ?? "0"}
              </p>

              <p className="text-sm text-gray-400 mt-2 text-center">
                Qty: {order.quantity} | Ordered on:{" "}
                {order.created_at
                  ? new Date(order.created_at).toLocaleDateString("en-IN")
                  : new Date().toLocaleDateString("en-IN")}
              </p>

              <button
                onClick={() => cancelOrder(index)}
                className="absolute top-2 right-2 text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orderspage;
