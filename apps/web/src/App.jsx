import "./styles/App.css";
import { Toaster } from "sonner";
import { createBrowserRouter, RouterProvider } from "react-router";
import routes from "./routes/Routes";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const router = createBrowserRouter(routes);

  return (
    <AuthProvider>
      <RouterProvider router={router} />;
      <Toaster />
    </AuthProvider>
  );
}

export default App;
