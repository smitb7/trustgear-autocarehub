import { useEffect, useState } from "react";
import { getAppointments } from "../api/appointmentApi";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const response = await getAppointments();
      console.log("Fetched Appointments:", response.data);

      setAppointments(response.data.data); // store appointments
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Appointments</h1>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Vehicle</th>
              <th className="p-3 text-left">Service</th>
              <th className="p-3 text-left">Garage</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Pickup</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((item) => (
              <tr key={item._id} className="border-b">
                <td className="p-3">{item.userId?.name || "N/A"}</td>
                <td className="p-3">
                  {item.vehicleId?.brand} {item.vehicleId?.model}
                </td>
                <td className="p-3">{item.serviceId?.serviceName}</td>
                <td className="p-3">{item.garageId?.name}</td>
                <td className="p-3">{item.appointmentDate}</td>
                <td className="p-3">{item.pickupRequest ? "Yes" : "No"}</td>
                <td className="p-3">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* If empty */}
      {appointments.length === 0 && (
        <p className="text-gray-500 mt-4">No appointments found.</p>
      )}
    </div>
  );
};

export default Dashboard;