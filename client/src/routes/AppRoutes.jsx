import { Routes, Route } from "react-router-dom";
import MainLayout from "../layout/Mainlayout";
import Dashboard from "../pages/Dashboard";
import Appointments from "../pages/Appointments";
import Vehicles from "../pages/Vehicles";
import Services from "../pages/Services";
import Garages from "../pages/Garages";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Dashboard />} />              {/* "/" */}
        <Route path="dashboard" element={<Dashboard />} />   {/* "/dashboard" */}
        <Route path="appointments" element={<Appointments />} />
        <Route path="vehicles" element={<Vehicles />} />
        <Route path="services" element={<Services />} />
        <Route path="garages" element={<Garages />} />
      </Route>
    </Routes>
  );
}