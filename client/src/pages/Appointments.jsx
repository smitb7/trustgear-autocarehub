import { useEffect, useState } from "react";
import {
  getAppointments,
  updateAppointment,
  deleteAppointment,
} from "../api/appointmentApi";
import { Link } from "react-router-dom";
// import { Calendar, Trash } from "lucide-react";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  //  NEW STATE
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

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

  // UPDATE STATUS
  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateAppointment(id, { status: newStatus });
      fetchAppointments();
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!confirm("Are you sure to delete?")) return;

    try {
      await deleteAppointment(id);
      fetchAppointments();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // FILTER LOGIC
  const filteredAppointments = appointments.filter((item) => {
    const text = searchTerm.toLowerCase();

    const matchesSearch =
      item.userId?.name?.toLowerCase().includes(text) ||
      item.vehicleId?.brand?.toLowerCase().includes(text) ||
      item.vehicleId?.model?.toLowerCase().includes(text) ||
      item.serviceId?.serviceName?.toLowerCase().includes(text);

    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
<div className="p-4 sm:p-6 space-y-6">      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Appointments</h1>

        <Link
          to="/appointments/add"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Appointment
        </Link>
      </div>

      {/*  SEARCH +  FILTER */}
      <div className="flex gap-4 mb-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by customer, vehicle, service..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded w-full"
        />

        {/* Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Forwarded">Forwarded</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded-xl overflow-hidden max-h-[500px] overflow-y-auto">
        <table className="w-full text-left">
        <thead className="bg-gray-50 border-b text-gray-600 text-sm uppercase">            <tr>
              <th className="px-4 p-3">Customer</th>
              <th className="px-4 p-3">Vehicle</th>
              <th className="px-4 p-3">Service</th>
              <th className="px-4 p-3">Garage</th>
              <th className="px-4 p-3">Date</th>
              <th className="px-4 p-3">Pickup</th>
              <th className="px-4 p-3">Status</th>
              <th className="px-4 p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((item) => (
                <tr key={item._id} className="border-t">
                  <td className="p-3">{item.userId?.name || "N/A"}</td>

                  <td className="p-3">
                    {item.vehicleId?.brand} {item.vehicleId?.model}
                  </td>

                  <td className="p-3">{item.serviceId?.serviceName}</td>

                  <td className="p-3">{item.garageId?.name}</td>

                  <td className="p-3">
                    {new Date(item.appointmentDate).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                    {item.pickupRequest ? "Yes" : "No"}
                  </td>

                  {/* STATUS */}
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

                  {/* DELETE */}
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="p-4 text-center text-gray-500">
                  No matching appointments found
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



