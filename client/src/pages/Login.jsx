import { useState } from "react";
import { loginUser } from "../API/userApi";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(form);

      // store token
      localStorage.setItem("token", res.data.token);

      // redirect
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="p-6 shadow-lg rounded w-96">
        <h2 className="text-2xl mb-4">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 mb-3 border"
          onChange={handleChange}
        />

        <button className="bg-blue-500 text-white w-full p-2">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;