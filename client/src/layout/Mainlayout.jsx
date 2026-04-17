import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
  <div className="flex h-screen overflow-hidden">


      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col ml-0 md:ml-64">        
        {/* NAVBAR */}
        <Navbar />

        {/* PAGE CONTENT */}
        <div className="p-4 flex-1 overflow-auto">
          <Outlet />
        </div>

      </div>
    </div>
  );
}