import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { useCart } from "../context/Cartcontext";
import { useWishlist } from "../context/Wishlistcontext";
import { useAuth } from "../context/Authcontext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { user, logout } = useAuth();

  const cartCount = (cart || []).reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = (wishlist || []).length;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/">
          <img
            src="/assets/google-logo.png"
            alt="Google"
            className="h-6 w-auto"
          />
        </Link>

        <ul className="hidden md:flex items-center gap-6 font-medium text-gray-700 relative">
          <li>
            <Link to="/" className="hover:text-blue-600">Products</Link>
          </li>

          {user && (
            <li>
              <Link to="/orders" className="hover:text-indigo-600">Orders</Link>
            </li>
          )}

          <li className="relative">
            <Link to="/wishlist" className="hover:text-red-500 flex items-center gap-1">
              <FaHeart />
              Wishlist
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>
          </li>

          <li className="relative">
            <Link to="/cart" className="hover:text-green-600 flex items-center gap-1">
              <FaShoppingCart />
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-green-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </li>

          <li ref={dropdownRef} className="relative">
            {user ? (
              <>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-1 text-gray-700 hover:text-blue-600"
                  title="Account"
                >
                  <FaUser className="text-lg" />
                  <span className="text-sm font-medium">{user.username}</span>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-36 bg-white border rounded shadow z-50">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      <FaUser className="inline mr-1" />
                      {user.username}
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <FaSignOutAlt className="inline mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login" className="flex items-center gap-1 hover:text-blue-600">
                <FaUser />
                Login
              </Link>
            )}
          </li>
        </ul>

        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl text-gray-700">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white shadow px-4 py-4 space-y-3 text-gray-700 font-medium">
          {user && (
            <div className="text-sm text-gray-600 font-semibold border-b pb-2 flex items-center gap-1">
              <FaUser />
              {user.username}
            </div>
          )}

          <Link to="/" onClick={() => setMenuOpen(false)} className="block hover:text-blue-600">
            Products
          </Link>

          {user && (
            <Link to="/orders" onClick={() => setMenuOpen(false)} className="block hover:text-indigo-600">
              Orders
            </Link>
          )}

          <Link to="/wishlist" onClick={() => setMenuOpen(false)} className="block hover:text-red-500">
            Wishlist {wishlistCount > 0 && <span className="text-xs ml-1">({wishlistCount})</span>}
          </Link>

          <Link to="/cart" onClick={() => setMenuOpen(false)} className="block hover:text-green-600">
            Cart {cartCount > 0 && <span className="text-xs ml-1">({cartCount})</span>}
          </Link>

          {user ? (
            <button
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
              className="text-red-600 hover:underline"
            >
              <FaSignOutAlt className="inline mr-1" /> Logout
            </button>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)} className="block hover:text-blue-600">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
