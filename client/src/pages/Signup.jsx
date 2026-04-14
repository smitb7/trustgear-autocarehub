import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/userApi";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await registerUser({
        ...form,
        role: "user",
      });

      toast.success("Account created successfully 🎉");

      navigate("/login");
    } catch (err) {
      console.error(err);

      const message =
        err?.response?.data?.message || "Signup failed";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-blue-200 p-4">
      
      {/* CARD */}
      <div className="relative bg-white/70 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-md border border-gray-200">

        {/* Glow Effects */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-green-300 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-300 rounded-full blur-3xl opacity-30"></div>

        {/* TITLE */}
        <h1 className="text-3xl font-extrabold text-center mb-2 text-gray-800">
          Create Account 
        </h1>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Join us and manage your car services easily
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* NAME */}
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-600">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-3 border rounded-xl bg-white/80 focus:ring-2 focus:ring-green-400 outline-none transition shadow-sm"
              required
            />
          </div>

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
              className="w-full px-4 py-3 border rounded-xl bg-white/80 focus:ring-2 focus:ring-green-400 outline-none transition shadow-sm"
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
              placeholder="Create a password"
              className="w-full px-4 py-3 border rounded-xl bg-white/80 focus:ring-2 focus:ring-green-400 outline-none transition shadow-sm"
              required
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 transition text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>

        </form>

        {/* LOGIN LINK */}
        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
};

export default Signup;