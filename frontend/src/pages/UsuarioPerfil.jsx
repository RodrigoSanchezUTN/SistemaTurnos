import { useContext } from "react";
import { toast } from "react-toastify";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaSave,
  FaGoogle,
} from "react-icons/fa";

import UsuarioLayout from "../layouts/UsuarioLayout";
import UsuarioContext from "../context/UsuarioContext";

function UsuarioPerfil() {
  const {
    usuario,
    setUsuario,
  } = useContext(UsuarioContext);
  console.log("USUARIO EN PERFIL:", usuario);

  // ==========================
  // DATOS DEL USUARIO
  // ==========================

  const nombre =
    usuario?.nombre || "";

  const email =
    usuario?.email || "";

  const telefono =
    usuario?.telefono || "";

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
    nombre.charAt(0).toUpperCase() || "U";

  // ==========================
  // GUARDAR DATOS
  // ==========================

  const guardarCambios = () => {
    if (!usuario?.nombre?.trim()) {
      toast.error(
        "Ingresá tu nombre."
      );
      return;
    }

    if (!usuario?.email?.trim()) {
      toast.error(
        "Ingresá tu correo electrónico."
      );
      return;
    }

    if (!usuario?.telefono?.trim()) {
      toast.error(
        "Ingresá tu teléfono."
      );
      return;
    }

    setUsuario({
      ...usuario,
      nombre: usuario.nombre.trim(),
      email: usuario.email.trim(),
      telefono: usuario.telefono.trim(),
    });

    toast.success(
      "Perfil actualizado correctamente."
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
          Consultá y modificá tus datos personales.
        </p>

      </div>

      {/* ==========================
          PERFIL
      ========================== */}

      <div className="card border-0 shadow-sm rounded-4">

        <div className="card-body p-4">

          {/* ==========================
              FOTO Y DATOS
          ========================== */}

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

          {/* ==========================
              DATOS PERSONALES
          ========================== */}

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
                setUsuario({
                  ...usuario,
                  nombre: e.target.value,
                })
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
                setUsuario({
                  ...usuario,
                  email: e.target.value,
                })
              }
              placeholder="correo@ejemplo.com"
            />

            {esUsuarioGoogle && (
              <small className="text-muted">
                Este correo corresponde a tu cuenta de Google.
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
                setUsuario({
                  ...usuario,
                  telefono: e.target.value,
                })
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
            onClick={guardarCambios}
          >

            <FaSave className="me-2" />

            Guardar cambios

          </button>

        </div>

      </div>

    </UsuarioLayout>
  );
}

export default UsuarioPerfil;