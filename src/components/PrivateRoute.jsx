import { Navigate } from "react-router";
import { useAuth } from "../provider/AuthProvider";

const PrivateRoute = ({ children, roles }) => {
  const { user, role, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>; // Optional: replace with spinner or skeleton
  }

  if (!user) {
    // User not logged in
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(role)) {
    // User logged in but doesn't have permission
    return <Navigate to="/dashboard/my-orders" replace />; // redirect to a safe page
  }

  // User is logged in and has correct role
  return children;
};

export default PrivateRoute;
