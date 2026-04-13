import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import MainLayout from "../layout/Mainlayout";
import Dashboard from "../pages/Dashboard";
import Appointments from "../pages/Appointments";
import Vehicles from "../pages/Vehicles";
import Services from "../pages/Services";
import Garages from "../pages/Garages";

import AddService from "../pages/AddService";
import AddVehicle from "../pages/AddVehicle";
import AddGarage from "../pages/AddGarage";
import AddAppointment from "../pages/AddAppointment";

import Login from "../pages/Login";

export default function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC ROUTE */}
      <Route path="/login" element={<Login />} />

      {/* PROTECTED ROUTES */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="appointments/add" element={<AddAppointment />} />
        <Route path="vehicles" element={<Vehicles />} />
        <Route path="vehicles/add" element={<AddVehicle />} />
        <Route path="services" element={<Services />} />
        <Route path="services/add" element={<AddService />} />
        <Route path="garages" element={<Garages />} />
        <Route path="garages/add" element={<AddGarage />} />
      </Route>
    </Routes>
  );
}