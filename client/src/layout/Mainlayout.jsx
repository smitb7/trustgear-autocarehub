import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        {/* PAGES RENDER HERE */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}