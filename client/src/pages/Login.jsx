import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/userApi.js";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginUser(form);

      const user = res?.data?.data;

      if (!user?.token) {
        setError("Invalid server response");
        return;
      }

      localStorage.setItem("token", user.token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("name", user.name);

      toast.success("Login successful");

      if (user.role === "admin") {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/user", { replace: true });
      }
    } catch (err) {
      console.error("Login error:", err);
      const message = err?.response?.data?.message || "Server error";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 p-4">
      
      {/* CARD */}
      <div className="relative bg-white/70 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-md border border-gray-200">

        {/* Glow Effect */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-300 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-300 rounded-full blur-3xl opacity-30"></div>

        {/* TITLE */}
        <h1 className="text-3xl font-extrabold text-center mb-2 text-gray-800">
          Welcome to TrustGear
        </h1>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Login to continue your journey
        </p>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-center mb-4 text-sm font-medium">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* EMAIL */}
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border rounded-xl bg-white/80 focus:ring-2 focus:ring-blue-400 outline-none transition shadow-sm"
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border rounded-xl bg-white/80 focus:ring-2 focus:ring-blue-400 outline-none transition shadow-sm"
              required
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 transition text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* SIGNUP */}
          <p className="text-center mt-4 text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;