import React from "react";
import { useWishlist } from "../context/Wishlistcontext";
import { useCart } from "../context/Cartcontext";
import { useAuth } from "../context/Authcontext";
import { useOrder } from "../context/Ordercontext";
import { useNavigate, useLocation } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Offercard = ({ offer }) => {
  const { isWishlisted, addToWishlist, removeFromWishlist } = useWishlist();
  const { cart, addToCart } = useCart();
  const { placeOrder } = useOrder();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isInCart = cart?.some((item) => item.id === offer.id);
  const price = parseFloat(offer.price) || 0;
  const discount = parseFloat(offer.discount) || 0;
  const saved = Math.max(price - discount, 0);
  const discountPercent = price > 0 ? Math.round((saved / price) * 100) : 0;

  const handleWishlistClick = () => {
    if (!offer?.id) return;
    if (isWishlisted(offer.id)) {
      removeFromWishlist(offer.id);
    } else {
      addToWishlist(offer);
    }
  };

  const handleAddToCart = () => {
    if (!user) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    if (isInCart) {
      alert("❗ Item already in cart!");
    } else {
      addToCart({ ...offer, quantity: 1 });
      alert("🛒 Added to cart!");
    }
  };

  const handleShopNow = () => {
    if (!user) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    placeOrder({ ...offer, quantity: 1 });
    alert(" Order placed! Thank you.");
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 relative">
      {/* Wishlist Icon */}
      <div
        className="absolute top-2 right-2 text-xl cursor-pointer z-10"
        onClick={handleWishlistClick}
        title="Add to Wishlist"
      >
        {isWishlisted(offer.id) ? (
          <FaHeart className="text-red-500" />
        ) : (
          <FaRegHeart className="text-black" />
        )}
      </div>

     
      <img
        src={
          offer.img?.startsWith("http")
            ? offer.img
            : `/assets/${offer.img?.replace(/^\/?assets\//, "")}`
        }
        alt={offer.name}
        className="w-full h-40 object-contain mb-2"
        onError={(e) => {
          e.target.src = "/assets/default.jpg"; 
        }}
      />

      <h3 className="text-lg font-semibold">{offer.name}</h3>

      <div className="mt-1"> 
         <p className="text-sm text-gray-500 line-through">
            MRP: ₹{offer?.price ? Math.round(offer.price).toLocaleString() : "N/A"}</p>
         <p className="text-lg text-green-600">
           Discount: ₹{offer?.discount ? Math.round(offer.discount).toLocaleString() : "N/A"} </p>
         {saved > 0 && (
         <p className="text-xs text-orange-600 font-medium">
           You saved: ₹{Math.round(saved).toLocaleString()} ({discountPercent}% OFF)</p>)}
      </div>

      <div className="mt-4 flex gap-2">
        {isInCart ? (
          <button className="flex-1 bg-gray-300 py-2 rounded" disabled>
            Added
          </button>
        ) : (
          <button
            className="flex-1 bg-black text-white py-2 rounded hover:bg-gray-800"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        )}
        <button
          className="flex-1 border border-black py-2 rounded hover:bg-gray-100"
          onClick={handleShopNow}
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Offercard;
