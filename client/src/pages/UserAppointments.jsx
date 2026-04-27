import { useEffect, useState } from "react";
import { getAppointments, updateAppointment } from "../api/appointmentApi";
import { createOrder, verifyPayment } from "../api/paymentApi";
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

  //  PAYMENT FUNCTION
  const handlePayment = async (appointmentId) => {
    try {
      const amount = 500; // make dynamic later

      const { data } = await createOrder({
        appointmentId,
        amount,
      });

      const order = data?.data?.order;

      if (!order) {
        console.error("Order not created");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: "INR",
        name: "AutoCareHub",
        description: "Service Payment",
        order_id: order.id,

        handler: async function (response) {
          try {
            await verifyPayment({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              appointmentId,
            });

            alert("Payment successful");
            fetchAppointments();
          } catch (err) {
            console.error("Verification error:", err);
          }
        },

        theme: {
          color: "#2563eb",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
    }
  };

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
        <div className="overflow-auto flex-1">
          <table className="min-w-[700px] w-full text-left">
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

                    {/* ACTION BUTTONS */}
                    <td className="p-3 space-x-2">
                      {/*  PAY BUTTON (only when Approved) */}
                      {item.status === "Approved" && (
                        <button
                          onClick={() => handlePayment(item._id)}
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        >
                          Pay
                        </button>
                      )}

                      {/* CANCEL */}
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