import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function CalendarHeader({
  mesActual,
  añoActual,
  cambiarMes,
}) {

  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  return (
    <div className="calendar-header">

      <div>

        <h2 className="calendar-title">
          Calendario
        </h2>

        <p className="calendar-subtitle">
          Organizá todos los turnos del mes.
        </p>

      </div>

      <div className="calendar-navigation">

        <button
          className="calendar-btn"
          onClick={() => cambiarMes(-1)}
        >
          <FaChevronLeft />
        </button>

        <div className="calendar-month">
  {meses[mesActual]} de {añoActual}
</div>
          
        

        <button
          className="calendar-btn"
          onClick={() => cambiarMes(1)}
        >
          <FaChevronRight />
        </button>

      </div>

    </div>
  );
}

export default CalendarHeader;