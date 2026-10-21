import Dashboard from "../pages/Dashboard";
import FolderPage from "../pages/FolderPage";
import Login from "../pages/Login";
import ProtectedRoute from "../pages/ProtectedRoute";
import PublicRoute from "../pages/PublicRoute";
import SharePage from "../pages/SharePage";

const routes = [
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
    ],
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
      {
        path: "/share/:token",
        element: <SharePage />,
      },
    ],
  },
];

export default routes;
