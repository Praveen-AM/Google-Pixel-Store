import React from "react";
import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <img
        src="/assets/thankyou.png"
        alt="Thank You"
        className="w-40 h-40 mb-6"
      />
      <h2 className="text-2xl font-bold text-green-600 mb-2">Thank You!</h2>
      <p className="text-gray-700 mb-6">Your order has been placed successfully.</p>
      <Link
        to="/"
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default ThankYou;
