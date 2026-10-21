import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";
import { FullPageSpinner } from "../components/ui/Spinner";

function ProtectedRoute() {
  const { user, ready } = useAuth();

  console.log(user);

  if (!ready) {
    return <FullPageSpinner label="loading..." />;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
