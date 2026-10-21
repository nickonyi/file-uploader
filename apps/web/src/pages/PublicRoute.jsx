import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";
import { FullPageSpinner } from "../components/ui/Spinner";

function PublicRoute() {
  const { user, ready } = useAuth();

  if (!ready) {
    return <FullPageSpinner label="Loading..." />;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default PublicRoute;
