import { Link } from "react-router-dom";

const Sidebar = ({ closeSidebar }) => {
  const role = localStorage.getItem("role");

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5 fixed left-0 top-0 hidden md:block">
      <h2 className="text-2xl font-bold mb-10">AutoCareHub</h2>

      <nav className="flex flex-col gap-4">
        {/* ADMIN MENU */}
        {role === "admin" && (
          <>
            <Link
              to="/dashboard"
              onClick={closeSidebar}
              className="hover:text-yellow-400"
            >
              Dashboard
            </Link>
            <Link
              to="/appointments"
              onClick={closeSidebar}
              className="hover:text-yellow-400"
            >
              Appointments
            </Link>
            <Link
              to="/vehicles"
              onClick={closeSidebar}
              className="hover:text-yellow-400"
            >
              Vehicles
            </Link>
            <Link
              to="/services"
              onClick={closeSidebar}
              className="hover:text-yellow-400"
            >
              Services
            </Link>
            <Link
              to="/garages"
              onClick={closeSidebar}
              className="hover:text-yellow-400"
            >
              Garages
            </Link>
          </>
        )}

        {/* USER MENU */}
        {role === "user" && (
          <>
            <Link
              to="/user"
              onClick={closeSidebar}
              className="hover:text-yellow-400"
            >
              My Appointments
            </Link>
            <Link
              to="/user/book"
              onClick={closeSidebar}
              className="hover:text-yellow-400"
            >
              Book Appointment
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;