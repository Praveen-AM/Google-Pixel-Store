import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-12 border-t">
      <div className="max-w-7xl mx-auto px-4 py-8 text-sm text-gray-600 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">Shop</h4>
          <ul className="space-y-1">
            <li><a href="/" className="hover:underline">Phones</a></li>
            <li><a href="/" className="hover:underline">Buds</a></li>
            <li><a href="/" className="hover:underline">Accessories</a></li>
            <li><a href="/" className="hover:underline">Nest Devices</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">Support</h4>
          <ul className="space-y-1">
            <li><a href="/" className="hover:underline">Help Center</a></li>
            <li><a href="/" className="hover:underline">Contact Us</a></li>
            <li><a href="/" className="hover:underline">Warranty</a></li>
            <li><a href="/" className="hover:underline">Order Tracking</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">Connect</h4>
          <div className="flex gap-4 text-xl text-gray-700">
            <a href="/"><FaFacebookF className="hover:text-blue-600" /></a>
            <a href="/"><FaTwitter className="hover:text-sky-500" /></a>
            <a href="/"><FaInstagram className="hover:text-pink-500" /></a>
            <a href="/"><FaYoutube className="hover:text-red-600" /></a>
          </div>
          <p className="mt-4 text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Google Store Clone
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;