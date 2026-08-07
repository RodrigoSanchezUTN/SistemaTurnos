import { useState } from "react";
import "../styles/calendario.css";

import DashboardLayout from "../layouts/DashboardLayout";

import MonthlySummary from "../components/calendar/MonthlySummary";
import UpcomingAppointments from "../components/calendar/UpcomingAppointments";
import QuickActions from "../components/calendar/QuickActions";
import CalendarHeader from "../components/calendar/CalendarHeader";
import CalendarGrid from "../components/calendar/CalendarGrid";
import AppointmentModal from "../components/calendar/AppointmentModal";

import { useTurnos } from "../context/TurnosContext";

function Calendario() {

  const { turnos } = useTurnos();

  const [fechaActual, setFechaActual] = useState(new Date());
  const [showModal, setShowModal] = useState(false);

  const mesActual = fechaActual.getMonth();
  const añoActual = fechaActual.getFullYear();

  const cambiarMes = (direccion) => {

    setFechaActual((fecha) => {

      return new Date(
        fecha.getFullYear(),
        fecha.getMonth() + direccion,
        1
      );

    });

  };

  const abrirNuevoTurno = () => {
    setShowModal(true);
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

            <QuickActions
              onNuevoTurno={abrirNuevoTurno}
            />

          </div>

        </div>

        <AppointmentModal
          show={showModal}
          onClose={() => setShowModal(false)}
        />

      </div>

    </DashboardLayout>
  );

}

export default Calendario;