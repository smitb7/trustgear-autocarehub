import { useEffect, useState } from "react";
import { getInvoices, downloadInvoice } from "../api/invoiceApi";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState(null); // 👈 preview

  const fetchInvoices = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const res = await getInvoices(token);
      setInvoices(res?.data?.data || []);
    } catch (err) {
      console.error("Fetch invoices error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  // DOWNLOAD
  const handleDownload = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await downloadInvoice(id, token);

      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice_${id}.pdf`;

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download error:", err);
      alert("Failed to download invoice");
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading invoices...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Invoices</h1>

      {invoices.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          No invoices found 📄
        </div>
      ) : (
        <div className="bg-white shadow rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Invoice</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {invoices.map((inv) => (
                <tr key={inv._id} className="border-t hover:bg-gray-50">
                  <td className="p-3 text-xs">{inv._id}</td>

                  <td className="p-3 font-semibold text-green-600">
                    ₹{inv.amount}
                  </td>

                  <td className="p-3">
                    {new Date(inv.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                      Paid
                    </span>
                  </td>

                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => setSelectedInvoice(inv)}
                      className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-black"
                    >
                      View
                    </button>

                    <button
                      onClick={() => handleDownload(inv._id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= PREVIEW MODAL ================= */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-[600px] rounded-xl shadow-lg p-6 relative">

            {/* CLOSE */}
            <button
              onClick={() => setSelectedInvoice(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            {/* INVOICE CONTENT */}
            <div className="border-b pb-4 mb-4">
              <h2 className="text-xl font-bold">AutoCareHub</h2>
              <p className="text-sm text-gray-500">
                Ahmedabad, Gujarat, India
              </p>
            </div>

            <div className="flex justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500">Invoice ID</p>
                <p className="font-medium text-xs">
                  {selectedInvoice._id}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">
                  {new Date(
                    selectedInvoice.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* BILL */}
            <div className="mb-4">
              <p className="text-sm text-gray-500">Billed To</p>
              <p className="font-medium">Customer</p>
            </div>

            {/* TABLE */}
            <div className="border rounded">
              <div className="flex justify-between bg-gray-100 p-2 text-sm font-medium">
                <span>Service</span>
                <span>Amount</span>
              </div>

              <div className="flex justify-between p-2 text-sm">
                <span>Vehicle Service</span>
                <span>₹{selectedInvoice.amount}</span>
              </div>
            </div>

            {/* TOTAL */}
            <div className="flex justify-end mt-4 text-lg font-bold">
              Total: ₹{selectedInvoice.amount}
            </div>

            {/* ACTION */}
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() =>
                  handleDownload(selectedInvoice._id)
                }
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoices;