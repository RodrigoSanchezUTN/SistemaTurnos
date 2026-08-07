import "../styles/dashboard.css";

import { useContext } from "react";
import {
  FaUsers,
  FaSpa,
  FaCalendarAlt,
  FaMoneyBillWave,
} from "react-icons/fa";

import DashboardLayout from "../layouts/DashboardLayout";
import AppContext from "../context/AppContext";

import "../styles/dashboard.css";

function Dashboard() {
  const { clientes, servicios, turnos } = useContext(AppContext);
  const ingresos = turnos.reduce((total, turno) => {
  const servicioEncontrado = servicios.find(
    (s) => s.nombre === turno.servicio
  );

  return (
    total +
    (servicioEncontrado
      ? Number(servicioEncontrado.precio)
      : 0)
  );
}, 0);

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
  ];

  return (
    <DashboardLayout>

      <div className="dashboard-header">

        <h1>👋 Bienvenido</h1>

        <p>
          Panel principal del sistema de gestión
        </p>

      </div>

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

              <h6>{card.titulo}</h6>

              <h2>{card.valor}</h2>

            </div>

          </div>

        ))}

      </div>

      <div className="recent-card">

        <h3>📅 Últimos turnos</h3>

        {turnos.length === 0 ? (

          <p>No hay turnos registrados.</p>

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

                  <tr key={turno.id}>

                    <td>{turno.cliente}</td>

                    <td>{turno.servicio}</td>

                    <td>{turno.fecha}</td>

                    <td>{turno.hora}</td>

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