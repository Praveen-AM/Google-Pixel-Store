import { useAuth } from "../context/Authcontext";
import { useCart } from "../context/Cartcontext";
import { useWishlist } from "../context/Wishlistcontext";

const ProductCard = ({ product }) => {
  const { user } = useAuth();
  const { cart, setCart } = useCart();
  const { wishlist, setWishlist } = useWishlist();


  const originalPrice = parseFloat(product?.price) || 0;
  const discount = parseFloat(product?.discount) || 0;
  const finalPrice = originalPrice - discount;

  const addToCart = async () => {
    if (!user) return alert("Please log in");

    const res = await fetch("http://localhost:5000/api/cart/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id, productId: product.id, quantity: 1 }),
    });

    if (res.ok) {
      setCart([...cart, { product_id: product.id, quantity: 1 }]);
      console.log(" Added to cart:", product.name);
    }
  };

  const removeFromCart = async () => {
    const res = await fetch("http://localhost:5000/api/cart/remove", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id, productId: product.id }),
    });

    if (res.ok) {
      setCart(cart.filter((item) => item.product_id !== product.id));
      console.log(" Removed from cart:", product.name);
    }
  };

  const addToWishlist = async () => {
    if (!user) return alert("Please log in");

    const res = await fetch("http://localhost:5000/api/wishlist/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id, productId: product.id }),
    });

    if (res.ok) {
      setWishlist([...wishlist, product.id]);
      console.log(" Added to wishlist:", product.name);
    }
  };

  const removeFromWishlist = async () => {
    const res = await fetch("http://localhost:5000/api/wishlist/remove", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id, productId: product.id }),
    });

    if (res.ok) {
      setWishlist(wishlist.filter((id) => id !== product.id));
      console.log(" Removed from wishlist:", product.name);
    }
  };

  return (
    <div className="p-4 border rounded shadow-sm bg-white max-w-sm">
      <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
      <p className="text-gray-500 line-through">₹{originalPrice.toLocaleString("en-IN")}</p>
      <p className="text-green-600 font-bold mb-3">
        ₹{finalPrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
      </p>

      <div className="flex flex-col gap-2">
        <button onClick={addToCart} className="bg-black text-white px-4 py-1 rounded hover:bg-gray-800">
          Add to Cart
        </button>
        <button onClick={removeFromCart} className="bg-gray-200 text-black px-4 py-1 rounded hover:bg-gray-300">
          Remove from Cart
        </button>
        <button onClick={addToWishlist} className="bg-pink-600 text-white px-4 py-1 rounded hover:bg-pink-700">
          Add to Wishlist
        </button>
        <button onClick={removeFromWishlist} className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">
          Remove from Wishlist
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
