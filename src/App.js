import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Offerspage from "./pages/Offerspage";
import Whishlistpage from "./pages/Whishlistpage";
import Cartpage from "./pages/Cartpage";
import Login from "./pages/Login";
import ThankYou from "./pages/Thankyou";
import ProtectedRoute from "./components/Protectedroute";
import Orderspage from "./pages/Orderpage";
import LogoutHandler from "./components/Logout";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <LogoutHandler /> 
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Offerspage />} />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <Whishlistpage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cartpage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orderspage />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/thankyou" element={<ThankYou />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
