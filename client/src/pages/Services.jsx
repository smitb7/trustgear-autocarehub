import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getServices, deleteService } from "../api/serviceApi";

const Services = () => {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  //  Fetch Services
  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await getServices();
      setServices(res?.data?.data || []);
    } catch (err) {
      console.error("Error fetching services:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Delete Service
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;

    try {
      await deleteService(id);
      fetchServices();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Services</h1>

        <button
          onClick={() => navigate("/services/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Service
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded-xl overflow-hidden">

        {/*  RESPONSIVE WRAPPER */}
        <div className="overflow-x-auto">

          <table className="min-w-[700px] w-full text-left">

            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-3">Service Name</th>
                <th className="p-3">Price</th>
                <th className="p-3">Description</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td className="p-4" colSpan={4}>
                    Loading...
                  </td>
                </tr>
              ) : services.length > 0 ? (
                services.map((s) => (
                  <tr key={s._id} className="border-b">

                    <td className="p-3">{s.serviceName}</td>

                    <td className="p-3">
                      ₹{s.price || "N/A"}
                    </td>

                    <td className="p-3">
                      {s.description || "—"}
                    </td>

                    <td className="p-3">
                      <button
                        onClick={() => handleDelete(s._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-4 text-gray-500" colSpan={4}>
                    No services found.
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

export default Services;