import {
  FaHome,
  FaCalendarAlt,
  FaPlusCircle,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useContext } from "react";
import UsuarioContext from "../../context/UsuarioContext";

function UsuarioSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const { cerrarSesion } =
    useContext(UsuarioContext);

  const menu = [
    {
      nombre: "Inicio",
      ruta: "/usuario",
      icono: <FaHome />,
    },
    {
      nombre: "Mis turnos",
      ruta: "/usuario/turnos",
      icono: <FaCalendarAlt />,
    },
    {
      nombre: "Reservar turno",
      ruta: "/usuario/reservar",
      icono: <FaPlusCircle />,
    },
    {
      nombre: "Mi perfil",
      ruta: "/usuario/perfil",
      icono: <FaUser />,
    },
  ];

  // ==========================
  // CERRAR SESIÓN
  // ==========================

  const manejarCerrarSesion = () => {
    cerrarSesion();

    navigate("/", {
      replace: true,
    });
  };

  return (
    <aside
      style={{
        width: "270px",
        minHeight: "100vh",
        background: "#1e293b",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* LOGO */}

      <div
        style={{
          padding: "30px",
          textAlign: "center",
          borderBottom:
            "1px solid #334155",
        }}
      >
        <h3 className="fw-bold mb-1">
          Turnify
        </h3>

        <small
          style={{
            color: "#94a3b8",
          }}
        >
          Panel de usuario
        </small>
      </div>

      {/* MENÚ */}

      <div
        className="p-3"
        style={{
          flex: 1,
        }}
      >
        {menu.map((item) => (
          <Link
            key={item.ruta}
            to={item.ruta}
            className="btn w-100 text-start mb-2"
            style={{
              background:
                location.pathname ===
                item.ruta
                  ? "#2563eb"
                  : "transparent",

              color: "white",

              border: "none",

              padding: "12px",

              borderRadius: "10px",
            }}
          >
            <span className="me-3">
              {item.icono}
            </span>

            {item.nombre}
          </Link>
        ))}
      </div>

      {/* CERRAR SESIÓN */}

      <div
        className="p-3"
        style={{
          borderTop:
            "1px solid #334155",
        }}
      >
        <button
          type="button"
          onClick={
            manejarCerrarSesion
          }
          className="btn btn-danger w-100"
        >
          <FaSignOutAlt className="me-2" />

          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}

export default UsuarioSidebar;