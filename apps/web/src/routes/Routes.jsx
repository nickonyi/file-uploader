import Dashboard from "../pages/Dashboard";
import FolderPage from "../pages/FolderPage";
import Login from "../pages/Login";
import ProtectedRoute from "../pages/ProtectedRoute";

const routes = [
  {
    path: "/",
    element: <Login />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/folders/:id",
        element: <FolderPage />,
      },
    ],
  },
];

export default routes;
