import {
  FaBell,
  FaUserCircle,
  FaSearch,
  FaSignOutAlt,
  FaCog,
} from "react-icons/fa";

function Navbar() {
  const fecha = new Date().toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <nav
      className="navbar bg-white shadow-sm px-4"
      style={{
        height: "75px",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <div className="container-fluid">

        <div>

          <h4
            className="fw-bold mb-0"
            style={{ color: "#1e293b" }}
          >
            Dashboard
          </h4>

          <small className="text-muted">
            {fecha}
          </small>

        </div>

        <div
          className="d-flex align-items-center"
          style={{ gap: "20px" }}
        >

          <div
            className="d-flex align-items-center"
            style={{
              background: "#f1f5f9",
              padding: "8px 15px",
              borderRadius: "12px",
              width: "260px",
            }}
          >

            <FaSearch
              color="#64748b"
              style={{ marginRight: "10px" }}
            />

            <input
              type="text"
              placeholder="Buscar..."
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
                width: "100%",
              }}
            />

          </div>

          <button
            className="btn btn-light"
            style={{
              borderRadius: "12px",
            }}
          >
            <FaBell size={18} />
          </button>

          <div className="dropdown">

            <button
              className="btn btn-light dropdown-toggle d-flex align-items-center"
              data-bs-toggle="dropdown"
            >
              <FaUserCircle
                size={28}
                className="me-2"
              />

              Administrador
            </button>

            <ul className="dropdown-menu dropdown-menu-end">

              <li>

                <button className="dropdown-item">

                  <FaUserCircle className="me-2" />

                  Perfil

                </button>

              </li>

              <li>

                <button className="dropdown-item">

                  <FaCog className="me-2" />

                  Configuración

                </button>

              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>

                <button className="dropdown-item text-danger">

                  <FaSignOutAlt className="me-2" />

                  Cerrar sesión

                </button>

              </li>

            </ul>

          </div>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;