import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { route } from "./Routes/Route";
import { RouterProvider } from "react-router-dom"; // Ensure the correct import
import { UserProvider } from "./context/AuthContext/AuthProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={route} />
    </UserProvider>
  </StrictMode>
);
