import { useEffect, useState } from "react";
import { getAppointments, updateAppointment } from "../api/appointmentApi";
import { Link } from "react-router-dom";

const UserAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const res = await getAppointments();
      setAppointments(res?.data?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // CANCEL FUNCTION
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
        <h1 className="text-3xl font-bold text-gray-800">
          My Appointments
        </h1>
        <Link
          to="/user/book"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition shadow"
        >
          + Book Appointment
        </Link>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow-md rounded-2xl border h-[70vh] flex flex-col">
        
        {/* 🔥 SCROLL AREA */}
        <div className="overflow-y-auto flex-1">
          
          <table className="w-full text-left">
            
            {/* 🔥 STICKY HEADER */}
            <thead className="bg-gray-100 sticky top-0 z-10">
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
                  <tr
                    key={item._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
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
                      {new Date(
                        item.appointmentDate
                      ).toLocaleDateString()}
                    </td>

                    {/* STATUS */}
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          item.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : item.status === "Approved"
                            ? "bg-blue-100 text-blue-700"
                            : item.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : item.status === "Cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    {/* CANCEL BUTTON */}
                    <td className="p-3">
                      {item.status !== "Cancelled" &&
                        item.status !== "Completed" && (
                          <button
                            onClick={() =>
                              handleCancel(item._id)
                            }
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
                    <div className="text-center py-10 text-gray-500">
                      <p className="text-lg">
                        No appointments yet 🚗
                      </p>
                      <p className="text-sm">
                        Click "Book Appointment" to get started
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default UserAppointments;