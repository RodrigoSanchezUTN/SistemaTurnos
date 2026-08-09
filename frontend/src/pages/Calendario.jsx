import { useContext, useState } from "react";
import "../styles/calendario.css";

import DashboardLayout from "../layouts/DashboardLayout";

import MonthlySummary from "../components/calendar/MonthlySummary";
import UpcomingAppointments from "../components/calendar/UpcomingAppointments";
import QuickActions from "../components/calendar/QuickActions";
import CalendarHeader from "../components/calendar/CalendarHeader";
import CalendarGrid from "../components/calendar/CalendarGrid";
import AppointmentModal from "../components/calendar/AppointmentModal";

import AppContext from "../context/AppContext";

function Calendario() {
  const { turnos } = useContext(AppContext);

  const [fechaActual, setFechaActual] = useState(new Date());

  const [showModal, setShowModal] = useState(false);
  const [modoModal, setModoModal] = useState("crear");
  const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);

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
    setModoModal("crear");
    setTurnoSeleccionado(null);
    setShowModal(true);
  };

  const abrirEditarTurno = (turno) => {
    setModoModal("editar");
    setTurnoSeleccionado(turno);
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
    setTurnoSeleccionado(null);
    setModoModal("crear");
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
              onTurnoClick={abrirEditarTurno}
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
  key={showModal ? "modal-abierto" : "modal-cerrado"}
  show={showModal}
  modo={modoModal}
  turno={turnoSeleccionado}
  onClose={cerrarModal}
/>

      </div>
    </DashboardLayout>
  );
}

export default Calendario;