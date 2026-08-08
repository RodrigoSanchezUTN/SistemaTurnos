import { useState } from "react";
import AppointmentModal from "./AppointmentModal";

function QuickActions() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="calendar-side-card">

        <h4 className="calendar-side-title">
          ⚡ Acciones rápidas
        </h4>

        <button
          className="btn btn-primary w-100"
          onClick={() => setShowModal(true)}
        >
          + Nuevo turno
        </button>

      </div>

      <AppointmentModal
        show={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}

export default QuickActions;