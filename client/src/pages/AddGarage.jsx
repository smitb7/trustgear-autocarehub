import { useState } from "react";
import { createGarage } from "../api/garageApi";
import Toast from "../components/Toast";

const AddGarage = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    contactNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createGarage(formData);

      setToast({
        show: true,
        message: "Garage added successfully!",
        type: "success",
      });

      setFormData({
        name: "",
        location: "",
        contactNumber: "",
      });

      setTimeout(() => setToast({ show: false }), 2500);
    } catch (error) {
      console.error(error);

      setToast({
        show: true,
        message: "Error adding garage.",
        type: "error",
      });

      setTimeout(() => setToast({ show: false }), 2500);
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">

      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ show: false })}
      />

      <h1 className="text-3xl font-bold mb-6">Add New Garage</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 border"
      >
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