import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";

import App from "./App.jsx";
import AppProvider from "./context/AppProvider";
import { TurnosProvider } from "./context/TurnosContext";

import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>
      <TurnosProvider>
        <App />

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          pauseOnHover
          draggable
          theme="colored"
        />
      </TurnosProvider>
    </AppProvider>
  </StrictMode>
);