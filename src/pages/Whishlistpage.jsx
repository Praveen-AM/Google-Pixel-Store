import React from "react";
import { useWishlist } from "../context/Wishlistcontext";
import { useAuth } from "../context/Authcontext";
import Offercard from "../components/Offercard";
import { FaHeart } from "react-icons/fa"; 

const Wishlistpage = () => {
  const { wishlist = [], setWishlist } = useWishlist();
  const { user } = useAuth();

  const removeFromWishlist = (productId) => {
    if (!user || !user.id) {
      console.error(" User not logged in");
      return;
    }

    console.log(" Removing from wishlist:", productId);
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>

      {wishlist.length === 0 ? (
        <p className="text-gray-600">You have no items in your wishlist.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlist.map((product, index) => (
            <div key={`${product.id || index}`} className="relative">
              <Offercard offer={product} />
              <FaHeart
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-2 right-2 text-red-500 text-xl cursor-pointer hover:text-red-600"
                title="Remove from Wishlist"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlistpage;
