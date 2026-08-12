import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";
import {
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";

import { FaGoogle } from "react-icons/fa";

import { auth } from "../firebase";
import UsuarioContext from "../context/UsuarioContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [recordarme, setRecordarme] =
    useState(false);

  const [cargando, setCargando] =
    useState(false);

  const [cargandoGoogle, setCargandoGoogle] =
    useState(false);

  const {
    iniciarSesion,
    iniciarSesionConGoogle,
  } = useContext(UsuarioContext);

  const navigate = useNavigate();

  // =========================
  // LOGIN CON EMAIL
  // =========================

  const iniciarSesionUsuario = async () => {
    if (!email.trim() || !password) {
        alert("Completá todos los campos.");
        return;
    }

    try {
        setCargando(true);

        const emailIngresado = email.trim().toLowerCase();

        const resultado = await login(
            emailIngresado,
            password
        );

        const usuarioBackend = resultado.usuario;

        // Convertir los roles del backend
        // al formato que utiliza actualmente el frontend
        const rolFrontend =
            usuarioBackend.rol === "Administrador"
                ? "admin"
                : "usuario";

        const datosUsuario = {
            id: usuarioBackend.id,
            nombre: usuarioBackend.nombre,
            email: usuarioBackend.email,
            telefono: "",
            foto: "",
            rol: rolFrontend,
            proveedor: "backend",
        };

        // Guardar el JWT
        if (recordarme) {
            localStorage.setItem(
                "token",
                resultado.token
            );
        } else {
            sessionStorage.setItem(
                "token",
                resultado.token
            );
        }

        iniciarSesion(datosUsuario);

        // Redirigir según el rol
        if (rolFrontend === "admin") {
            navigate("/dashboard");
        } else {
            navigate("/usuario");
        }

    } catch (error) {
        console.error(
            "Error al iniciar sesión:",
            error
        );

        alert(
            error.message ||
            "No se pudo iniciar sesión. Intentá nuevamente."
        );

    } finally {
        setCargando(false);
    }
};
  // =========================
  // GOOGLE
  // =========================

  const iniciarGoogle = async () => {
    try {
      setCargandoGoogle(true);

      // =========================
      // PERSISTENCIA FIREBASE
      // =========================

      await setPersistence(
        auth,
        recordarme
          ? browserLocalPersistence
          : browserSessionPersistence
      );

      // =========================
      // LOGIN GOOGLE
      // =========================

      await iniciarSesionConGoogle();

      navigate("/usuario");

    } catch (error) {
      console.error(
        "Error al iniciar sesión con Google:",
        error
      );

      alert(
        "No se pudo iniciar sesión con Google. Intentá nuevamente."
      );

    } finally {
      setCargandoGoogle(false);
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
    boxSizing: "border-box",
    overflowY: "auto",
  }}
>
      <div
        className="card shadow-lg border-0"
        style={{
          width: "390px",
          borderRadius: "18px",
          padding: "32px",
        }}
      >

        {/* =========================
            ENCABEZADO
        ========================= */}

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
            Sistema de Turnos
          </h4>

          <p className="text-muted mb-0">
            Bienvenido nuevamente
          </p>

        </div>

        {/* =========================
            EMAIL
        ========================= */}

        <div className="mb-3">

          <label className="form-label fw-semibold">
            Correo electrónico
          </label>

          <input
            type="email"
            className="form-control"
            style={{
              height: "46px",
            }}
            placeholder="correo@empresa.com"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

        </div>

        {/* =========================
            CONTRASEÑA
        ========================= */}

        <div className="mb-2">

          <label className="form-label fw-semibold">
            Contraseña
          </label>

          <input
            type="password"
            className="form-control"
            style={{
              height: "46px",
            }}
            placeholder="********"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

        </div>

        {/* =========================
            RECORDARME
        ========================= */}

        <div className="form-check mb-3">

          <input
            type="checkbox"
            className="form-check-input"
            id="recordarme"
            checked={recordarme}
            onChange={(e) =>
              setRecordarme(
                e.target.checked
              )
            }
          />

          <label
  className="form-check-label"
  htmlFor="recordarme"
  translate="no"
  style={{
    cursor: "pointer",
    userSelect: "none",
  }}
>
  Recordarme
</label>

        </div>

        {/* =========================
            LOGIN
        ========================= */}

        <button
          type="button"
          className="btn btn-primary w-100"
          style={{
            height: "46px",
            fontWeight: "600",
          }}
          onClick={
            iniciarSesionUsuario
          }
          disabled={cargando}
        >
          {cargando
            ? "Ingresando..."
            : "Iniciar sesión"}
        </button>

        {/* =========================
            REGISTRO
        ========================= */}

        <div className="text-center mt-3">

          <span className="text-muted">
            ¿No tenés una cuenta?
          </span>

          <button
            type="button"
            className="btn btn-link p-0 ms-2"
            onClick={() =>
              navigate("/registro")
            }
          >
            Crear cuenta
          </button>

        </div>

        {/* =========================
            SEPARADOR
        ========================= */}

        <div className="d-flex align-items-center my-3">

          <div
            className="flex-grow-1"
            style={{
              height: "1px",
              background: "#dee2e6",
            }}
          />

          <span
            className="mx-3 text-muted"
            style={{
              fontSize: "13px",
            }}
          >
            o
          </span>

          <div
            className="flex-grow-1"
            style={{
              height: "1px",
              background: "#dee2e6",
            }}
          />

        </div>

        {/* =========================
            GOOGLE
        ========================= */}

        <button
          type="button"
          className="btn btn-outline-dark w-100 d-flex justify-content-center align-items-center"
          style={{
            height: "46px",
            fontWeight: "600",
          }}
          onClick={iniciarGoogle}
          disabled={cargandoGoogle}
        >

          <FaGoogle className="me-2" />

          {cargandoGoogle
            ? "Conectando..."
            : "Continuar con Google"}

        </button>

        {/* =========================
            FOOTER
        ========================= */}

        <p
          className="text-center text-muted mt-3 mb-0"
          style={{
            fontSize: "12px",
          }}
        >
          © Solución Digital · 2026 · San Rafael, Mendoza, Argentina
        </p>

      </div>
    </div>
  );
}

export default Login;