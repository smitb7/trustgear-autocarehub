import { useEffect, useState } from "react";
import { createAppointment } from "../api/appointmentApi";
import { getVehicles } from "../api/vehicleApi";
import { getServices } from "../api/serviceApi";
import { getGarages } from "../api/garageApi";
import toast from "react-hot-toast";


const UserBookAppointment = () => {
  const [formData, setFormData] = useState({
    vehicleId: "",
    serviceId: "",
    garageId: "",
    appointmentDate: "",
    pickupRequest: false,
  });

  const [vehicles, setVehicles] = useState([]);
  const [services, setServices] = useState([]);
  const [garages, setGarages] = useState([]);

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [message, setMessage] = useState("");

  // 🔥 FETCH DROPDOWN DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const v = await getVehicles();
        const s = await getServices();
        const g = await getGarages();

        setVehicles(v?.data?.data || []);
        setServices(s?.data?.data || []);
        setGarages(g?.data?.data || []);
      } catch (err) {
        console.error("Dropdown fetch error:", err);
      }
      setFetchLoading(false);
    };

    fetchData();
  }, []);

  // 🔥 HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // 🔥 SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      // ✅ Backend will take userId from token (authMiddleware)
      await createAppointment(formData, token);

      toast.success("Appointment booked successfully ");

      setFormData({
        vehicleId: "",
        serviceId: "",
        garageId: "",
        appointmentDate: "",
        pickupRequest: false,
      });

      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Booking error:", err);
      toast.error("Error booking appointment");
    }

    setLoading(false);
  };

  // 🔥 LOADING STATE
  if (fetchLoading) {
    return (
      <div className="p-6 text-center text-lg">
        Loading form data...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Book Appointment</h1>

      {/* {message && (
        <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded">
          {message}
        </div>
      )} */}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 border"
      >
        {/* VEHICLE */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Vehicle</label>
          <select
            name="vehicleId"
            value={formData.vehicleId}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Select Vehicle</option>
            {vehicles.length > 0 ? (
              vehicles.map((v) => (
                <option key={v._id} value={v._id}>
                  {v.brand} {v.model}
                </option>
              ))
            ) : (
              <option disabled>No vehicles found</option>
            )}
          </select>
        </div>

        {/* SERVICE */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Service</label>
          <select
            name="serviceId"
            value={formData.serviceId}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Select Service</option>
            {services.length > 0 ? (
              services.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.serviceName}
                </option>
              ))
            ) : (
              <option disabled>No services found</option>
            )}
          </select>
        </div>

        {/* GARAGE */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Garage</label>
          <select
            name="garageId"
            value={formData.garageId}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Select Garage</option>
            {garages.length > 0 ? (
              garages.map((g) => (
                <option key={g._id} value={g._id}>
                  {g.name}
                </option>
              ))
            ) : (
              <option disabled>No garages found</option>
            )}
          </select>
        </div>

        {/* DATE */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Appointment Date</label>
          <input
            type="date"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {/* PICKUP */}
        <div className="mb-4 flex items-center gap-2">
          <input
            type="checkbox"
            name="pickupRequest"
            checked={formData.pickupRequest}
            onChange={handleChange}
          />
          <label>Pickup Required</label>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Booking Appointment..." : "Book Appointment"}
        </button>
      </form>
    </div>
  );
};

export default UserBookAppointment;