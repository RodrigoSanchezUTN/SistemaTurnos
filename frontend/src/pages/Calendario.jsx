import { useContext, useState } from "react";
import "../styles/calendario.css";
import DashboardLayout from "../layouts/DashboardLayout";
import MonthlySummary from "../components/calendar/MonthlySummary";
import UpcomingAppointments from "../components/calendar/UpcomingAppointments";
import QuickActions from "../components/calendar/QuickActions";
import CalendarHeader from "../components/calendar/CalendarHeader";
import CalendarGrid from "../components/calendar/CalendarGrid";

import AppContext from "../context/AppContext";

function Calendario() {
  const { turnos } = useContext(AppContext);

  const [fechaActual, setFechaActual] = useState(new Date());

  const mesActual = fechaActual.getMonth();
const añoActual = fechaActual.getFullYear();

console.log(fechaActual);
console.log("Mes:", mesActual);

  const cambiarMes = (direccion) => {

  setFechaActual((fecha) => {

    return new Date(
      fecha.getFullYear(),
      fecha.getMonth() + direccion,
      1
    );

  });

};

  return (
    <DashboardLayout>
      <div className="container-fluid">

        <CalendarHeader
  key={`${mesActual}-${añoActual}`}
  mesActual={mesActual}
  añoActual={añoActual}
  cambiarMes={cambiarMes}
/>

        <div className="calendar-layout">

  <div className="calendar-main">

    <CalendarGrid
      mesActual={mesActual}
      añoActual={añoActual}
      turnos={turnos}
    />

  </div>

  <div className="calendar-sidebar">

    <UpcomingAppointments turnos={turnos} />
    <MonthlySummary turnos={turnos} />

  <QuickActions />

  </div>

</div>

      </div>
    </DashboardLayout>
  );
}

export default Calendario;