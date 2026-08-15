import { useContext } from "react";
import { Link } from "react-router-dom";

import {
  FaUsers,
  FaSpa,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaClock,
  FaPlus,
  FaHandPaper,
  FaBolt,
} from "react-icons/fa";

import DashboardLayout from "../layouts/DashboardLayout";
import AppContext from "../context/AppContext";

import "../styles/dashboard.css";

function Dashboard() {
  const {
    clientes,
    servicios,
    turnos,
  } = useContext(AppContext);

  // ==========================
  // INGRESOS
  // ==========================

  const ingresos = turnos.reduce(
    (total, turno) => {
      const precio =
        turno.servicio?.precio || 0;

      return total + Number(precio);
    },
    0
  );

  // ==========================
  // FECHA ACTUAL
  // ==========================

  const fechaHoy = new Date();

  const añoHoy =
    fechaHoy.getFullYear();

  const mesHoy = String(
    fechaHoy.getMonth() + 1
  ).padStart(2, "0");

  const diaHoy = String(
    fechaHoy.getDate()
  ).padStart(2, "0");

  const fechaActual =
    `${añoHoy}-${mesHoy}-${diaHoy}`;

  // ==========================
  // TURNOS DE HOY
  // ==========================

  const turnosHoy = turnos.filter(
    (turno) => {
      const fechaTurno =
        turno.fecha
          ? String(turno.fecha).split("T")[0]
          : "";

      return fechaTurno === fechaActual;
    }
  );

  // ==========================
  // PRÓXIMOS TURNOS
  // ==========================

  const ahora = new Date();

  const proximosTurnos = turnos
    .filter((turno) => {
      if (!turno.fecha || !turno.hora) {
        return false;
      }

      const fechaTurno =
        new Date(
          `${String(turno.fecha).split("T")[0]}T${turno.hora}`
        );

      return fechaTurno >= ahora;
    })
    .sort((a, b) => {
      const fechaA =
        new Date(
          `${String(a.fecha).split("T")[0]}T${a.hora}`
        );

      const fechaB =
        new Date(
          `${String(b.fecha).split("T")[0]}T${b.hora}`
        );

      return fechaA - fechaB;
    })
    .slice(0, 5);

  // ==========================
  // TARJETAS
  // ==========================

  const cards = [
    {
      titulo: "Clientes",
      valor: clientes.length,
      icono: <FaUsers />,
      color: "#2563eb",
    },
    {
      titulo: "Servicios",
      valor: servicios.length,
      icono: <FaSpa />,
      color: "#9333ea",
    },
    {
      titulo: "Turnos",
      valor: turnos.length,
      icono: <FaCalendarAlt />,
      color: "#16a34a",
    },
    {
      titulo: "Ingresos",
      valor: `$${ingresos.toLocaleString()}`,
      icono: <FaMoneyBillWave />,
      color: "#f59e0b",
    },
    {
      titulo: "Turnos de hoy",
      valor: turnosHoy.length,
      icono: <FaClock />,
      color: "#0891b2",
    },
  ];

  // ==========================
  // NOMBRE DEL CLIENTE
  // ==========================

  const obtenerNombreCliente = (
    turno
  ) => {
    if (!turno.cliente) {
      return "Sin cliente";
    }

    return `${turno.cliente.nombre || ""} ${
      turno.cliente.apellido || ""
    }`.trim();
  };

  // ==========================
  // NOMBRE DEL SERVICIO
  // ==========================

  const obtenerNombreServicio = (
    turno
  ) => {
    return (
      turno.servicio?.nombre ||
      "Sin servicio"
    );
  };

  // ==========================
  // RENDER
  // ==========================

  return (
    <DashboardLayout>

      {/* ENCABEZADO */}

      <div className="dashboard-header">

        <h1>
          <FaHandPaper className="me-2" />
          Bienvenido
        </h1>

        <p>
          Panel principal del sistema de gestión
        </p>

      </div>

      {/* TARJETAS */}

      <div className="dashboard-grid">

        {cards.map((card) => (

          <div
            key={card.titulo}
            className="dashboard-card"
          >

            <div
              className="dashboard-icon"
              style={{
                background: card.color,
              }}
            >
              {card.icono}
            </div>

            <div>

              <h6>
                {card.titulo}
              </h6>

              <h2>
                {card.valor}
              </h2>

            </div>

          </div>

        ))}

      </div>

      {/* ACCIONES RÁPIDAS */}

      <div className="recent-card">

        <h3>
          <FaBolt className="me-2" />
          Acciones rápidas
        </h3>

        <div className="d-flex flex-wrap gap-3">

          <Link
            to="/turnos"
            className="btn btn-primary"
          >
            <FaPlus className="me-2" />
            Nuevo turno
          </Link>

          <Link
            to="/clientes"
            className="btn btn-success"
          >
            <FaPlus className="me-2" />
            Nuevo cliente
          </Link>

          <Link
            to="/servicios"
            className="btn btn-warning"
          >
            <FaPlus className="me-2" />
            Nuevo servicio
          </Link>

        </div>

      </div>

      {/* PRÓXIMOS TURNOS */}

      <div className="recent-card">

        <h3>
          <FaClock className="me-2" />
          Próximos turnos
        </h3>

        {proximosTurnos.length === 0 ? (

          <p>
            No hay próximos turnos.
          </p>

        ) : (

          <table className="table">

            <thead>

              <tr>
                <th>Cliente</th>
                <th>Servicio</th>
                <th>Fecha</th>
                <th>Hora</th>
              </tr>

            </thead>

            <tbody>

              {proximosTurnos.map(
                (turno) => (

                  <tr
                    key={turno.id}
                  >

                    <td>
                      {obtenerNombreCliente(
                        turno
                      )}
                    </td>

                    <td>
                      {obtenerNombreServicio(
                        turno
                      )}
                    </td>

                    <td>
                      {String(
                        turno.fecha
                      ).split("T")[0]}
                    </td>

                    <td>
                      {turno.hora}
                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        )}

      </div>

      {/* ÚLTIMOS TURNOS */}

      <div className="recent-card">

        <h3>
          <FaCalendarAlt className="me-2" />
          Últimos turnos
        </h3>

        {turnos.length === 0 ? (

          <p>
            No hay turnos registrados.
          </p>

        ) : (

          <table className="table">

            <thead>

              <tr>
                <th>Cliente</th>
                <th>Servicio</th>
                <th>Fecha</th>
                <th>Hora</th>
              </tr>

            </thead>

            <tbody>

              {turnos
                .slice(-5)
                .reverse()
                .map((turno) => (

                  <tr
                    key={turno.id}
                  >

                    <td>
                      {obtenerNombreCliente(
                        turno
                      )}
                    </td>

                    <td>
                      {obtenerNombreServicio(
                        turno
                      )}
                    </td>

                    <td>
                      {String(
                        turno.fecha
                      ).split("T")[0]}
                    </td>

                    <td>
                      {turno.hora}
                    </td>

                  </tr>

                ))}

            </tbody>

          </table>

        )}

      </div>

    </DashboardLayout>
  );
}

export default Dashboard;