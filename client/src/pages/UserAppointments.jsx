import { useEffect, useState } from "react";
import { getAppointments, updateAppointment } from "../api/appointmentApi";
import { Link } from "react-router-dom";

const UserAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const res = await getAppointments();
      const data = res?.data?.data || [];
      setAppointments(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  //  CANCEL FUNCTION
  const handleCancel = async (id) => {
    try {
      await updateAppointment(id, { status: "Cancelled" });
      fetchAppointments();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Appointments</h1>

        <Link
          to="/user/book"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Book Appointment
        </Link>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Vehicle</th>
              <th className="p-3">Service</th>
              <th className="p-3">Garage</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {appointments.length > 0 ? (
              appointments.map((item) => (
                <tr key={item._id} className="border-t">
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

                  {/* 🔥 STATUS COLORS */}
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-white text-sm
                        ${item.status === "Pending" && "bg-yellow-500"}
                        ${item.status === "Approved" && "bg-blue-500"}
                        ${item.status === "Forwarded" && "bg-purple-500"}
                        ${item.status === "Completed" && "bg-green-500"}
                        ${item.status === "Cancelled" && "bg-red-500"}
                      `}
                    >
                      {item.status}
                    </span>
                  </td>

                  {/* 🔥 CANCEL BUTTON */}
                  <td className="p-3">
                    {item.status !== "Cancelled" &&
                      item.status !== "Completed" && (
                        <button
                          onClick={() => handleCancel(item._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Cancel
                        </button>
                      )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-gray-500">
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

export default UserAppointments;