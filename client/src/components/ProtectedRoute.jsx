import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  if (role && user.role !== role) {
    if (user.role === "patient") return <Navigate to="/patient/dashboard" replace />;
    if (user.role === "doctor")  return <Navigate to="/doctor/dashboard"  replace />;
    if (user.role === "admin")   return <Navigate to="/admin/dashboard"   replace />;
  }

  return children;
};

export default ProtectedRoute;  