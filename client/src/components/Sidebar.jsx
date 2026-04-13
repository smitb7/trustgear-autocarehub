// import { Link } from "react-router-dom";

// const Sidebar = () => {
//   const role = localStorage.getItem("role"); // 🔥 get role

//   return (
//     <div className="w-64 h-screen bg-gray-900 text-white p-5">
//       <h2 className="text-2xl font-bold mb-10">AutoCareHub</h2>

//       <nav className="flex flex-col gap-4">
//         {/* ADMIN LINKS */}
//         {role === "admin" && (
//           <>
//             <Link to="/dashboard" className="hover:text-yellow-400">Dashboard</Link>
//             <Link to="/appointments" className="hover:text-yellow-400">Appointments</Link>
//             <Link to="/vehicles" className="hover:text-yellow-400">Vehicles</Link>
//             <Link to="/services" className="hover:text-yellow-400">Services</Link>
//             <Link to="/garages" className="hover:text-yellow-400">Garages</Link>
//           </>
//         )}

//         {/* USER LINKS */}
//         {role === "user" && (
//           <>
//             <Link to="/user" className="hover:text-yellow-400">My Appointments</Link>
//             <Link to="/user/book" className="hover:text-yellow-400">Book Appointment</Link>
//           </>
//         )}
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;

import { Link } from "react-router-dom";

const Sidebar = () => {
  const role = localStorage.getItem("role");

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5 fixed left-0 top-0">
      <h2 className="text-2xl font-bold mb-10">AutoCareHub</h2>

      <nav className="flex flex-col gap-4">
        {/* ADMIN MENU */}
        {role === "admin" && (
          <>
            <Link to="/dashboard" className="hover:text-yellow-400">
              Dashboard
            </Link>
            <Link to="/appointments" className="hover:text-yellow-400">
              Appointments
            </Link>
            <Link to="/vehicles" className="hover:text-yellow-400">
              Vehicles
            </Link>
            <Link to="/services" className="hover:text-yellow-400">
              Services
            </Link>
            <Link to="/garages" className="hover:text-yellow-400">
              Garages
            </Link>
          </>
        )}

        {/* USER MENU */}
        {role === "user" && (
          <>
            <Link to="/user" className="hover:text-yellow-400">
              My Appointments
            </Link>
            <Link to="/user/book" className="hover:text-yellow-400">
              Book Appointment
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
