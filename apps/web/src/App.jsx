import "./styles/App.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import routes from "./routes/Routes";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const router = createBrowserRouter(routes);

  return (
    <AuthProvider>
      <RouterProvider router={router} />;
    </AuthProvider>
  );
}

export default App;
