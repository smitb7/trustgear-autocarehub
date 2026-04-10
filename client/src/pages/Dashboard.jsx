import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboardStats } from "../api/dashboardApi";
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

  // Fetch dashboard stats
  const fetchStats = async () => {
    try {
      const response = await getDashboardStats();

      const safeData =
        response?.data?.data ||
        response?.data || {
          totalAppointments: 0,
          pendingAppointments: 0,
          completedAppointments: 0,
          totalUsers: 0,
        };

      setStats(safeData);
    } catch (error) {
      console.error("Dashboard stats error:", error);
    }
  };

  // Fetch recent appointments
  const fetchRecentAppointments = async () => {
    try {
      const response = await getAppointments();
      setRecentAppts(response.data.data || []);
    } catch (err) {
      console.error("Error fetching recent appointments:", err);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchRecentAppointments();
  }, []);

  return (
    <div className="p-6">

      {/* 1 — Stats */}
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Total Appointments */}
        <div className="p-6 rounded-xl shadow bg-gradient-to-r from-blue-500 to-blue-700 text-white">
          <p className="text-sm opacity-80">Total Appointments</p>
          <h2 className="text-4xl font-bold mt-2">{stats.totalAppointments}</h2>
        </div>

        {/* Pending */}
        <div className="p-6 rounded-xl shadow bg-gradient-to-r from-yellow-500 to-yellow-700 text-white">
          <p className="text-sm opacity-80">Pending</p>
          <h2 className="text-4xl font-bold mt-2">{stats.pendingAppointments}</h2>
        </div>

        {/* Completed */}
        <div className="p-6 rounded-xl shadow bg-gradient-to-r from-green-500 to-green-700 text-white">
          <p className="text-sm opacity-80">Completed</p>
          <h2 className="text-4xl font-bold mt-2">{stats.completedAppointments}</h2>
        </div>

        {/* Total Users */}
        <div className="p-6 rounded-xl shadow bg-gradient-to-r from-purple-500 to-purple-700 text-white">
          <p className="text-sm opacity-80">Total Users</p>
          <h2 className="text-4xl font-bold mt-2">{stats.totalUsers}</h2>
        </div>

      </div>

      {/* 2 — Recent Appointments */}
      <h2 className="text-2xl font-semibold mt-10 mb-4">Recent Appointments</h2>

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
                <tr key={item._id} className="border-b">
                  <td className="p-3">{item.userId?.name || "N/A"}</td>
                  <td className="p-3">
                    {item.vehicleId?.brand} {item.vehicleId?.model}
                  </td>
                  <td className="p-3">{item.serviceId?.serviceName}</td>
                  <td className="p-3">{item.status}</td>
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
      <h2 className="text-2xl font-semibold mt-10 mb-4">Quick Actions</h2>

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