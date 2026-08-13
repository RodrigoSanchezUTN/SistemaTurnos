import { FaChartBar } from "react-icons/fa";

function MonthlySummary({ turnos }) {
  const hoy = new Date();

  const fechaHoy =
    hoy.toLocaleDateString("en-CA");

  const turnosHoy = turnos.filter(
    (turno) => {
      if (!turno.fecha) {
        return false;
      }

      const fechaTurno =
        new Date(turno.fecha)
          .toLocaleDateString("en-CA");

      return fechaTurno === fechaHoy;
    }
  ).length;

  const pendientes = turnos.filter(
    (turno) =>
      turno.estado === "Pendiente"
  ).length;

  const confirmados = turnos.filter(
    (turno) =>
      turno.estado === "Confirmado"
  ).length;

  const cancelados = turnos.filter(
    (turno) =>
      turno.estado === "Cancelado"
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