
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* All Routes handled inside AppRoutes */}
        <Route path="/*" element={<AppRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;