import { useEffect } from "react";
import { useAuth } from "../context/Authcontext";
import { useCart } from "../context/Cartcontext";
import { useWishlist } from "../context/Wishlistcontext";
import { useOrder } from "../context/Ordercontext";

const LogoutHandler = () => {
  const { user } = useAuth();
  const { clearCart } = useCart();
  const { clearWishlist } = useWishlist();
  const { clearOrders } = useOrder();

  useEffect(() => {
    if (!user) {
      clearCart();
      clearWishlist();
      clearOrders();
    }
  }, [user]); 

  return null;
};

export default LogoutHandler;
