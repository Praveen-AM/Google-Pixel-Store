import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import { useCart } from "../context/Cartcontext";
import { useWishlist } from "../context/Wishlistcontext";
import { useOrder } from "../context/Ordercontext";

const Login = () => {
  const { login } = useAuth();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const { placeOrder } = useOrder();

  const navigate = useNavigate();
  const location = useLocation();
  const [isNewUser, setIsNewUser] = useState(false);
  const [isForgot, setIsForgot] = useState(false);

  const from = location.state?.from?.pathname || "/";
  const action = location.state?.action;
  const item = location.state?.item;

  const [form, setForm] = useState({
    phone: "",
    password: "",
    confirmPassword: "",
    username: "",
  });


  const resetForm = () => {
    setForm({
      phone: "",
      password: "",
      confirmPassword: "",
      username: "",
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isValidPhone = (phone) => /^[6-9]\d{9}$/.test(phone);

  const postLoginActions = (user) => {
    login(user);
    if (action === "cart" && item) addToCart(item);
    else if (action === "wishlist" && item) addToWishlist(item);
    else if (action === "order" && item) {
      placeOrder(item);
      navigate("/thankyou");
      return;
    }
    navigate(from, { replace: true });
    resetForm(); 
  };

  const handleLogin = async () => {
    if (!isValidPhone(form.phone)) return alert("Enter valid phone number.");
    if (!form.password) return alert("Enter your password.");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: form.phone, password: form.password }),
      });

      const data = await res.json();
      if (!res.ok) return alert(data.error);
      postLoginActions(data.user);
    } catch (err) {
      alert("Login failed. Try again.");
      console.error(err);
    }
  };

  const handleRegister = async () => {
    if (!form.username || !isValidPhone(form.phone) || !form.password || !form.confirmPassword)
      return alert("All fields are required and phone must be valid.");

    if (form.password !== form.confirmPassword)
      return alert("Passwords do not match.");

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          phone: form.phone,
          password: form.password,
        }),
      });

      const data = await res.json();
      if (!res.ok) return alert(data.error);
      postLoginActions(data.user);
      resetForm(); 
    } catch (err) {
      alert("Registration failed. Try again.");
      console.error(err);
    }
  };

  const handleResetPassword = async () => {
    if (!isValidPhone(form.phone))
      return alert("Enter valid phone number.");
    if (!form.password || !form.confirmPassword)
      return alert("Both password fields are required.");
    if (form.password !== form.confirmPassword)
      return alert("Passwords do not match.");

    try {
      const res = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: form.phone,
          password: form.password,
          confirmPassword: form.confirmPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) return alert(data.error);

      alert("Password reset successful. Please log in.");
      setIsForgot(false);
      resetForm(); 
    } catch (err) {
      alert("Reset failed. Try again.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">
          {isNewUser
            ? "New User Registration"
            : isForgot
            ? "Reset Password"
            : "User Login"}
        </h2>

        <div className="flex justify-center mb-4">
          <h2>Google Welcomes You</h2>
        </div>

        {isNewUser && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full border px-3 py-2 mb-3 rounded"
          />
        )}

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="w-full border px-3 py-2 mb-3 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border px-3 py-2 mb-3 rounded"
        />

        {(isNewUser || isForgot) && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="Re-enter Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full border px-3 py-2 mb-3 rounded"
          />
        )}

        {!isNewUser && !isForgot && (
          <div className="text-right mb-3">
            <button
              className="text-sm text-blue-500 hover:underline"
              onClick={() => {
                setIsForgot(true);
                resetForm(); 
              }}
            >
              Forgot Password?
            </button>
          </div>
        )}

        <button
          onClick={
            isNewUser
              ? handleRegister
              : isForgot
              ? handleResetPassword
              : handleLogin
          }
          className="bg-black text-white w-full py-2 rounded hover:bg-gray-800"
        >
          {isNewUser ? "Sign Up" : isForgot ? "Reset Password" : "Sign In"}
        </button>

        <p className="mt-4 text-sm text-center">
          {isNewUser
            ? "Already have an account?"
            : isForgot
            ? "Back to login?"
            : "New user?"}{" "}
          <button
            className="text-blue-500 hover:underline"
            onClick={() => {
              setIsNewUser(!isNewUser);
              setIsForgot(false);
              resetForm(); 
            }}
          >
            {isNewUser ? "Sign In" : isForgot ? "Sign In" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
