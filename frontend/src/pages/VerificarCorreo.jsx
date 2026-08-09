import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  sendEmailVerification,
  reload,
} from "firebase/auth";

import {
  FaEnvelope,
  FaCheckCircle,
  FaSignOutAlt,
} from "react-icons/fa";

import { auth } from "../firebase";
import UsuarioContext from "../context/UsuarioContext";

function VerificarCorreo() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    usuario,
    cerrarSesion,
  } = useContext(UsuarioContext);

  const email =
    location.state?.email ||
    usuario?.email ||
    auth.currentUser?.email ||
    "";

  const [cargando, setCargando] =
    useState(false);

  const [reenviando, setReenviando] =
    useState(false);

  // ==========================
  // COMPROBAR VERIFICACIÓN
  // ==========================

  const comprobarVerificacion =
    async () => {
      try {
        setCargando(true);

        if (!auth.currentUser) {
          alert(
            "La sesión expiró. Volvé a iniciar sesión."
          );

          navigate("/", {
            replace: true,
          });

          return;
        }

        await reload(
          auth.currentUser
        );

        if (
          auth.currentUser
            .emailVerified
        ) {
          navigate("/usuario", {
            replace: true,
          });

          return;
        }

        alert(
          "Todavía no verificaste tu correo. Revisá tu bandeja de entrada."
        );
      } catch (error) {
        console.error(
          "Error comprobando correo:",
          error
        );

        alert(
          "No se pudo comprobar la verificación. Intentá nuevamente."
        );
      } finally {
        setCargando(false);
      }
    };

  // ==========================
  // REENVIAR CORREO
  // ==========================

  const reenviarCorreo =
    async () => {
      try {
        setReenviando(true);

        if (!auth.currentUser) {
          alert(
            "La sesión expiró. Volvé a registrarte o iniciar sesión."
          );

          navigate("/", {
            replace: true,
          });

          return;
        }

        if (
          auth.currentUser
            .emailVerified
        ) {
          alert(
            "Tu correo ya está verificado."
          );

          navigate("/usuario", {
            replace: true,
          });

          return;
        }

        await sendEmailVerification(
          auth.currentUser
        );

        alert(
          "Te enviamos nuevamente el correo de verificación."
        );
      } catch (error) {
        console.error(
          "Error reenviando correo:",
          error
        );

        if (
          error.code ===
          "auth/too-many-requests"
        ) {
          alert(
            "Se enviaron demasiados correos. Esperá unos minutos antes de volver a intentarlo."
          );
        } else {
          alert(
            "No se pudo reenviar el correo. Intentá nuevamente."
          );
        }
      } finally {
        setReenviando(false);
      }
    };

  // ==========================
  // CERRAR SESIÓN
  // ==========================

  const salir = () => {
    cerrarSesion();

    navigate("/", {
      replace: true,
    });
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
        className="card shadow-lg border-0 text-center"
        style={{
          width: "440px",
          maxWidth: "100%",
          borderRadius: "18px",
          padding: "38px 32px",
        }}
      >
        {/* ==========================
            ICONO
        ========================== */}

        <div className="mb-4">

          <div
            className="d-flex justify-content-center align-items-center mx-auto"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background:
                "rgba(13, 110, 253, 0.1)",
            }}
          >
            <FaEnvelope
              size={38}
              className="text-primary"
            />
          </div>

        </div>

        {/* ==========================
            TITULO
        ========================== */}

        <h2 className="fw-bold mb-2">
          Verificá tu correo
        </h2>

        <p className="text-muted mb-4">
          Te enviamos un correo de
          confirmación a:
        </p>

        {/* EMAIL */}

        <div
          className="bg-light rounded-3 p-3 mb-4"
          style={{
            wordBreak: "break-word",
          }}
        >
          <strong>
            {email}
          </strong>
        </div>

        {/* ==========================
            INSTRUCCIONES
        ========================== */}

        <p className="text-muted">
          Abrí el correo que te enviamos
          y hacé clic en el enlace de
          verificación.
        </p>

        <p
          className="text-muted mb-4"
          style={{
            fontSize: "14px",
          }}
        >
          Si no lo encontrás, revisá
          también la carpeta de
          <strong> Spam </strong>
          o correo no deseado.
        </p>

        {/* ==========================
            YA VERIFIQUÉ
        ========================== */}

        <button
          type="button"
          className="btn btn-primary w-100 mb-3"
          style={{
            height: "46px",
            fontWeight: "600",
          }}
          onClick={
            comprobarVerificacion
          }
          disabled={cargando}
        >
          <FaCheckCircle className="me-2" />

          {cargando
            ? "Comprobando..."
            : "Ya verifiqué mi correo"}
        </button>

        {/* ==========================
            REENVIAR
        ========================== */}

        <button
          type="button"
          className="btn btn-outline-primary w-100 mb-3"
          style={{
            height: "46px",
            fontWeight: "600",
          }}
          onClick={
            reenviarCorreo
          }
          disabled={reenviando}
        >
          {reenviando
            ? "Enviando..."
            : "Reenviar correo"}
        </button>

        {/* ==========================
            CERRAR SESIÓN
        ========================== */}

        <button
          type="button"
          className="btn btn-link text-muted"
          onClick={salir}
        >
          <FaSignOutAlt className="me-2" />

          Volver al inicio de sesión
        </button>

        {/* FOOTER */}

        <p
          className="text-muted mt-3 mb-0"
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

export default VerificarCorreo;