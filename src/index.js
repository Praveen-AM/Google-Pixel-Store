import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import { WishlistProvider } from "./context/Wishlistcontext";
import { CartProvider } from "./context/Cartcontext";
import { AuthProvider } from "./context/Authcontext";
import { OrderProvider } from "./context/Ordercontext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <OrderProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </OrderProvider>
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
