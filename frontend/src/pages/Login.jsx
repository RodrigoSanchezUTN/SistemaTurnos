import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const iniciarSesion = () => {
    if (email === "" || password === "") {
      alert("Complete todos los campos");
      return;
    }

    alert("Login correcto (más adelante se conectará al backend)");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #0d6efd, #6f42c1)",
      }}
    >
      <div
        className="card shadow-lg border-0 p-5"
        style={{
          width: "420px",
          borderRadius: "20px",
        }}
      >
        <div className="text-center mb-4">
          <h1>📅</h1>

          <h2 className="fw-bold">Sistema de Turnos</h2>

          <p className="text-muted">
            Bienvenido nuevamente
          </p>
        </div>

        <div className="mb-3">
          <label className="form-label">
            Correo electrónico
          </label>

          <input
            type="email"
            className="form-control form-control-lg"
            placeholder="correo@empresa.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="form-label">
            Contraseña
          </label>

          <input
            type="password"
            className="form-control form-control-lg"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="btn btn-primary btn-lg w-100"
          onClick={iniciarSesion}
        >
          Iniciar sesión
        </button>

        <p className="text-center text-muted mt-4 mb-0">
          © 2026 Sistema de Gestión de Turnos
        </p>
      </div>
    </div>
  );
}

export default Login;