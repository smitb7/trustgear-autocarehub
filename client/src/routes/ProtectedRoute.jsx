import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children, allowedRoles }) {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    setIsAuth(!!token);
    setRole(userRole);
    setLoading(false);
  }, []);

  //  LOADING STATE
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  //  NOT LOGGED IN
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  //  ROLE CHECK (IMPORTANT FIX)
  if (allowedRoles && !allowedRoles.includes(role)) {
    if (role === "admin") {
      return <Navigate to="/dashboard" replace />;
    } else {
      return <Navigate to="/user" replace />;
    }
  }

  //  ACCESS GRANTED
  return <>children</>;
}