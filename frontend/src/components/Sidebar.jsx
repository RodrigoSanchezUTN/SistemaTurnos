import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      className="bg-dark text-white p-3"
      style={{
        width: "240px",
        minHeight: "100vh",
      }}
    >
      <h4 className="mb-4">📅 Turnify</h4>

      <div className="d-grid gap-2">

        <Link className="btn btn-outline-light" to="/dashboard">
          Dashboard
        </Link>

        <Link className="btn btn-outline-light" to="/clientes">
          Clientes
        </Link>

        <Link className="btn btn-outline-light" to="/servicios">
          Servicios
        </Link>

        <Link className="btn btn-outline-light" to="/turnos">
          Turnos
        </Link>

        <Link className="btn btn-outline-light" to="/estadisticas">
          Estadísticas
        </Link>

      </div>

    </div>
  );
}

export default Sidebar;