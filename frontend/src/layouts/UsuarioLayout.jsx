import { useContext, useState } from "react";
import {
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaChevronDown,
  FaExclamationTriangle,
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

  const [mostrarConfirmacion, setMostrarConfirmacion] =
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
  // MOSTRAR CONFIRMACIÓN
  // ==========================

  const manejarCerrarSesion = () => {
    setMenuAbierto(false);
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
  // CANCELAR CIERRE
  // ==========================

  const cancelarCerrarSesion = () => {
    setMostrarConfirmacion(false);
  };

  // ==========================
  // IR AL PERFIL
  // ==========================

  const irAlPerfil = () => {
    setMenuAbierto(false);

    navigate("/usuario/perfil");
  };

  return (
    <>
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
              {/* USUARIO */}

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
                  {/* CABECERA */}

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

                  {/* MI PERFIL */}

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

                  {/* CONFIGURACIÓN */}

<button
  type="button"
  onClick={() => {
    setMenuAbierto(false);
    navigate("/usuario/configuracion");
  }}
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
  <FaCog className="me-3" />

  Configuración
</button>

                  {/* CERRAR SESIÓN */}

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

          {/* CONTENIDO */}

          <div className="p-4">
            {children}
          </div>
        </main>
      </div>

      {/* ==========================
          MODAL CONFIRMAR CIERRE
      ========================== */}

      {mostrarConfirmacion && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{
            backgroundColor:
              "rgba(0, 0, 0, 0.45)",
            zIndex: 2000,
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

            {/* TITULO */}

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

export default UsuarioLayout;