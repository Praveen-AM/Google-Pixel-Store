import React, { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (item) => {
    if (!item?.id) return;
    const alreadyExists = wishlist.some((w) => w.id === item.id);
    if (!alreadyExists) {
      setWishlist((prev) => [...prev, item]);
    }
  };

  const removeFromWishlist = (productId) => {
    if (!productId) return;
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  const toggleWishlist = (item) => {
    if (!item?.id) return;
    const exists = wishlist.some((w) => w.id === item.id);
    exists ? removeFromWishlist(item.id) : addToWishlist(item);
  };

  const isWishlisted = (id) => wishlist.some((item) => item.id === id);

  const clearWishlist = () => setWishlist([]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        setWishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isWishlisted,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
