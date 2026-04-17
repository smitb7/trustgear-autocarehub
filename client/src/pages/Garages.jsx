import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGarages, deleteGarage } from "../api/garageApi";
import { Plus, Trash, Building } from "lucide-react";

const Garages = () => {
  const navigate = useNavigate();

  const [garages, setGarages] = useState([]);
  const [loading, setLoading] = useState(false);

  //  Fetch Garages
  const fetchGarages = async () => {
    try {
      setLoading(true);
      const res = await getGarages();
      setGarages(res?.data?.data || []);
    } catch (err) {
      console.error("Error fetching garages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGarages();
  }, []);

  //  Delete Garage
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this garage?")) return;

    try {
      await deleteGarage(id);
      fetchGarages();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
<div className="p-4 sm:p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Garages</h1>

        <button
          onClick={() => navigate("/garages/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Garage
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded-xl overflow-hidden">

        {/*  RESPONSIVE WRAPPER */}
        <div className="overflow-x-auto">

          <table className="min-w-[800px] w-full text-left">

          <thead className="bg-gray-50 border-b text-gray-600 text-sm uppercase">
              <tr>
                <th className="p-3">Garage Name</th>
                <th className="p-3">Location</th>
                <th className="p-3">Contact</th>
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
              ) : garages.length > 0 ? (
                garages.map((g) => (
                  <tr key={g._id} className="border-b">

                    <td className="p-3">{g.name}</td>

                    <td className="p-3">
                      {g.location || "N/A"}
                    </td>

                    <td className="p-3">
                      {g.contact || "N/A"}
                    </td>

                    <td className="p-3">
                      <button
                        onClick={() => handleDelete(g._id)}
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
                    No garages found.
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

export default Garages;