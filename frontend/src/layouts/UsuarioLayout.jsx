import { useContext, useState } from "react";
import {
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import UsuarioSidebar from "../components/usuario/UsuarioSidebar";
import UsuarioContext from "../context/UsuarioContext";

// ==========================
// AVATAR DEL USUARIO
// ==========================

function AvatarUsuario({
  foto,
  nombre,
  inicial,
  tamaño = 44,
}) {
  const [imagenError, setImagenError] =
    useState(false);

  // Si no hay foto o la imagen no pudo cargar,
  // mostramos la inicial.
  if (!foto || imagenError) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          width: `${tamaño}px`,
          height: `${tamaño}px`,
          minWidth: `${tamaño}px`,
          borderRadius: "50%",
          background:
            "linear-gradient(135deg, #2563eb, #4f46e5)",
          color: "white",
          fontWeight: "700",
          fontSize:
            tamaño >= 44 ? "18px" : "16px",
        }}
      >
        {inicial}
      </div>
    );
  }

  return (
    <img
      src={foto}
      alt={`Foto de ${nombre}`}
      referrerPolicy="no-referrer"
      onError={() => {
        setImagenError(true);
      }}
      style={{
        width: `${tamaño}px`,
        height: `${tamaño}px`,
        minWidth: `${tamaño}px`,
        borderRadius: "50%",
        objectFit: "cover",
        display: "block",
      }}
    />
  );
}

// ==========================
// LAYOUT
// ==========================

function UsuarioLayout({ children }) {
  const {
    usuario,
    cerrarSesion,
  } = useContext(UsuarioContext);

  const navigate = useNavigate();

  const [menuAbierto, setMenuAbierto] =
    useState(false);

  const nombre =
    usuario?.nombre || "Usuario";

  const email =
    usuario?.email || "";

  const foto =
    usuario?.foto || "";

  const inicial =
    nombre.charAt(0).toUpperCase();

  // ==========================
  // CERRAR SESIÓN
  // ==========================

  const manejarCerrarSesion = () => {
    cerrarSesion();

    navigate("/", {
      replace: true,
    });
  };

  // ==========================
  // IR AL PERFIL
  // ==========================

  const irAlPerfil = () => {
    setMenuAbierto(false);

    navigate("/usuario/perfil");
  };

  return (
    <div
      className="d-flex"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
      }}
    >
      {/* SIDEBAR */}

      <UsuarioSidebar />

      {/* CONTENIDO */}

      <main
        className="flex-grow-1"
        style={{
          minWidth: 0,
        }}
      >
        {/* ==========================
            BARRA SUPERIOR
        ========================== */}

        <div
          className="bg-white border-bottom px-4 py-3"
          style={{
            minHeight: "76px",
          }}
        >
          <div
            className="d-flex justify-content-end align-items-center"
            style={{
              height: "100%",
              position: "relative",
            }}
          >
            {/* ==========================
                USUARIO
            ========================== */}

            <button
              type="button"
              onClick={() =>
                setMenuAbierto(
                  !menuAbierto
                )
              }
              className="btn border-0 bg-transparent d-flex align-items-center p-2"
              style={{
                gap: "12px",
                borderRadius: "12px",
              }}
            >
              {/* AVATAR */}

              <AvatarUsuario
                foto={foto}
                nombre={nombre}
                inicial={inicial}
                tamaño={44}
              />

              {/* DATOS */}

              <div
                className="d-flex flex-column text-start"
                style={{
                  lineHeight: "1.2",
                }}
              >
                <span
                  className="fw-bold"
                  style={{
                    fontSize: "15px",
                  }}
                >
                  {nombre}
                </span>

                <span
                  className="text-muted"
                  style={{
                    fontSize: "13px",
                  }}
                >
                  {email}
                </span>
              </div>

              {/* FLECHA */}

              <FaChevronDown
                size={13}
                style={{
                  marginLeft: "4px",
                }}
              />
            </button>

            {/* ==========================
                MENÚ DESPLEGABLE
            ========================== */}

            {menuAbierto && (
              <div
                className="position-absolute bg-white shadow-lg border rounded-4"
                style={{
                  top: "65px",
                  right: "16px",
                  width: "240px",
                  zIndex: 1000,
                  overflow: "hidden",
                }}
              >
                {/* ==========================
                    CABECERA DEL MENÚ
                ========================== */}

                <div className="p-3 border-bottom">
                  <div className="d-flex align-items-center gap-2">

                    <AvatarUsuario
                      foto={foto}
                      nombre={nombre}
                      inicial={inicial}
                      tamaño={42}
                    />

                    <div
                      className="text-truncate"
                      style={{
                        minWidth: 0,
                      }}
                    >
                      <div className="fw-bold text-truncate">
                        {nombre}
                      </div>

                      <small className="text-muted text-truncate d-block">
                        {email}
                      </small>
                    </div>

                  </div>
                </div>

                {/* ==========================
                    MI PERFIL
                ========================== */}

                <button
                  type="button"
                  onClick={irAlPerfil}
                  className="btn w-100 text-start border-0 rounded-0 px-3 py-3"
                  style={{
                    background: "white",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "#f8f9fa";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "white";
                  }}
                >
                  <FaUser className="me-3" />

                  Mi perfil
                </button>

                {/* ==========================
                    CONFIGURACIÓN
                ========================== */}

                <button
                  type="button"
                  disabled
                  className="btn w-100 text-start border-0 rounded-0 px-3 py-3 text-muted"
                  style={{
                    background: "white",
                    cursor: "not-allowed",
                  }}
                >
                  <FaCog className="me-3" />

                  Configuración

                  <small className="ms-2">
                    Próximamente
                  </small>
                </button>

                {/* ==========================
                    CERRAR SESIÓN
                ========================== */}

                <div className="border-top">
                  <button
                    type="button"
                    onClick={
                      manejarCerrarSesion
                    }
                    className="btn btn-danger w-100 text-start border-0 rounded-0 px-3 py-3"
                  >
                    <FaSignOutAlt className="me-3" />

                    Cerrar sesión
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ==========================
            CONTENIDO
        ========================== */}

        <div className="p-4">
          {children}
        </div>
      </main>
    </div>
  );
}

export default UsuarioLayout;