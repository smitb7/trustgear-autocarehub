import { useEffect, useState } from "react";
import { getAppointments } from "../api/appointmentApi";
import { Link } from "react-router-dom"; // ✅ ADD THIS

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const res = await getAppointments();
      const data = res?.data?.data || [];
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="p-6">
      {/* 🔥 HEADER + BUTTON */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Appointments</h1>

        <Link
          to="/appointments/add"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Appointment
        </Link>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Customer</th>
              <th className="p-3">Vehicle</th>
              <th className="p-3">Service</th>
              <th className="p-3">Garage</th>
              <th className="p-3">Date</th>
              <th className="p-3">Pickup</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {appointments.length > 0 ? (
              appointments.map((item) => (
                <tr key={item._id} className="border-t">
                  <td className="p-3">
                    {item.userId?.name || "N/A"}
                  </td>

                  <td className="p-3">
                    {item.vehicleId?.brand} {item.vehicleId?.model}
                  </td>

                  <td className="p-3">
                    {item.serviceId?.serviceName}
                  </td>

                  <td className="p-3">
                    {item.garageId?.name}
                  </td>

                  <td className="p-3">
                    {new Date(item.appointmentDate).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                    {item.pickupRequest ? "Yes" : "No"}
                  </td>

                  <td className="p-3">
                    <span className="px-2 py-1 rounded bg-gray-200 text-sm">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-4 text-gray-500" colSpan="7">
                  No appointments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointments;