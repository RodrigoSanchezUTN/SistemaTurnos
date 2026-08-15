import {
  useEffect,
  useRef,
  useState,
  useContext,
} from "react";

import {
  FaUserCircle,
  FaSignOutAlt,
  FaCog,
} from "react-icons/fa";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import Swal from "sweetalert2";

import UsuarioContext from "../context/UsuarioContext";

function Navbar() {
  const navigate = useNavigate();

  const {
    usuario,
    cerrarSesion: cerrarSesionContext,
  } = useContext(UsuarioContext);

  const [
    menuAbierto,
    setMenuAbierto,
  ] = useState(false);

  const menuRef = useRef(null);

  const fecha =
    new Date().toLocaleDateString(
      "es-AR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );

  // ==========================
  // CERRAR MENÚ AL HACER CLIC AFUERA
  // ==========================

  useEffect(() => {
    const cerrarMenu = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target
        )
      ) {
        setMenuAbierto(false);
      }
    };

    document.addEventListener(
      "mousedown",
      cerrarMenu
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        cerrarMenu
      );
    };
  }, []);

  // ==========================
  // CERRAR SESIÓN
  // ==========================

  const cerrarSesion = () => {
    setMenuAbierto(false);

    Swal.fire({
      title: "¿Cerrar sesión?",
      text: "¿Seguro que querés cerrar tu sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log("1. Confirmó cerrar sesión");
        try {
          // ==========================
          // CERRAR SESIÓN REAL
          // ==========================

          await cerrarSesionContext();

          // ==========================
          // VOLVER AL LOGIN
          // ==========================

          navigate("/", {
            replace: true,
          });

        } catch (error) {
          console.error(
            "Error al cerrar sesión:",
            error
          );

          Swal.fire({
            title: "Error",
            text:
              "No se pudo cerrar la sesión correctamente.",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        }
      }
    });
  };

  // ==========================
  // NOMBRE DEL USUARIO
  // ==========================

  const nombreUsuario =
    usuario?.nombre ||
    "Administrador";

  return (
    <nav
      className="navbar bg-white shadow-sm px-4"
      style={{
        height: "75px",
        borderBottom:
          "1px solid #e5e7eb",
      }}
    >
      <div className="container-fluid">

        {/* ==========================
            TÍTULO Y FECHA
        ========================== */}

        <div>
          <h4
            className="fw-bold mb-0"
            style={{
              color: "#1e293b",
            }}
          >
            Dashboard
          </h4>

          <small className="text-muted">
            {fecha}
          </small>
        </div>

        {/* ==========================
            CUENTA
        ========================== */}

        <div
          ref={menuRef}
          style={{
            position: "relative",
          }}
        >

          {/* BOTÓN USUARIO */}

          <button
            type="button"
            className="btn btn-light d-flex align-items-center"
            onClick={() =>
              setMenuAbierto(
                !menuAbierto
              )
            }
            style={{
              borderRadius: "8px",
            }}
          >
            <FaUserCircle
              size={28}
              className="me-2"
            />

            {nombreUsuario}

            <span
              className="ms-2"
              style={{
                fontSize: "12px",
              }}
            >
              {menuAbierto
                ? "▲"
                : "▼"}
            </span>
          </button>

          {/* ==========================
              MENÚ
          ========================== */}

          {menuAbierto && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                right: 0,
                minWidth: "210px",
                backgroundColor:
                  "#ffffff",
                border:
                  "1px solid #e5e7eb",
                borderRadius: "10px",
                boxShadow:
                  "0 8px 25px rgba(0, 0, 0, 0.15)",
                padding: "8px 0",
                zIndex: 1050,
              }}
            >

              {/* CONFIGURACIÓN */}

              <Link
                to="/configuracion"
                onClick={() =>
                  setMenuAbierto(false)
                }
                className="dropdown-item d-flex align-items-center"
                style={{
                  padding:
                    "10px 16px",
                  textDecoration:
                    "none",
                }}
              >
                <FaCog className="me-2" />

                Configuración
              </Link>

              {/* SEPARADOR */}

              <hr
                style={{
                  margin: "6px 0",
                  borderColor:
                    "#e5e7eb",
                }}
              />

              {/* CERRAR SESIÓN */}

              <button
                type="button"
                className="dropdown-item d-flex align-items-center text-danger"
                onClick={
                  cerrarSesion
                }
                style={{
                  padding:
                    "10px 16px",
                }}
              >
                <FaSignOutAlt className="me-2" />

                Cerrar sesión
              </button>

            </div>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;