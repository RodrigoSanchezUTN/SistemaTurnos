import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useContext } from "react";

import UsuarioContext from "../context/UsuarioContext";

import Login from "../pages/Login";
import VerificarCorreo from "../pages/VerificarCorreo";
import Registro from "../pages/Registro";

import Dashboard from "../pages/Dashboard";
import Clientes from "../pages/Clientes";
import Servicios from "../pages/Servicios";
import Turnos from "../pages/Turnos";
import Estadisticas from "../pages/Estadisticas";
import Configuracion from "../pages/Configuracion";
import Calendario from "../pages/Calendario";

import UsuarioDashboard from "../pages/UsuarioDashboard";
import UsuarioTurnos from "../pages/UsuarioTurnos";
import UsuarioReservar from "../pages/UsuarioReservar";
import UsuarioPerfil from "../pages/UsuarioPerfil";
import UsuarioConfiguracion from "../pages/UsuarioConfiguracion";

import ProtectedRoute from "./ProtectedRoute";

function Inicio() {
  const { usuario } =
    useContext(UsuarioContext);

  // ==========================
  // NO HAY SESIÓN
  // ==========================

  if (!usuario) {
    return <Login />;
  }

  // ==========================
  // ADMINISTRADOR
  // ==========================

  if (usuario.rol === "admin") {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  // ==========================
  // USUARIO
  // ==========================

  if (usuario.rol === "usuario") {
    return (
      <Navigate
        to="/usuario"
        replace
      />
    );
  }

  // ==========================
  // ROL DESCONOCIDO
  // ==========================

  return (
    <Navigate
      to="/"
      replace
    />
  );
}

function Router() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================
            INICIO / LOGIN
        ========================= */}

        <Route
          path="/"
          element={<Inicio />}
        />

        <Route
          path="/verificar-correo"
          element={
            <VerificarCorreo />
          }
        />

        <Route
          path="/registro"
          element={<Registro />}
        />

        {/* =========================
            PANEL ADMINISTRADOR
        ========================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              rolPermitido="admin"
            >
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/clientes"
          element={
            <ProtectedRoute
              rolPermitido="admin"
            >
              <Clientes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/calendario"
          element={
            <ProtectedRoute
              rolPermitido="admin"
            >
              <Calendario />
            </ProtectedRoute>
          }
        />

        <Route
          path="/servicios"
          element={
            <ProtectedRoute
              rolPermitido="admin"
            >
              <Servicios />
            </ProtectedRoute>
          }
        />

        <Route
          path="/turnos"
          element={
            <ProtectedRoute
              rolPermitido="admin"
            >
              <Turnos />
            </ProtectedRoute>
          }
        />

        <Route
          path="/estadisticas"
          element={
            <ProtectedRoute
              rolPermitido="admin"
            >
              <Estadisticas />
            </ProtectedRoute>
          }
        />

        <Route
          path="/configuracion"
          element={
            <ProtectedRoute
              rolPermitido="admin"
            >
              <Configuracion />
            </ProtectedRoute>
          }
        />

        {/* =========================
            PANEL USUARIO
        ========================= */}

        <Route
          path="/usuario"
          element={
            <ProtectedRoute
              rolPermitido="usuario"
            >
              <UsuarioDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/usuario/configuracion"
          element={
            <ProtectedRoute
              rolPermitido="usuario"
            >
              <UsuarioConfiguracion />
            </ProtectedRoute>
          }
        />

        <Route
          path="/usuario/turnos"
          element={
            <ProtectedRoute
              rolPermitido="usuario"
            >
              <UsuarioTurnos />
            </ProtectedRoute>
          }
        />

        <Route
          path="/usuario/perfil"
          element={
            <ProtectedRoute
              rolPermitido="usuario"
            >
              <UsuarioPerfil />
            </ProtectedRoute>
          }
        />

        <Route
          path="/usuario/reservar"
          element={
            <ProtectedRoute
              rolPermitido="usuario"
            >
              <UsuarioReservar />
            </ProtectedRoute>
          }
        />

        {/* =========================
            RUTA DESCONOCIDA
        ========================= */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default Router;