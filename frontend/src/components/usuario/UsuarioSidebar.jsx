import {
  FaHome,
  FaCalendarAlt,
  FaPlusCircle,
  FaUser,
  FaSignOutAlt,
  FaExclamationTriangle,
} from "react-icons/fa";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useContext, useState } from "react";
import UsuarioContext from "../../context/UsuarioContext";

function UsuarioSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const { cerrarSesion } =
    useContext(UsuarioContext);

  const [mostrarConfirmacion, setMostrarConfirmacion] =
    useState(false);

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
  // MOSTRAR CONFIRMACIÓN
  // ==========================

  const manejarCerrarSesion = () => {
    setMostrarConfirmacion(true);
  };

  // ==========================
  // CONFIRMAR CIERRE
  // ==========================

  const confirmarCerrarSesion = () => {
    setMostrarConfirmacion(false);

    cerrarSesion();

    navigate("/", {
      replace: true,
    });
  };

  // ==========================
  // CANCELAR
  // ==========================

  const cancelarCerrarSesion = () => {
    setMostrarConfirmacion(false);
  };

  return (
    <>
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

      {/* ==========================
          MODAL DE CONFIRMACIÓN
      ========================== */}

      {mostrarConfirmacion && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{
            backgroundColor:
              "rgba(0, 0, 0, 0.45)",
            zIndex: 9999,
            padding: "20px",
          }}
        >
          <div
            className="bg-white shadow-lg rounded-4"
            style={{
              width: "420px",
              maxWidth: "100%",
              padding: "30px",
            }}
          >
            {/* ICONO */}

            <div className="text-center mb-3">
              <div
                className="d-flex justify-content-center align-items-center mx-auto"
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  background:
                    "#fff3cd",
                }}
              >
                <FaExclamationTriangle
                  size={28}
                  style={{
                    color: "#f59e0b",
                  }}
                />
              </div>
            </div>

            {/* TÍTULO */}

            <h4 className="text-center fw-bold mb-2">
              ¿Cerrar sesión?
            </h4>

            <p className="text-center text-muted mb-4">
              ¿Estás seguro de que querés
              cerrar tu sesión?
            </p>

            {/* BOTONES */}

            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-light border w-50"
                style={{
                  height: "46px",
                  fontWeight: "600",
                }}
                onClick={
                  cancelarCerrarSesion
                }
              >
                Cancelar
              </button>

              <button
                type="button"
                className="btn btn-danger w-50"
                style={{
                  height: "46px",
                  fontWeight: "600",
                }}
                onClick={
                  confirmarCerrarSesion
                }
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UsuarioSidebar;