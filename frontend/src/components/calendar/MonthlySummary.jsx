import { FaChartBar } from "react-icons/fa";

function MonthlySummary({ turnos }) {
  const hoy = new Date().toISOString().split("T")[0];

  const turnosHoy = turnos.filter(
    (t) => t.fecha === hoy
  ).length;

  const pendientes = turnos.filter(
    (t) => t.estado === "Pendiente"
  ).length;

  const confirmados = turnos.filter(
    (t) => t.estado === "Confirmado"
  ).length;

  const cancelados = turnos.filter(
    (t) => t.estado === "Cancelado"
  ).length;

  return (
    <div className="calendar-side-card">

      <h4 className="calendar-side-title">
        <FaChartBar className="me-2" />
        Resumen
      </h4>

      <div className="summary-row">
        <span>Turnos hoy</span>
        <strong>{turnosHoy}</strong>
      </div>

      <div className="summary-row">
        <span>Pendientes</span>
        <strong>{pendientes}</strong>
      </div>

      <div className="summary-row">
        <span>Confirmados</span>
        <strong>{confirmados}</strong>
      </div>

      <div className="summary-row">
        <span>Cancelados</span>
        <strong>{cancelados}</strong>
      </div>

    </div>
  );
}

export default MonthlySummary;