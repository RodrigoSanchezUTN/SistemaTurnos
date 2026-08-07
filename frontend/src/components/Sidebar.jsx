import {
  FaHome,
  FaUsers,
  FaSpa,
  FaCalendarAlt,
  FaRegCalendarAlt,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import { Link, useLocation, useNavigate } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menu = [
    {
      nombre: "Dashboard",
      ruta: "/dashboard",
      icono: <FaHome />,
    },
    {
      nombre: "Clientes",
      ruta: "/clientes",
      icono: <FaUsers />,
    },
    {
      nombre: "Servicios",
      ruta: "/servicios",
      icono: <FaSpa />,
    },
    {
      nombre: "Turnos",
      ruta: "/turnos",
      icono: <FaCalendarAlt />,
    },
    {
      nombre: "Calendario",
      ruta: "/calendario",
      icono: <FaRegCalendarAlt />,
    },
    {
      nombre: "Estadísticas",
      ruta: "/estadisticas",
      icono: <FaChartBar />,
    },
    {
      nombre: "Configuración",
      ruta: "/configuracion",
      icono: <FaCog />,
    },
  ];

  const cerrarSesion = () => {
    navigate("/");
  };

  return (
    <aside
      style={{
        width: "270px",
        minHeight: "100vh",
        background: "#1e293b",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: "30px",
          textAlign: "center",
          borderBottom: "1px solid #334155",
        }}
      >
        <h3 className="fw-bold mb-1">Turnify</h3>

        <small style={{ color: "#94a3b8" }}>
          Sistema de Gestión
        </small>
      </div>

      <div
        className="p-3"
        style={{
          flex: 1,
        }}
      >
        {menu.map((item) => (
          <Link
            key={item.ruta}
            to={item.ruta}
            className={`btn w-100 text-start mb-2 ${
              location.pathname === item.ruta
                ? "btn-primary"
                : ""
            }`}
            style={{
              background:
                location.pathname === item.ruta
                  ? "#2563eb"
                  : "transparent",

              color: "white",

              border: "none",

              padding: "12px",

              borderRadius: "10px",
            }}
          >
            <span className="me-3">
              {item.icono}
            </span>

            {item.nombre}
          </Link>
        ))}
      </div>

      <div
        className="p-3"
        style={{
          borderTop: "1px solid #334155",
        }}
      >
        <button
          onClick={cerrarSesion}
          className="btn btn-danger w-100"
        >
          <FaSignOutAlt className="me-2" />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;