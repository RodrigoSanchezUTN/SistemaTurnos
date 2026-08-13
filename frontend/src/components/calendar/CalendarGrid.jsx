import CalendarDay from "./CalendarDay";

function CalendarGrid({
  mesActual,
  añoActual,
  turnos,
  onTurnoClick,
}) {
  const primerDia = new Date(
    añoActual,
    mesActual,
    1
  );

  const ultimoDia = new Date(
    añoActual,
    mesActual + 1,
    0
  );

  let inicio = primerDia.getDay();

  // Domingo pasa al final
  inicio =
    inicio === 0 ? 6 : inicio - 1;

  const diasDelMes =
    ultimoDia.getDate();

  const celdas = [];

  // Espacios vacíos
  for (let i = 0; i < inicio; i++) {
    celdas.push(null);
  }

  // Días del mes
  for (
    let i = 1;
    i <= diasDelMes;
    i++
  ) {
    celdas.push(i);
  }

  // Completar hasta 42 casillas
  while (celdas.length < 42) {
    celdas.push(null);
  }

  const diasSemana = [
    "Lun",
    "Mar",
    "Mié",
    "Jue",
    "Vie",
    "Sáb",
    "Dom",
  ];

  return (
    <div className="calendar-grid">

      {diasSemana.map((dia) => (
        <div
          key={dia}
          className="calendar-weekday"
        >
          {dia}
        </div>
      ))}

      {celdas.map((dia, index) => (
        <CalendarDay
          key={index}
          dia={dia}
          mes={mesActual}
          año={añoActual}
          turnos={turnos}
          onTurnoClick={onTurnoClick}
        />
      ))}

    </div>
  );
}

export default CalendarGrid;