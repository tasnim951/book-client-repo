import { Navigate } from "react-router";
import { useAuth } from "../provider/AuthProvider";

const PrivateRoute = ({ children, roles }) => {
  const { user, role, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>; 
  }

  if (!user) {
    // User not logged in
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(role)) {
   
    return <Navigate to="/dashboard/my-orders" replace />; 
  }

 
  return children;
};

export default PrivateRoute;
