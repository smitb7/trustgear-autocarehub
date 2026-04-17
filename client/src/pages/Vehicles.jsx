import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getVehicles, deleteVehicle } from "../api/vehicleApi";

const Vehicles = () => {
  const navigate = useNavigate();

  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 Fetch Vehicles
  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const res = await getVehicles();
      setVehicles(res?.data?.data || []);
    } catch (err) {
      console.error("Error fetching vehicles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  // 🔥 Delete Vehicle
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this vehicle?")) return;

    try {
      await deleteVehicle(id);
      fetchVehicles();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Vehicles</h1>

        <button
          onClick={() => navigate("/vehicles/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Vehicle
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded-xl overflow-hidden">

        {/* 🔥 RESPONSIVE WRAPPER */}
        <div className="overflow-x-auto">

          <table className="min-w-[700px] w-full text-left">

            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-3">Brand</th>
                <th className="p-3">Model</th>
                <th className="p-3">Year</th>
                <th className="p-3">Owner</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td className="p-4" colSpan={5}>
                    Loading...
                  </td>
                </tr>
              ) : vehicles.length > 0 ? (
                vehicles.map((v) => (
                  <tr key={v._id} className="border-b">

                    <td className="p-3">{v.brand}</td>
                    <td className="p-3">{v.model}</td>
                    <td className="p-3">{v.year}</td>
                    <td className="p-3">
                      {v.userId?.name || "N/A"}
                    </td>

                    <td className="p-3">
                      <button
                        onClick={() => handleDelete(v._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-4 text-gray-500" colSpan={5}>
                    No vehicles found.
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

export default Vehicles;