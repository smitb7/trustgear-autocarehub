import { useEffect, useState } from "react";
import { getDashboardStats } from "../api/dashboardApi";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalAppointments: 0,
    pendingAppointments: 0,
    completedAppointments: 0,
    totalUsers: 0,
  });

  const fetchStats = async () => {
    try {
      const response = await getDashboardStats();

      const safeData =
        response?.data?.data ||
        response?.data ||
        {
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

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded-xl p-5 border">
          <p className="text-gray-500">Total Appointments</p>
          <h2 className="text-3xl font-bold">{stats.totalAppointments}</h2>
        </div>

        <div className="bg-white shadow rounded-xl p-5 border">
          <p className="text-gray-500">Pending</p>
          <h2 className="text-3xl font-bold">{stats.pendingAppointments}</h2>
        </div>

        <div className="bg-white shadow rounded-xl p-5 border">
          <p className="text-gray-500">Completed</p>
          <h2 className="text-3xl font-bold">{stats.completedAppointments}</h2>
        </div>

        <div className="bg-white shadow rounded-xl p-5 border">
          <p className="text-gray-500">Total Users</p>
          <h2 className="text-3xl font-bold">{stats.totalUsers}</h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;