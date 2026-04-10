import { useState } from "react";
import API from "../api/axios";

const AddVehicle = () => {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [number, setNumber] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/vehicles", {
        brand,
        model,
        number,
      });

      setMsg("Vehicle added successfully!");
      setBrand("");
      setModel("");
      setNumber("");
    } catch (error) {
      console.error("Add vehicle error:", error);
      setMsg("Failed to add vehicle.");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add New Vehicle</h1>

      {msg && <p className="mb-4 text-blue-600">{msg}</p>}

      <form className="bg-white shadow p-6 rounded-xl space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="font-medium">Brand</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="font-medium">Model</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="font-medium">Vehicle Number</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
        </div>

        <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">
          Add Vehicle
        </button>
      </form>
    </div>
  );
};

export default AddVehicle;