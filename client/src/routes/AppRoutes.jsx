import { Routes, Route } from "react-router-dom";
import MainLayout from "../layout/Mainlayout";
import Dashboard from "../pages/Dashboard";
import Appointments from "../pages/Appointments";
import Vehicles from "../pages/Vehicles";
import Services from "../pages/Services";
import Garages from "../pages/Garages";
import AddService from "../pages/AddService";
import AddVehicle from "../pages/AddVehicle";
import AddGarage from "../pages/AddGarage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Dashboard />} /> {/* "/" */}
        <Route path="dashboard" element={<Dashboard />} /> {/* "/dashboard" */}
        <Route path="appointments" element={<Appointments />} />
        <Route path="vehicles" element={<Vehicles />} />
        <Route path="services" element={<Services />} />
        <Route path="garages" element={<Garages />} />
        <Route path="services/add" element={<AddService />} />
        <Route path="vehicles/add" element={<AddVehicle />} />
        <Route path="garages/add" element={<AddGarage />} />
      </Route>
    </Routes>
  );
}
