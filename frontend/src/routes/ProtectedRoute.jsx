import { useContext } from "react";
import { Navigate } from "react-router-dom";

import UsuarioContext from "../context/UsuarioContext";

function ProtectedRoute({ children, rolPermitido }) {
  const { usuario } = useContext(UsuarioContext);

  // No hay sesión
  if (!usuario) {
    return <Navigate to="/" replace />;
  }

  // El usuario no tiene permiso para esta sección
  if (
    rolPermitido &&
    usuario.rol !== rolPermitido
  ) {
    if (usuario.rol === "admin") {
      return <Navigate to="/dashboard" replace />;
    }

    if (usuario.rol === "usuario") {
      return <Navigate to="/usuario" replace />;
    }

    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;