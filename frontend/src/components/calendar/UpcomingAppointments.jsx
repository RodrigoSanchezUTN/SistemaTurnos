import { useMemo } from "react";
import { FaCalendarAlt } from "react-icons/fa";

function UpcomingAppointments({ turnos }) {
  const proximosTurnos = useMemo(() => {
    return [...turnos]
      .sort((a, b) => {
        const fechaA = new Date(`${a.fecha} ${a.hora}`);
        const fechaB = new Date(`${b.fecha} ${b.hora}`);

        return fechaA - fechaB;
      })
      .slice(0, 5);
  }, [turnos]);

  return (
    <div className="calendar-side-card">

      <h4 className="calendar-side-title">
        <FaCalendarAlt className="me-2" />
        Próximos turnos
      </h4>

      {proximosTurnos.length === 0 ? (
        <p className="text-muted">
          No hay turnos registrados.
        </p>
      ) : (
        proximosTurnos.map((turno) => (
          <div
            key={turno.id}
            className="appointment-card"
          >
            <div className="appointment-hour">
              {turno.hora}
            </div>

            <div className="appointment-info">
              <strong>{turno.cliente}</strong>
              <small>{turno.servicio}</small>
            </div>
          </div>
        ))
      )}

    </div>
  );
}

export default UpcomingAppointments;