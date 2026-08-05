import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (
    allowedRoles &&
    !allowedRoles.includes(currentUser.role)
  ) {
    return <Navigate to="/" replace />;
  }

  // Render children if provided; otherwise render nested routes
  return children ? children : <Outlet />;
};

export default ProtectedRoute;