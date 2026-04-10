import { useState } from "react";
import { createService } from "../api/serviceApi";

const AddService = () => {
  const [formData, setFormData] = useState({
    serviceName: "",
    description: "",
    price: "",
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
      const response = await createService(formData);

      if (response.data.success) {
        setMessage("Service added successfully!");
        setFormData({ serviceName: "", description: "", price: "" });
      }
    } catch (error) {
      setMessage("Error adding service.");
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add New Service</h1>

      {message && (
        <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded">
          {message}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 border"
      >
        {/* Service Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Service Name</label>
          <input
            type="text"
            name="serviceName"
            value={formData.serviceName}
            onChange={handleChange}
            required
            className="w-full mt-1 p-3 border rounded-lg focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full mt-1 p-3 border rounded-lg focus:ring focus:ring-blue-300"
            rows="3"
          ></textarea>
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Price (₹)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
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
          {loading ? "Saving..." : "Add Service"}
        </button>
      </form>
    </div>
  );
};

export default AddService;