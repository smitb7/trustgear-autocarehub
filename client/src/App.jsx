


import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🔥 DEFAULT REDIRECT */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* PUBLIC */}
        <Route path="/login" element={<Login />} />

        {/* ALL APP ROUTES */}
        <Route path="/*" element={<AppRoutes />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;