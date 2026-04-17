import { useState } from "react";
import Toast from "../components/Toast";
import { createService } from "../api/serviceApi";

const AddService = () => {
  const [formData, setFormData] = useState({
    serviceName: "",
    description: "",
    price: "",
  });

  const [loading, setLoading] = useState(false);

  // Toast state
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // Show toast message
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });

    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 2500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createService(formData);

      showToast("Service added successfully!", "success");

      // Reset form
      setFormData({ serviceName: "", description: "", price: "" });
    } catch (error) {
      console.error(error.response?.data || error);
      showToast("Error adding service.", "error");
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      {/* Toast at top */}
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ show: false, message: "", type: "success" })}
      />

      <h1 className="text-3xl font-bold mb-6">Add New Service</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 border"
      >
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