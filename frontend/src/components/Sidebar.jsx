function Sidebar() {
  return (
    <div
      className="bg-dark text-white p-3"
      style={{
        width: "250px",
        minHeight: "100vh",
      }}
    >
      <h3 className="mb-4">📅 Turnify</h3>

      <ul className="nav flex-column">

        <li className="nav-item mb-2">
          <a href="#" className="nav-link text-white">
            🏠 Dashboard
          </a>
        </li>

        <li className="nav-item mb-2">
          <a href="#" className="nav-link text-white">
            👥 Clientes
          </a>
        </li>

        <li className="nav-item mb-2">
          <a href="#" className="nav-link text-white">
            💼 Servicios
          </a>
        </li>

        <li className="nav-item mb-2">
          <a href="#" className="nav-link text-white">
            📅 Turnos
          </a>
        </li>

        <li className="nav-item mb-2">
          <a href="#" className="nav-link text-white">
            📊 Estadísticas
          </a>
        </li>

        <li className="nav-item mt-5">
          <a href="#" className="nav-link text-danger">
            🚪 Cerrar sesión
          </a>
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;