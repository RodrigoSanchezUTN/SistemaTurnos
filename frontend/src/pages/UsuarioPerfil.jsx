import { useContext, useState } from "react";
import { toast } from "react-toastify";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaSave,
  FaLock,
  FaGoogle,
} from "react-icons/fa";

import UsuarioLayout from "../layouts/UsuarioLayout";
import UsuarioContext from "../context/UsuarioContext";

function UsuarioPerfil() {
  const {
    usuario,
    setUsuario,
  } = useContext(UsuarioContext);

  // ==========================
  // DATOS PERSONALES
  // ==========================

  const [nombre, setNombre] =
    useState(usuario?.nombre || "");

  const [email, setEmail] =
    useState(usuario?.email || "");

  const [telefono, setTelefono] =
    useState(usuario?.telefono || "");

  // ==========================
  // CONTRASEÑA
  // ==========================

  const [passwordActual, setPasswordActual] =
    useState("");

  const [passwordNueva, setPasswordNueva] =
    useState("");

  const [
    passwordConfirmacion,
    setPasswordConfirmacion,
  ] = useState("");

  // ==========================
  // DETECTAR GOOGLE
  // ==========================

  const esUsuarioGoogle =
    usuario?.proveedor === "google";

  // ==========================
  // FOTO
  // ==========================

  const foto =
    usuario?.foto || "";

  const inicial =
    nombre.charAt(0).toUpperCase() ||
    "U";

  // ==========================
  // GUARDAR DATOS
  // ==========================

  const guardarCambios = () => {
    if (!nombre.trim()) {
      toast.error(
        "Ingresá tu nombre."
      );
      return;
    }

    if (!email.trim()) {
      toast.error(
        "Ingresá tu correo electrónico."
      );
      return;
    }

    if (!telefono.trim()) {
      toast.error(
        "Ingresá tu teléfono."
      );
      return;
    }

    setUsuario({
      ...usuario,

      nombre: nombre.trim(),

      email: email.trim(),

      telefono: telefono.trim(),
    });

    toast.success(
      "Perfil actualizado correctamente."
    );
  };

  // ==========================
  // CAMBIAR CONTRASEÑA
  // ==========================

  const cambiarContraseña = () => {
    if (!passwordActual) {
      toast.error(
        "Ingresá tu contraseña actual."
      );
      return;
    }

    if (!passwordNueva) {
      toast.error(
        "Ingresá una nueva contraseña."
      );
      return;
    }

    if (passwordNueva.length < 6) {
      toast.error(
        "La nueva contraseña debe tener al menos 6 caracteres."
      );
      return;
    }

    if (
      passwordNueva !==
      passwordConfirmacion
    ) {
      toast.error(
        "Las nuevas contraseñas no coinciden."
      );
      return;
    }

    const contraseñaGuardada =
      localStorage.getItem(
        "usuarioPassword"
      ) || "123456";

    if (
      passwordActual !==
      contraseñaGuardada
    ) {
      toast.error(
        "La contraseña actual es incorrecta."
      );
      return;
    }

    localStorage.setItem(
      "usuarioPassword",
      passwordNueva
    );

    setPasswordActual("");
    setPasswordNueva("");
    setPasswordConfirmacion("");

    toast.success(
      "Contraseña actualizada correctamente."
    );
  };

  return (
    <UsuarioLayout>

      {/* ==========================
          ENCABEZADO
      ========================== */}

      <div className="mb-4">

        <h2 className="fw-bold d-flex align-items-center">

          <FaUser className="me-2" />

          Mi perfil

        </h2>

        <p className="text-muted mb-0">
          Consultá y modificá tus datos
          personales y de seguridad.
        </p>

      </div>

      {/* ==========================
          PERFIL
      ========================== */}

      <div className="card border-0 shadow-sm rounded-4 mb-4">

        <div className="card-body p-4">

          {/* FOTO Y DATOS */}

          <div className="d-flex align-items-center mb-4">

            {/* AVATAR */}

            {foto ? (

              <img
                src={foto}
                alt={`Foto de ${nombre}`}
                referrerPolicy="no-referrer"
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border:
                    "3px solid #e9ecef",
                }}
              />

            ) : (

              <div
                className="d-flex justify-content-center align-items-center"
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, #2563eb, #4f46e5)",
                  color: "white",
                  fontSize: "32px",
                  fontWeight: "700",
                }}
              >
                {inicial}
              </div>

            )}

            {/* INFORMACIÓN */}

            <div className="ms-3">

              <h4 className="fw-bold mb-1">
                {nombre}
              </h4>

              <p className="text-muted mb-0">
                {email}
              </p>

              {esUsuarioGoogle && (
                <span className="badge bg-light text-dark border mt-2">
                  <FaGoogle className="me-1" />

                  Cuenta de Google
                </span>
              )}

            </div>

          </div>

          <hr className="mb-4" />

          <h5 className="fw-bold mb-4">
            Datos personales
          </h5>

          {/* ==========================
              NOMBRE
          ========================== */}

          <div className="mb-4">

            <label className="form-label fw-semibold">

              <FaUser className="me-2" />

              Nombre completo

            </label>

            <input
              type="text"
              className="form-control"
              value={nombre}
              onChange={(e) =>
                setNombre(
                  e.target.value
                )
              }
              placeholder="Tu nombre"
            />

          </div>

          {/* ==========================
              EMAIL
          ========================== */}

          <div className="mb-4">

            <label className="form-label fw-semibold">

              <FaEnvelope className="me-2" />

              Correo electrónico

            </label>

            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              placeholder="correo@ejemplo.com"
            />

            {esUsuarioGoogle && (
              <small className="text-muted">
                Este correo corresponde a tu
                cuenta de Google.
              </small>
            )}

          </div>

          {/* ==========================
              TELÉFONO
          ========================== */}

          <div className="mb-4">

            <label className="form-label fw-semibold">

              <FaPhone className="me-2" />

              Teléfono

            </label>

            <input
              type="tel"
              className="form-control"
              value={telefono}
              onChange={(e) =>
                setTelefono(
                  e.target.value
                )
              }
              placeholder="Tu teléfono"
            />

          </div>

          {/* ==========================
              GUARDAR
          ========================== */}

          <button
            type="button"
            className="btn btn-primary"
            onClick={
              guardarCambios
            }
          >

            <FaSave className="me-2" />

            Guardar cambios

          </button>

        </div>

      </div>

      {/* ==========================
          SEGURIDAD
      ========================== */}

      <div className="card border-0 shadow-sm rounded-4">

        <div className="card-body p-4">

          <h5 className="fw-bold mb-2 d-flex align-items-center">

            <FaLock className="me-2" />

            Seguridad

          </h5>

          {/* ==========================
              GOOGLE
          ========================== */}

          {esUsuarioGoogle ? (

            <div className="alert alert-light border rounded-4 mb-0">

              <div className="d-flex align-items-center mb-2">

                <FaGoogle
                  className="me-2"
                />

                <strong>
                  Cuenta vinculada con Google
                </strong>

              </div>

              <p className="text-muted mb-0">

                Tu cuenta utiliza Google para
                iniciar sesión. La contraseña
                de tu cuenta se administra
                directamente desde Google.

              </p>

            </div>

          ) : (

            <>
              <p className="text-muted mb-4">
                Cambiá tu contraseña para
                mantener tu cuenta segura.
              </p>

              {/* CONTRASEÑA ACTUAL */}

              <div className="mb-4">

                <label className="form-label fw-semibold">
                  Contraseña actual
                </label>

                <input
                  type="password"
                  className="form-control"
                  value={
                    passwordActual
                  }
                  onChange={(e) =>
                    setPasswordActual(
                      e.target.value
                    )
                  }
                  placeholder="Ingresá tu contraseña actual"
                />

              </div>

              {/* NUEVA CONTRASEÑA */}

              <div className="mb-4">

                <label className="form-label fw-semibold">
                  Nueva contraseña
                </label>

                <input
                  type="password"
                  className="form-control"
                  value={
                    passwordNueva
                  }
                  onChange={(e) =>
                    setPasswordNueva(
                      e.target.value
                    )
                  }
                  placeholder="Mínimo 6 caracteres"
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
                  value={
                    passwordConfirmacion
                  }
                  onChange={(e) =>
                    setPasswordConfirmacion(
                      e.target.value
                    )
                  }
                  placeholder="Repetí la nueva contraseña"
                />

              </div>

              {/* CAMBIAR */}

              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={
                  cambiarContraseña
                }
              >

                <FaLock className="me-2" />

                Cambiar contraseña

              </button>
            </>
          )}

        </div>

      </div>

    </UsuarioLayout>
  );
}

export default UsuarioPerfil;