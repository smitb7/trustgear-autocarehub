// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import ProtectedRoute from "./routes/ProtectedRoute";
// import AppRoutes from "./routes/AppRoutes";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Public Route */}
//         <Route path="/login" element={<Login />} />

//         {/* Protected All App Routes */}
//         <Route
//           path="/*"
//           element={
//             <ProtectedRoute>
//               <AppRoutes />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;