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

      // store auth data
      localStorage.setItem("token", user.token);
      localStorage.setItem("role", user.role);

      toast.success("Login successful");
      // redirect based on role
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          TrustGear Login
        </h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
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
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-lg font-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center mt-4 text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
