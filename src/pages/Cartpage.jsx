import React from "react";
import { useCart } from "../context/Cartcontext";
import { useAuth } from "../context/Authcontext";
import { useOrder } from "../context/Ordercontext";

const Cartpage = () => {
  const { cart, setCart, clearCart } = useCart();
  const { user } = useAuth();
  const { setOrders } = useOrder();


  const safeGetCartTotal = () => {
    return (cart || []).reduce((total, item) => {
      const price = parseFloat(item?.discount) || 0;
      const qty = parseInt(item?.quantity) || 1;
      return total + price * qty;
    }, 0);
  };


  const handleRemove = (productId) => {
    if (!user || !user.id) {
      alert("Please log in to remove items.");
      return;
    }

    setCart((prev) => prev.filter((item) => item.id !== productId));
    console.log(" Removed from cart:", productId);
  };

 
  const placeOrder = () => {
    if (!user) {
      alert("Please log in to place an order.");
      return;
    }

    if (cart.length === 0) {
      alert("🛒 Your cart is empty.");
      return;
    }

    alert(" Order placed successfully!");
    setOrders((prev) => [...prev, ...cart]);
    clearCart();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">🛒 Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-6">
            {cart.map((item, index) => {
              const price = parseFloat(item?.discount) || 0;
              const mrp = parseFloat(item?.price) || 0;
              const quantity = parseInt(item?.quantity) || 1;


              return (
                <div
                  key={`${item.id}-${index}`}
                  className="border p-4 flex flex-col sm:flex-row justify-between items-center"
                >
                  <div className="w-full sm:w-32 mb-4 sm:mb-0">
                    <img
                      src={item.img?.startsWith("http")
                        ? item.img
                        : `/assets/${item.img?.replace(/^\/?assets\//, "")}`}
                      alt={item?.name}
                      className="w-full h-auto object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/assets/default.jpg"; 
                      }}
                    />
                  </div>

                  <div className="flex-1 sm:ml-4 text-center sm:text-left">
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-gray-500 text-sm">Quantity: {quantity}</p>
                    <p className="text-gray-500 text-sm">Item: {item.name}</p>
                    <p className="text-sm mt-1">
                      <span className="text-gray-400 line-through mr-2">
                        ₹{mrp.toLocaleString()}
                      </span>
                      <span className="text-green-700 font-bold">
                        ₹{price.toLocaleString()}
                      </span>
                    </p>

                  </div>

                  <button
                    className="text-red-500 underline mt-2 sm:mt-0"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center sm:text-right">
            <p className="text-xl font-medium mb-2">
              Total: ₹{safeGetCartTotal().toLocaleString()}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-end">
              <button
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
                onClick={placeOrder}
              >
                Place Order
              </button>

              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cartpage;
