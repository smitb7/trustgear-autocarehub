// import { useNavigate } from "react-router-dom";

// export default function Navbar() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token"); // remove token
//     navigate("/login"); // redirect to login
//   };

//   return (
//     <div className="w-full h-16 bg-white shadow-md flex items-center justify-between px-6">
//       <p className="font-semibold">Welcome Admin</p>

//       <button
//         onClick={handleLogout}
//         className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
//       >
//         Logout
//       </button>
//     </div>
//   );
// }


import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    toast.success("Logged out successfully");

    navigate("/login");
  };

  return (
    <div className="w-full h-16 bg-white shadow-md flex items-center justify-between px-6">
      {/* LEFT */}
      <h1 className="text-lg font-semibold text-gray-700">
        AutoCareHub Dashboard
      </h1>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <p className="font-medium text-gray-600">
          👤 {localStorage.getItem("role")}
        </p>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}



