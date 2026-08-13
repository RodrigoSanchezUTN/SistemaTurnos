import { useMemo } from "react";
import { FaCalendarAlt } from "react-icons/fa";

function UpcomingAppointments({ turnos }) {
  const proximosTurnos = useMemo(() => {
    const ahora = new Date();

    return [...turnos]
      .filter((turno) => {
        if (!turno.fecha) {
          return false;
        }

        return new Date(turno.fecha) >= ahora;
      })
      .sort((a, b) => {
        return (
          new Date(a.fecha) -
          new Date(b.fecha)
        );
      })
      .slice(0, 5);
  }, [turnos]);

  const obtenerHora = (turno) => {
    if (!turno.fecha) {
      return "";
    }

    return new Date(turno.fecha)
      .toTimeString()
      .slice(0, 5);
  };

  const obtenerNombreCliente = (turno) => {
    if (!turno.cliente) {
      return "Cliente";
    }

    return `${turno.cliente.nombre || ""} ${
      turno.cliente.apellido || ""
    }`.trim();
  };

  const obtenerNombreServicio = (turno) => {
    return (
      turno.servicio?.nombre ||
      "Servicio"
    );
  };

  return (
    <div className="calendar-side-card">

      <h4 className="calendar-side-title">
        <FaCalendarAlt className="me-2" />
        Próximos turnos
      </h4>

      {proximosTurnos.length === 0 ? (
        <p className="text-muted">
          No hay próximos turnos.
        </p>
      ) : (
        proximosTurnos.map((turno) => (
          <div
            key={turno.id}
            className="appointment-card"
          >
            <div className="appointment-hour">
              {obtenerHora(turno)}
            </div>

            <div className="appointment-info">
              <strong>
                {obtenerNombreCliente(turno)}
              </strong>

              <small>
                {obtenerNombreServicio(turno)}
              </small>
            </div>
          </div>
        ))
      )}

    </div>
  );
}

export default UpcomingAppointments;