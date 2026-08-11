import { useEffect, useState } from "react";

import {
  FaCog,
  FaLock,
  FaBell,
  FaCheckCircle,
  FaTimes,
} from "react-icons/fa";

import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";

import UsuarioLayout from "../layouts/UsuarioLayout";
import { auth } from "../firebase";

function UsuarioConfiguracion() {
  // ==========================
  // NOTIFICACIONES
  // ==========================

  const [notificaciones, setNotificaciones] =
    useState(() => {
      const guardado =
        localStorage.getItem(
          "notificacionesUsuario"
        );

      return guardado !== null
        ? JSON.parse(guardado)
        : true;
    });

  // ==========================
  // CONTRASEÑA
  // ==========================

  const [mostrarCambioPassword, setMostrarCambioPassword] =
    useState(false);

  const [passwordActual, setPasswordActual] =
    useState("");

  const [passwordNueva, setPasswordNueva] =
    useState("");

  const [confirmarPassword, setConfirmarPassword] =
    useState("");

  const [cargandoPassword, setCargandoPassword] =
    useState(false);

  // ==========================
  // GUARDAR NOTIFICACIONES
  // ==========================

  useEffect(() => {
    localStorage.setItem(
      "notificacionesUsuario",
      JSON.stringify(notificaciones)
    );
  }, [notificaciones]);

  // ==========================
  // ABRIR CAMBIO DE CONTRASEÑA
  // ==========================

  const abrirCambioPassword = () => {
    setPasswordActual("");
    setPasswordNueva("");
    setConfirmarPassword("");

    setMostrarCambioPassword(true);
  };

  // ==========================
  // CERRAR CAMBIO DE CONTRASEÑA
  // ==========================

  const cerrarCambioPassword = () => {
    if (cargandoPassword) {
      return;
    }

    setMostrarCambioPassword(false);

    setPasswordActual("");
    setPasswordNueva("");
    setConfirmarPassword("");
  };

  // ==========================
  // CAMBIAR CONTRASEÑA
  // ==========================

  const cambiarPassword = async () => {
    if (!passwordActual) {
      alert(
        "Ingresá tu contraseña actual."
      );
      return;
    }

    if (!passwordNueva) {
      alert(
        "Ingresá una nueva contraseña."
      );
      return;
    }

    if (passwordNueva.length < 6) {
      alert(
        "La nueva contraseña debe tener al menos 6 caracteres."
      );
      return;
    }

    if (
      passwordNueva !==
      confirmarPassword
    ) {
      alert(
        "Las nuevas contraseñas no coinciden."
      );
      return;
    }

    if (
      passwordNueva ===
      passwordActual
    ) {
      alert(
        "La nueva contraseña debe ser diferente a la actual."
      );
      return;
    }

    const usuarioFirebase =
      auth.currentUser;

    if (!usuarioFirebase) {
      alert(
        "Tu sesión expiró. Volvé a iniciar sesión."
      );
      return;
    }

    // ==========================
    // COMPROBAR PROVEEDOR
    // ==========================

    const tieneProveedorPassword =
      usuarioFirebase.providerData.some(
        (proveedor) =>
          proveedor.providerId ===
          "password"
      );

    if (!tieneProveedorPassword) {
      alert(
        "Esta cuenta utiliza Google para iniciar sesión. La contraseña se administra desde Google."
      );
      return;
    }

    try {
      setCargandoPassword(true);

      // ==========================
      // REAUTENTICAR
      // ==========================

      const credential =
        EmailAuthProvider.credential(
          usuarioFirebase.email,
          passwordActual
        );

      await reauthenticateWithCredential(
        usuarioFirebase,
        credential
      );

      // ==========================
      // ACTUALIZAR CONTRASEÑA
      // ==========================

      await updatePassword(
        usuarioFirebase,
        passwordNueva
      );

      alert(
        "Contraseña actualizada correctamente."
      );

      cerrarCambioPassword();

    } catch (error) {
      console.error(
        "Error al cambiar contraseña:",
        error
      );

      if (
        error.code ===
        "auth/invalid-credential"
      ) {
        alert(
          "La contraseña actual es incorrecta."
        );
      } else if (
        error.code ===
        "auth/wrong-password"
      ) {
        alert(
          "La contraseña actual es incorrecta."
        );
      } else if (
        error.code ===
        "auth/weak-password"
      ) {
        alert(
          "La nueva contraseña es demasiado débil."
        );
      } else if (
        error.code ===
        "auth/requires-recent-login"
      ) {
        alert(
          "Por seguridad, cerrá sesión e iniciá sesión nuevamente antes de cambiar la contraseña."
        );
      } else {
        alert(
          "No se pudo cambiar la contraseña. Intentá nuevamente."
        );
      }

    } finally {
      setCargandoPassword(false);
    }
  };

  return (
    <UsuarioLayout>

      {/* ==========================
          ENCABEZADO
      ========================== */}

      <div className="mb-4">

        <h2 className="fw-bold d-flex align-items-center mb-2">
          <FaCog className="me-2" />

          Configuración
        </h2>

        <p className="text-muted mb-0">
          Administrá la seguridad y las preferencias
          de tu cuenta.
        </p>

      </div>

      {/* ==========================
          SEGURIDAD
      ========================== */}

      <div className="card border-0 shadow-sm rounded-4 mb-4">

        <div className="card-body p-4">

          <div className="d-flex align-items-center mb-4">

            <div
              className="d-flex justify-content-center align-items-center me-3"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "14px",
                background: "#fff3cd",
                color: "#f59e0b",
              }}
            >
              <FaLock size={22} />
            </div>

            <div>

              <h5 className="fw-bold mb-1">
                Seguridad
              </h5>

              <p className="text-muted mb-0">
                Administrá la seguridad de tu cuenta.
              </p>

            </div>

          </div>

          {/* CONTRASEÑA */}

          <div className="border rounded-4 p-3 mb-3">

            <div className="d-flex align-items-center">

              <div className="flex-grow-1">

                <div className="fw-semibold mb-1">
                  Contraseña
                </div>

                <div className="text-muted">
                  Cambiá tu contraseña para mantener
                  tu cuenta protegida.
                </div>

              </div>

              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={
                  abrirCambioPassword
                }
              >
                Cambiar contraseña
              </button>

            </div>

          </div>

          {/* CORREO */}

          <div className="border rounded-4 p-3">

            <div className="d-flex align-items-center">

              <div
                className="d-flex justify-content-center align-items-center me-3"
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "12px",
                  background: "#d1fae5",
                  color: "#16a34a",
                }}
              >
                <FaCheckCircle />
              </div>

              <div className="flex-grow-1">

                <div className="fw-semibold mb-1">
                  Correo electrónico
                </div>

                <div className="text-muted">
                  Tu correo electrónico está verificado.
                </div>

              </div>

              <span
                className="badge rounded-pill"
                style={{
                  background: "#d1fae5",
                  color: "#15803d",
                  padding: "8px 14px",
                }}
              >
                Verificado
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* ==========================
          NOTIFICACIONES
      ========================== */}

      <div className="card border-0 shadow-sm rounded-4">

        <div className="card-body p-4">

          <div className="d-flex align-items-center mb-4">

            <div
              className="d-flex justify-content-center align-items-center me-3"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "14px",
                background: "#f3e8ff",
                color: "#9333ea",
              }}
            >
              <FaBell size={22} />
            </div>

            <div>

              <h5 className="fw-bold mb-1">
                Notificaciones
              </h5>

              <p className="text-muted mb-0">
                Elegí cómo querés recibir información.
              </p>

            </div>

          </div>

          <div className="border rounded-4 p-3">

            <div className="d-flex align-items-center">

              <div className="flex-grow-1">

                <div className="fw-semibold mb-1">
                  Notificaciones sobre turnos
                </div>

                <div className="text-muted">
                  Recibir avisos sobre tus turnos
                  y recordatorios.
                </div>

              </div>

              <div className="form-check form-switch">

                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  checked={notificaciones}
                  onChange={(e) =>
                    setNotificaciones(
                      e.target.checked
                    )
                  }
                  style={{
                    width: "42px",
                    height: "22px",
                    cursor: "pointer",
                  }}
                />

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ==========================
          MODAL CAMBIAR CONTRASEÑA
      ========================== */}

      {mostrarCambioPassword && (

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
              width: "440px",
              maxWidth: "100%",
              padding: "30px",
            }}
          >

            {/* ENCABEZADO */}

            <div className="d-flex justify-content-between align-items-center mb-4">

              <div>

                <h4 className="fw-bold mb-1">
                  Cambiar contraseña
                </h4>

                <p className="text-muted mb-0">
                  Actualizá la contraseña de tu cuenta.
                </p>

              </div>

              <button
                type="button"
                className="btn btn-light rounded-circle"
                onClick={
                  cerrarCambioPassword
                }
                disabled={
                  cargandoPassword
                }
                style={{
                  width: "38px",
                  height: "38px",
                  padding: 0,
                }}
              >
                <FaTimes />
              </button>

            </div>

            {/* CONTRASEÑA ACTUAL */}

            <div className="mb-3">

              <label className="form-label fw-semibold">
                Contraseña actual
              </label>

              <input
                type="password"
                className="form-control"
                placeholder="Ingresá tu contraseña actual"
                value={
                  passwordActual
                }
                onChange={(e) =>
                  setPasswordActual(
                    e.target.value
                  )
                }
                disabled={
                  cargandoPassword
                }
              />

            </div>

            {/* NUEVA CONTRASEÑA */}

            <div className="mb-3">

              <label className="form-label fw-semibold">
                Nueva contraseña
              </label>

              <input
                type="password"
                className="form-control"
                placeholder="Mínimo 6 caracteres"
                value={
                  passwordNueva
                }
                onChange={(e) =>
                  setPasswordNueva(
                    e.target.value
                  )
                }
                disabled={
                  cargandoPassword
                }
              />

            </div>

            {/* CONFIRMAR */}

            <div className="mb-4">

              <label className="form-label fw-semibold">
                Confirmar nueva contraseña
              </label>

              <input
                type="password"
                className="form-control"
                placeholder="Repetí la nueva contraseña"
                value={
                  confirmarPassword
                }
                onChange={(e) =>
                  setConfirmarPassword(
                    e.target.value
                  )
                }
                disabled={
                  cargandoPassword
                }
              />

            </div>

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
                  cerrarCambioPassword
                }
                disabled={
                  cargandoPassword
                }
              >
                Cancelar
              </button>

              <button
                type="button"
                className="btn btn-primary w-50"
                style={{
                  height: "46px",
                  fontWeight: "600",
                }}
                onClick={
                  cambiarPassword
                }
                disabled={
                  cargandoPassword
                }
              >
                {cargandoPassword
                  ? "Actualizando..."
                  : "Cambiar contraseña"}
              </button>

            </div>

          </div>

        </div>
      )}

    </UsuarioLayout>
  );
}

export default UsuarioConfiguracion;