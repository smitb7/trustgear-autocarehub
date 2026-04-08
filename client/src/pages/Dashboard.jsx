import { useEffect, useState } from "react";
import { getAppointments } from "../api/appointmentApi";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const res = await getAppointments();
      setAppointments(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold mb-6">Appointments</h1>

      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 bg-white rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 border">Customer</th>
                <th className="p-3 border">Vehicle</th>
                <th className="p-3 border">Service</th>
                <th className="p-3 border">Garage</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Date</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((item) => (
                <tr key={item._id} className="text-center">
                  <td className="p-3 border">{item.userId?.name}</td>

                  <td className="p-3 border">
                    {item.vehicleId?.model || "N/A"}
                  </td>

                  <td className="p-3 border">
                    {item.serviceId?.serviceName || "N/A"}
                  </td>

                  <td className="p-3 border">
                    {item.garageId?.garageName || "N/A"}
                  </td>

                  <td className="p-3 border">{item.status}</td>

                  <td className="p-3 border">
                    {new Date(item.appointmentDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;