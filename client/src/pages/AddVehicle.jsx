import { useState } from "react";
import { createVehicle } from "../api/vehicleApi";

const AddVehicle = () => {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    plateNumber: "",
    runKm: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await createVehicle(formData);

      setMessage("Vehicle added successfully!");
      setFormData({
        brand: "",
        model: "",
        year: "",
        plateNumber: "",
        runKm: "",
      });

      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Error adding vehicle.");
      console.error(error.response?.data || error);
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add New Vehicle</h1>

      {message && (
        <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded">
          {message}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 border"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Brand</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
            className="w-full mt-1 p-3 border rounded-lg focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Model</label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            required
            className="w-full mt-1 p-3 border rounded-lg focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Year</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
            className="w-full mt-1 p-3 border rounded-lg focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">
            Plate Number (Unique)
          </label>
          <input
            type="text"
            name="plateNumber"
            value={formData.plateNumber}
            onChange={handleChange}
            required
            className="w-full mt-1 p-3 border rounded-lg focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">KM Run</label>
          <input
            type="text"
            name="runKm"
            value={formData.runKm}
            onChange={handleChange}
            required
            className="w-full mt-1 p-3 border rounded-lg focus:ring focus:ring-blue-300"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          {loading ? "Saving..." : "Add Vehicle"}
        </button>
      </form>
    </div>
  );
};

export default AddVehicle;