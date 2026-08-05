import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const CustomerProtectedRoute = () => {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser || currentUser.role !== "customer") {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <Outlet />;
};

export default CustomerProtectedRoute;