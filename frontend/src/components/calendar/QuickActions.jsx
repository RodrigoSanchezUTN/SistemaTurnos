import { useState } from "react";
import NewAppointmentModal from "./NewAppointmentModal";

function QuickActions() {

  const [showModal, setShowModal] = useState(false);

  return (
    <>

      <div className="calendar-side-card">

        <h4 className="calendar-side-title">
          ⚡ Acciones rápidas
        </h4>

        <button
          className="btn btn-primary w-100 mb-2"
          onClick={() => setShowModal(true)}
        >
          + Nuevo turno
        </button>

        <button className="btn btn-light w-100 mb-2">
          Clientes
        </button>

        <button className="btn btn-light w-100">
          Servicios
        </button>

      </div>

      <NewAppointmentModal
        show={showModal}
        onClose={() => setShowModal(false)}
      />

    </>
  );

}

export default QuickActions;