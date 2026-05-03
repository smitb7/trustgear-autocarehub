import { useEffect, useState } from "react";
import { getAppointments } from "../api/appointmentApi";
import { createOrder, verifyPayment } from "../api/paymentApi";
import { downloadInvoice } from "../api/invoiceApi";
import { Link } from "react-router-dom";

const UserAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const res = await getAppointments();

      //  IMPORTANT: normalize payment status
      const updated = (res?.data?.data || []).map((item) => ({
        ...item,
        paymentStatus: item.invoiceId ? "Paid" : "Pending",
      }));

      setAppointments(updated);
    } catch (err) {
      console.error("Fetch appointments error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // DOWNLOAD INVOICE
  const handleDownload = async (invoiceId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await downloadInvoice(invoiceId, token);

      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice_${invoiceId}.pdf`;

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download error:", err);
      alert("Failed to download invoice");
    }
  };

  // PAYMENT
  const handlePayment = async (appointmentId, amount) => {
    try {
      if (!amount) {
        alert("Price not found");
        return;
      }

      const { data } = await createOrder({
        appointmentId,
        amount,
      });

      const order = data?.data?.order;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: "INR",
        name: "AutoCareHub",
        description: "Service Payment",
        order_id: order.id,

        handler: async function (response) {
          await verifyPayment({
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            appointmentId,
          });

          alert("Payment successful");

          // ✅ instant UI update (no wait)
          setAppointments((prev) =>
            prev.map((item) =>
              item._id === appointmentId
                ? { ...item, paymentStatus: "Paid" }
                : item
            )
          );

          fetchAppointments(); // sync with backend
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
    }
  };

  // LOADING
  if (loading) {
    return <div className="p-6">Loading appointments...</div>;
  }

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
                <th className="p-3">Payment</th>
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

                    {/* PAYMENT STATUS */}
                    <td className="p-3">
                      {item.paymentStatus === "Paid" ? (
                        <span className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                          Paid
                        </span>
                      ) : (
                        <span className="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">
                          Pending
                        </span>
                      )}
                    </td>

                    {/* ACTION */}
                    <td className="p-3 space-x-2">
                      {/* DISABLED BUTTON AFTER PAYMENT */}
                      {item.status === "Approved" && (
                        <button
                          disabled={item.paymentStatus === "Paid"}
                          onClick={() =>
                            handlePayment(
                              item._id,
                              item.servicePrice || item.serviceId?.price
                            )
                          }
                          className={`px-3 py-1 rounded text-white ${
                            item.paymentStatus === "Paid"
                              ? "bg-green-300 cursor-not-allowed"
                              : "bg-green-600 hover:bg-green-700"
                          }`}
                        >
                          {item.paymentStatus === "Paid"
                            ? "Paid"
                            : "Pay"}
                        </button>
                      )}

                      {/* INVOICE */}
                      {item.paymentStatus === "Paid" &&
                        item.invoiceId && (
                          <button
                            onClick={() =>
                              handleDownload(item.invoiceId)
                            }
                            className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
                          >
                            Invoice
                          </button>
                        )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="p-4 text-center text-gray-500"
                  >
                    No appointments found
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