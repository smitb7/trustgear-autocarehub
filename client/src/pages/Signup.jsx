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
        role: "user", // 🔥 force user role
      });

      toast.success("Account created successfully 🎉");

      // redirect to login
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 transition text-white py-2 rounded-lg font-semibold"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>

        </form>

        {/* LOGIN LINK */}
        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
};

export default Signup;