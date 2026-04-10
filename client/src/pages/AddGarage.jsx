import { useState } from "react";
import { createGarage } from "../api/garageApi";

const AddGarage = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    contactNumber: "",
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
      const response = await createGarage(formData);

      if (response.data.success) {
        setMessage("Garage added successfully!");
        setFormData({
          name: "",
          location: "",
          contactNumber: "",
        });
      }
    } catch (error) {
      setMessage("Error adding garage.");
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add New Garage</h1>

      {message && (
        <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded">
          {message}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 border"
      >
        {/* Garage Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Garage Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full mt-1 p-3 border rounded-lg focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full mt-1 p-3 border rounded-lg focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Contact Number */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">
            Contact Number
          </label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
            className="w-full mt-1 p-3 border rounded-lg focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          {loading ? "Saving..." : "Add Garage"}
        </button>
      </form>
    </div>
  );
};

export default AddGarage;