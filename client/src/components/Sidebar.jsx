const Sidebar = () => {
    return (
      <div className="w-64 h-screen bg-gray-900 text-white p-5">
        <h2 className="text-2xl font-bold mb-10">AutoCareHub</h2>
  
        <nav className="flex flex-col gap-4">
          <a href="/" className="hover:text-yellow-400">Dashboard</a>
          <a href="/appointments" className="hover:text-yellow-400">Appointments</a>
          <a href="/vehicles" className="hover:text-yellow-400">Vehicles</a>
          <a href="/services" className="hover:text-yellow-400">Services</a>
          <a href="/garages" className="hover:text-yellow-400">Garages</a>
        </nav>
      </div>
    );
  };
  
  export default Sidebar;