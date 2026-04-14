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
import UserDashboard from "../pages/UserDashboard";
import UserAppointments from "../pages/UserAppointments";
import UserBookAppointment from "../pages/UserBookAppointment";
import Signup from "../pages/Signup";



export default function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      {/* ADMIN ROUTES */}
      <Route
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/appointments/add" element={<AddAppointment />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/vehicles/add" element={<AddVehicle />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/add" element={<AddService />} />
        <Route path="/garages" element={<Garages />} />
        <Route path="/garages/add" element={<AddGarage />} />
      </Route>

      {/* USER ROUTES  FIXED */}
      {/* USER ROUTES */}
      <Route
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/user" element={<UserAppointments />} />
        <Route path="/user/book" element={<UserBookAppointment />} />
      </Route>
    </Routes>
  );
}
