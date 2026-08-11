import { BrowserRouter, Routes, Route } from "react-router-dom";

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

function Router() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}

        <Route
          path="/"
          element={<Login />}
        />
        <Route
  path="/verificar-correo"
  element={<VerificarCorreo />}
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
            <ProtectedRoute rolPermitido="admin">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/clientes"
          element={
            <ProtectedRoute rolPermitido="admin">
              <Clientes />
            </ProtectedRoute>
          }
        />
        <Route
  path="/calendario"
  element={<Calendario />}
/>

        <Route
          path="/servicios"
          element={
            <ProtectedRoute rolPermitido="admin">
              <Servicios />
            </ProtectedRoute>
          }
        />

        <Route
          path="/turnos"
          element={
            <ProtectedRoute rolPermitido="admin">
              <Turnos />
            </ProtectedRoute>
          }
        />

        <Route
          path="/estadisticas"
          element={
            <ProtectedRoute rolPermitido="admin">
              <Estadisticas />
            </ProtectedRoute>
          }
        />

        <Route
          path="/configuracion"
          element={
            <ProtectedRoute rolPermitido="admin">
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
            <ProtectedRoute rolPermitido="usuario">
              <UsuarioDashboard />
            </ProtectedRoute>
          }
        />

        <Route
  path="/usuario/configuracion"
  element={
    <ProtectedRoute rolPermitido="usuario">
      <UsuarioConfiguracion />
    </ProtectedRoute>
  }
/>

        <Route
          path="/usuario/turnos"
          element={
            <ProtectedRoute rolPermitido="usuario">
              <UsuarioTurnos />
            </ProtectedRoute>
          }
        />

        <Route
  path="/usuario/perfil"
  element={
    <ProtectedRoute rolPermitido="usuario">
      <UsuarioPerfil />
    </ProtectedRoute>
  }
/>
        <Route
  path="/usuario/reservar"
  element={
    <ProtectedRoute rolPermitido="usuario">
      <UsuarioReservar />
    </ProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default Router;