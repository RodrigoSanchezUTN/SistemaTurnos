import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
} from "react-icons/fa";

import { auth } from "../firebase";
import UsuarioContext from "../context/UsuarioContext";

function Registro() {
  const navigate = useNavigate();

  const { iniciarSesion } =
    useContext(UsuarioContext);

  const [nombre, setNombre] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [telefono, setTelefono] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmarPassword, setConfirmarPassword] =
    useState("");

  const [cargando, setCargando] =
    useState(false);

  // ==========================
  // REGISTRAR USUARIO
  // ==========================

  const registrarUsuario = async () => {
    // ==========================
    // VALIDACIONES
    // ==========================

    if (!nombre.trim()) {
      alert(
        "Ingresá tu nombre completo."
      );
      return;
    }

    if (!email.trim()) {
      alert(
        "Ingresá tu correo electrónico."
      );
      return;
    }

    if (!telefono.trim()) {
      alert(
        "Ingresá tu teléfono."
      );
      return;
    }

    if (!password) {
      alert(
        "Ingresá una contraseña."
      );
      return;
    }

    if (password.length < 6) {
      alert(
        "La contraseña debe tener al menos 6 caracteres."
      );
      return;
    }

    if (
      password !==
      confirmarPassword
    ) {
      alert(
        "Las contraseñas no coinciden."
      );
      return;
    }

    try {
      setCargando(true);

      // ==========================
      // CREAR CUENTA
      // ==========================

      const resultado =
        await createUserWithEmailAndPassword(
          auth,
          email.trim().toLowerCase(),
          password
        );

      const usuarioFirebase =
        resultado.user;

      // ==========================
      // GUARDAR NOMBRE
      // ==========================

      await updateProfile(
        usuarioFirebase,
        {
          displayName:
            nombre.trim(),
        }
      );

      // ==========================
      // ENVIAR VERIFICACIÓN
      // ==========================

      await sendEmailVerification(
        usuarioFirebase
      );

      // ==========================
      // DATOS DE TURNIFY
      // ==========================

      const datosUsuario = {
        nombre: nombre.trim(),

        email:
          usuarioFirebase.email ||
          email.trim().toLowerCase(),

        telefono:
          telefono.trim(),

        foto:
          usuarioFirebase.photoURL ||
          "",

        rol: "usuario",

        proveedor: "email",
      };

      // Guardamos temporalmente
      // los datos del usuario.
      iniciarSesion(
        datosUsuario
      );

      // ==========================
      // IR A VERIFICACIÓN
      // ==========================

      navigate(
        "/verificar-correo",
        {
          state: {
            email:
              usuarioFirebase.email ||
              email.trim().toLowerCase(),
          },
        }
      );

    } catch (error) {
      console.error(
        "Error al registrar usuario:",
        error
      );

      if (
        error.code ===
        "auth/email-already-in-use"
      ) {
        alert(
          "Ese correo electrónico ya está registrado."
        );
      } else if (
        error.code ===
        "auth/invalid-email"
      ) {
        alert(
          "El correo electrónico no es válido."
        );
      } else if (
        error.code ===
        "auth/weak-password"
      ) {
        alert(
          "La contraseña es demasiado débil."
        );
      } else {
        alert(
          "No se pudo crear la cuenta. Intentá nuevamente."
        );
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0d6efd, #6f42c1)",
        padding: "30px 15px",
      }}
    >
      <div
        className="card shadow-lg border-0"
        style={{
          width: "420px",
          maxWidth: "100%",
          borderRadius: "18px",
          padding: "32px",
        }}
      >

        {/* ENCABEZADO */}

        <div className="text-center mb-4">

          <h1
            className="fw-bold mb-1"
            style={{
              fontSize: "30px",
            }}
          >
            Turnify
          </h1>

          <h4 className="fw-bold mb-2">
            Crear cuenta
          </h4>

          <p className="text-muted mb-0">
            Completá tus datos para comenzar
          </p>

        </div>

        {/* NOMBRE */}

        <div className="mb-3">

          <label className="form-label fw-semibold">

            <FaUser className="me-2" />

            Nombre completo

          </label>

          <input
            type="text"
            className="form-control"
            style={{
              height: "46px",
            }}
            placeholder="Tu nombre completo"
            value={nombre}
            onChange={(e) =>
              setNombre(
                e.target.value
              )
            }
          />

        </div>

        {/* EMAIL */}

        <div className="mb-3">

          <label className="form-label fw-semibold">

            <FaEnvelope className="me-2" />

            Correo electrónico

          </label>

          <input
            type="email"
            className="form-control"
            style={{
              height: "46px",
            }}
            placeholder="correo@gmail.com"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />

        </div>

        {/* TELÉFONO */}

        <div className="mb-3">

          <label className="form-label fw-semibold">

            <FaPhone className="me-2" />

            Teléfono

          </label>

          <input
            type="tel"
            className="form-control"
            style={{
              height: "46px",
            }}
            placeholder="Tu teléfono"
            value={telefono}
            onChange={(e) =>
              setTelefono(
                e.target.value
              )
            }
          />

        </div>

        {/* CONTRASEÑA */}

        <div className="mb-3">

          <label className="form-label fw-semibold">

            <FaLock className="me-2" />

            Contraseña

          </label>

          <input
            type="password"
            className="form-control"
            style={{
              height: "46px",
            }}
            placeholder="Mínimo 6 caracteres"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

        </div>

        {/* CONFIRMAR */}

        <div className="mb-4">

          <label className="form-label fw-semibold">

            <FaLock className="me-2" />

            Confirmar contraseña

          </label>

          <input
            type="password"
            className="form-control"
            style={{
              height: "46px",
            }}
            placeholder="Repetí tu contraseña"
            value={
              confirmarPassword
            }
            onChange={(e) =>
              setConfirmarPassword(
                e.target.value
              )
            }
          />

        </div>

        {/* CREAR CUENTA */}

        <button
          type="button"
          className="btn btn-primary w-100"
          style={{
            height: "46px",
            fontWeight: "600",
          }}
          onClick={
            registrarUsuario
          }
          disabled={cargando}
        >
          {cargando
            ? "Creando cuenta..."
            : "Crear cuenta"}
        </button>

        {/* VOLVER */}

        <div className="text-center mt-3">

          <span className="text-muted">
            ¿Ya tenés una cuenta?
          </span>

          <button
            type="button"
            className="btn btn-link p-0 ms-2"
            onClick={() =>
              navigate("/")
            }
          >
            Iniciar sesión
          </button>

        </div>

        <p
          className="text-center text-muted mt-3 mb-0"
          style={{
            fontSize: "12px",
          }}
        >
          © 2026 Turnify
        </p>

      </div>
    </div>
  );
}

export default Registro;