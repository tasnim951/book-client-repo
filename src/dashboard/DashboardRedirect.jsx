
import { Navigate } from "react-router";
import { useAuth } from "../provider/AuthProvider";

const DashboardRedirect = () => {
  const { role } = useAuth();

  if (role === "admin") return <Navigate to="/dashboard/all-users" />;
  if (role === "librarian") return <Navigate to="/dashboard/add-book" />;

  
  return <Navigate to="/dashboard/my-orders" />;
};

export default DashboardRedirect;
