import { useEffect, useState } from "react";
import { createAppointment } from "../api/appointmentApi";
import { getVehicles } from "../api/vehicleApi";
import { getServices } from "../api/serviceApi";
import { getGarages } from "../api/garageApi";
import API from "../api/axios";

const AddAppointment = () => {
  const [formData, setFormData] = useState({
    userId: "",
    vehicleId: "",
    serviceId: "",
    garageId: "",
    appointmentDate: "",
    pickupRequest: false,
    status: "Pending",
  });

  const [users, setUsers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [services, setServices] = useState([]);
  const [garages, setGarages] = useState([]);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 Fetch all dropdown data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [userRes, vehicleRes, serviceRes, garageRes] =
        await Promise.all([
          API.get("/users"), // adjust if your route is different
          getVehicles(),
          getServices(),
          getGarages(),
        ]);

      setUsers(userRes.data.data || []);
      setVehicles(vehicleRes.data.data || []);
      setServices(serviceRes.data.data || []);
      setGarages(garageRes.data.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await createAppointment(formData);

      setMessage("Appointment created successfully!");

      setFormData({
        userId: "",
        vehicleId: "",
        serviceId: "",
        garageId: "",
        appointmentDate: "",
        pickupRequest: false,
        status: "Pending",
      });

      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("Error creating appointment");
      console.error(err.response?.data || err);
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add Appointment</h1>

      {message && (
        <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded">
          {message}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl p-6 border space-y-4"
      >
        {/* User */}
        <select
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg"
        >
          <option value="">Select User</option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>
              {u.name}
            </option>
          ))}
        </select>

        {/* Vehicle */}
        <select
          name="vehicleId"
          value={formData.vehicleId}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg"
        >
          <option value="">Select Vehicle</option>
          {vehicles.map((v) => (
            <option key={v._id} value={v._id}>
              {v.brand} {v.model}
            </option>
          ))}
        </select>

        {/* Service */}
        <select
          name="serviceId"
          value={formData.serviceId}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg"
        >
          <option value="">Select Service</option>
          {services.map((s) => (
            <option key={s._id} value={s._id}>
              {s.serviceName}
            </option>
          ))}
        </select>

        {/* Garage */}
        <select
          name="garageId"
          value={formData.garageId}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg"
        >
          <option value="">Select Garage</option>
          {garages.map((g) => (
            <option key={g._id} value={g._id}>
              {g.name}
            </option>
          ))}
        </select>

        {/* Date */}
        <input
          type="date"
          name="appointmentDate"
          value={formData.appointmentDate}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg"
        />

        {/* Pickup */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="pickupRequest"
            checked={formData.pickupRequest}
            onChange={handleChange}
          />
          Pickup Required
        </label>

        {/* Status */}
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        >
          <option>Pending</option>
          <option>Approved</option>
          <option>Forwarded</option>
          <option>Completed</option>
        </select>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Saving..." : "Create Appointment"}
        </button>
      </form>
    </div>
  );
};

export default AddAppointment;