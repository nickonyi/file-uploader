import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import ProtectedRoute from "../pages/ProtectedRoute";

const routes = [
  {
    path: "/",
    element: <Login />,
  },
  {
    element: <ProtectedRoute />,
    children: [{ path: "/dashboard", element: <Dashboard /> }],
  },
];

export default routes;
