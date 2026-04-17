import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAppointments } from "../api/appointmentApi";

const Dashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalAppointments: 0,
    pendingAppointments: 0,
    completedAppointments: 0,
    totalUsers: 0,
  });

  const [recentAppts, setRecentAppts] = useState([]);

  // Fetch appointments + calculate stats
  const fetchRecentAppointments = async () => {
    try {
      const response = await getAppointments();
      const data = response.data.data || [];

      setRecentAppts(data);

      const totalAppointments = data.length;

      const pendingAppointments = data.filter(
        (item) =>
          item.status === "Pending" || item.status === "Approved"
      ).length;

      const completedAppointments = data.filter(
        (item) => item.status === "Completed"
      ).length;

      const usersSet = new Set(
        data.map((item) => item.userId?._id)
      );

      const totalUsers = usersSet.size;

      setStats({
        totalAppointments,
        pendingAppointments,
        completedAppointments,
        totalUsers,
      });
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  };

  useEffect(() => {
    fetchRecentAppointments();
  }, []);

  return (
    <div className="p-6">
      {/* 1 — Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="p-6 rounded-2xl shadow-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white transform hover:scale-105 transition">
          <p className="text-sm opacity-80">Total Appointments</p>
          <h2 className="text-4xl font-bold mt-2">
            {stats.totalAppointments}
          </h2>
          <p className="text-xs mt-2 opacity-70">All bookings</p>
        </div>

        <div className="p-6 rounded-2xl shadow-lg bg-gradient-to-r from-yellow-500 to-yellow-700 text-white transform hover:scale-105 transition">
          <p className="text-sm opacity-80">Pending</p>
          <h2 className="text-4xl font-bold mt-2">
            {stats.pendingAppointments}
          </h2>
          <p className="text-xs mt-2 opacity-70">Awaiting approval</p>
        </div>

        <div className="p-6 rounded-2xl shadow-lg bg-gradient-to-r from-green-500 to-green-700 text-white transform hover:scale-105 transition">
          <p className="text-sm opacity-80">Completed</p>
          <h2 className="text-4xl font-bold mt-2">
            {stats.completedAppointments}
          </h2>
          <p className="text-xs mt-2 opacity-70">Finished services</p>
        </div>

        <div className="p-6 rounded-2xl shadow-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white transform hover:scale-105 transition">
          <p className="text-sm opacity-80">Total Users</p>
          <h2 className="text-4xl font-bold mt-2">
            {stats.totalUsers}
          </h2>
          <p className="text-xs mt-2 opacity-70">
            Registered customers
          </p>
        </div>

      </div>

      {/* 2 — Recent Appointments */}
      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Recent Appointments
      </h2>

      <div className="bg-white shadow rounded-xl overflow-hidden">
      
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-3">Customer</th>
              <th className="p-3">Vehicle</th>
              <th className="p-3">Service</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {recentAppts.length > 0 ? (
              recentAppts.slice(0, 5).map((item) => (
                <tr
                  key={item._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3">
                    {item.userId?.name || "N/A"}
                  </td>

                  <td className="p-3">
                    {item.vehicleId?.brand}{" "}
                    {item.vehicleId?.model}
                  </td>

                  <td className="p-3">
                    {item.serviceId?.serviceName}
                  </td>

                  {/*  STATUS BADGE */}
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        item.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : item.status === "Approved"
                          ? "bg-blue-100 text-blue-700"
                          : item.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td className="p-3 text-gray-500" colSpan={4}>
                  No recent appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 3 — Quick Actions */}
      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Quick Actions
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <button
          onClick={() => navigate("/services/add")}
          className="p-6 bg-white shadow rounded-xl border hover:bg-gray-50 transition"
        >
          Add Service
        </button>

        <button
          onClick={() => navigate("/vehicles/add")}
          className="p-6 bg-white shadow rounded-xl border hover:bg-gray-50 transition"
        >
          Add Vehicle
        </button>

        <button
          onClick={() => navigate("/garages/add")}
          className="p-6 bg-white shadow rounded-xl border hover:bg-gray-50 transition"
        >
          Add Garage
        </button>
      </div>
    </div>
  );
};

export default Dashboard;