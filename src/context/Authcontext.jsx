import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

import { useCart } from "./Cartcontext";
import { useWishlist } from "./Wishlistcontext";
import { useOrder } from "./Ordercontext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { setCart, clearCart } = useCart();
  const { setWishlist, clearWishlist } = useWishlist();
  const { setOrders, clearOrders } = useOrder();

  const fetchUserData = useCallback(
    async (userId) => {
      try {
        const res = await fetch(`http://localhost:5000/api/userdata/${userId}`);
        if (!res.ok) throw new Error("Failed to fetch user data");
        const data = await res.json();

        console.log(" Cart from DB:", data.cart);
        console.log(" Wishlist from DB:", data.wishlist);
        console.log(" Orders from DB:", data.orders);

        setCart(data.cart || []);
        setWishlist(data.wishlist || []);
        setOrders(data.orders || []);
      } catch (error) {
        console.error(" Failed to fetch user data:", error);
      }
    },
    [setCart, setWishlist, setOrders]
  );


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setLoading(false);
      fetchUserData(parsedUser.id);
    } else {
      setLoading(false);
    }
  }, [fetchUserData]);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    fetchUserData(userData.id);
  };

  const register = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    fetchUserData(userData.id);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    clearCart();
    clearWishlist();
    clearOrders();
  };

  if (loading) {
    return (
      <div className="text-center text-gray-600 mt-10">
         Restoring your data...
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
