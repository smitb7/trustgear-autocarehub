import { useEffect, useState } from "react";
import {
  getAppointments,
  updateAppointment,
  deleteAppointment,
} from "../api/appointmentApi";
import { Link } from "react-router-dom";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const res = await getAppointments();
      setAppointments(res?.data?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // 🔥 UPDATE STATUS
  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateAppointment(id, { status: newStatus });
      fetchAppointments(); // refresh
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  // 🔥 DELETE
  const handleDelete = async (id) => {
    if (!confirm("Are you sure to delete?")) return;

    try {
      await deleteAppointment(id);
      fetchAppointments();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="p-6">
      {/* HEADER */}
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
              <th className="p-3">Actions</th> {/* NEW */}
            </tr>
          </thead>

          <tbody>
            {appointments.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="p-3">{item.userId?.name || "N/A"}</td>

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

                {/* 🔥 STATUS DROPDOWN */}
                <td className="p-3">
                  <select
                    value={item.status}
                    onChange={(e) =>
                      handleStatusChange(item._id, e.target.value)
                    }
                    className="border rounded px-2 py-1"
                  >
                    <option>Pending</option>
                    <option>Approved</option>
                    <option>Forwarded</option>
                    <option>Completed</option>
                  </select>
                </td>

                {/* 🔥 DELETE BUTTON */}
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointments;