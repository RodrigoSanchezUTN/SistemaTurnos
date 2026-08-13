import Swal from "sweetalert2";

function CalendarDay({
  dia,
  mes,
  año,
  turnos,
  onTurnoClick,
}) {
  if (!dia) {
    return (
      <div className="calendar-empty"></div>
    );
  }

  const fecha =
    `${año}-${String(mes + 1).padStart(2, "0")}-${String(
      dia
    ).padStart(2, "0")}`;

  const obtenerFechaTurno = (turno) => {
    if (!turno.fecha) {
      return "";
    }

    return new Date(turno.fecha)
      .toLocaleDateString("en-CA");
  };

  const turnosDelDia = turnos.filter(
    (turno) =>
      obtenerFechaTurno(turno) === fecha
  );

  const obtenerHora = (turno) => {
    if (!turno.fecha) {
      return "";
    }

    return new Date(turno.fecha)
      .toTimeString()
      .slice(0, 5);
  };

  const obtenerNombreCliente = (turno) => {
    if (turno.cliente) {
      return `${turno.cliente.nombre || ""} ${
        turno.cliente.apellido || ""
      }`.trim();
    }

    return "Cliente";
  };

  const obtenerNombreServicio = (turno) => {
    if (turno.servicio?.nombre) {
      return turno.servicio.nombre;
    }

    return "Servicio";
  };

  const colorEstado = (estado) => {
    switch (estado) {
      case "Confirmado":
        return "#22c55e";

      case "Pendiente":
        return "#f59e0b";

      case "Cancelado":
        return "#ef4444";

      default:
        return "#3b82f6";
    }
  };

  const abrirTurno = (turno) => {
    Swal.fire({
      title: "Información del turno",

      html: `
        <div style="text-align:left">

          <p>
            <b>Cliente:</b>
            ${obtenerNombreCliente(turno)}
          </p>

          <p>
            <b>Servicio:</b>
            ${obtenerNombreServicio(turno)}
          </p>

          <p>
            <b>Fecha:</b>
            ${obtenerFechaTurno(turno)}
          </p>

          <p>
            <b>Hora:</b>
            ${obtenerHora(turno)}
          </p>

          <p>
            <b>Estado:</b>
            ${turno.estado || "Pendiente"}
          </p>

        </div>
      `,

      confirmButtonText: "Cerrar",
    });
  };

  return (
    <div className="calendar-day">

      <div className="calendar-number">
        {dia}
      </div>

      <div className="calendar-events">

        {turnosDelDia
          .slice(0, 3)
          .map((turno) => (
            <div
              key={turno.id}
              className="calendar-event"
              style={{
                background:
                  colorEstado(
                    turno.estado
                  ),
              }}
              onClick={() => {
                if (onTurnoClick) {
                  onTurnoClick(turno);
                } else {
                  abrirTurno(turno);
                }
              }}
            >
              {obtenerHora(turno)} -{" "}
              {obtenerNombreCliente(turno)}
            </div>
          ))}

        {turnosDelDia.length > 3 && (
          <div className="calendar-more">
            +{turnosDelDia.length - 3} más
          </div>
        )}

      </div>

    </div>
  );
}

export default CalendarDay;