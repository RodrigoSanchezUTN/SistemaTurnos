import Swal from "sweetalert2";



function CalendarDay({
  dia,
  mes,
  año,
  turnos,
  onTurnoClick,
}) {
  
  if (!dia) {
    return <div className="calendar-empty"></div>;
  }

  const fecha = `${año}-${String(mes + 1).padStart(2, "0")}-${String(
    dia
  ).padStart(2, "0")}`;

  const turnosDelDia = turnos.filter(
    (turno) => turno.fecha === fecha
  );

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
      title: "📅 Información del turno",

      html: `
        <div style="text-align:left">

          <p><b>👤 Cliente:</b> ${turno.cliente}</p>

          <p><b>💆 Servicio:</b> ${turno.servicio}</p>

          <p><b>📅 Fecha:</b> ${turno.fecha}</p>

          <p><b>🕒 Hora:</b> ${turno.hora}</p>

          <p><b>📌 Estado:</b> ${turno.estado}</p>

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

        {turnosDelDia.slice(0, 3).map((turno) => (
          <div
            key={turno.id}
            className="calendar-event"
            style={{
              background: colorEstado(turno.estado),
            }}
            onClick={() => {

  if (onTurnoClick) {
    onTurnoClick(turno);
  } else {
    abrirTurno(turno);
  }

}}
          >
            {turno.hora} - {turno.cliente}
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