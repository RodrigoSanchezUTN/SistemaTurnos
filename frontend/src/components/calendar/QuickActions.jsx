import { useState } from "react";
import { FaBolt, FaPlus } from "react-icons/fa";

import AppointmentModal from "./AppointmentModal";

function QuickActions() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="calendar-side-card">

        <h4 className="calendar-side-title">
          <FaBolt className="me-2" />
          Acciones rápidas
        </h4>

        <button
          type="button"
          className="btn btn-primary w-100"
          onClick={() => setShowModal(true)}
        >
          <FaPlus className="me-2" />
          Nuevo turno
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