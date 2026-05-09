import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "@/contexts/AuthContext"; // ✅ add this import
import RouteTracker from "./RouteTracker.tsx";
import { BrowserRouter } from "react-router-dom";
createRoot(document.getElementById("root")!).render(
  <AuthProvider> 
        {/* ✅ wrap App inside AuthProvider */}
    <App />
  </AuthProvider>
);
