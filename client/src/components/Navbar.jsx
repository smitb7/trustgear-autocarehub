

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LogOut, User } from "lucide-react";


const Navbar = () => {
  
  const navigate = useNavigate();

  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    toast.success("Logged out successfully");
  
    setTimeout(() => {
      localStorage.clear();
      navigate("/login");
    }, 300);
  };

  return (
    <div className="w-full bg-white shadow px-6 py-4 flex justify-between items-center">
      
      {/* LEFT */}
      <h1 className="text-xl font-semibold text-gray-700">
        Welcome, {name || "User"} 
      </h1>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500 capitalize">
          {role}
        </span>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;