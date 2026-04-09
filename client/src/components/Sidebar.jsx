export default function Sidebar() {
    return (
      <div className="w-64 h-screen bg-gray-900 text-white p-5 fixed">
        <h2 className="text-2xl font-bold mb-6">AutoCare Admin</h2>
  
        <ul className="space-y-4">
          <li className="hover:text-blue-400 cursor-pointer">
            Dashboard
          </li>
          <li className="hover:text-blue-400 cursor-pointer">
            Appointments
          </li>
          <li className="hover:text-blue-400 cursor-pointer">
            Vehicles
          </li>
          <li className="hover:text-blue-400 cursor-pointer">
            Services
          </li>
          <li className="hover:text-blue-400 cursor-pointer">
            Garages
          </li>
        </ul>
      </div>
    );
  }