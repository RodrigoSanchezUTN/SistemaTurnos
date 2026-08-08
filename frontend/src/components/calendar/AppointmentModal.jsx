import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import { useTurnos } from "../../context/TurnosContext";
import AppointmentForm from "./AppointmentForm";

function AppointmentModal({
  show,
  onClose,
  modo = "crear",
  turno = null,
}) {
  const [cliente, setCliente] = useState(turno?.cliente || "");
  const [servicio, setServicio] = useState(turno?.servicio || "");
  const [fecha, setFecha] = useState(turno?.fecha || "");
  const [hora, setHora] = useState(turno?.hora || "");
  const [observaciones, setObservaciones] = useState(
    turno?.observaciones || ""
  );

  const {
    turnos,
    agregarTurno,
    editarTurno,
    eliminarTurno,
  } = useTurnos();

  const limpiarFormulario = () => {
    setCliente("");
    setServicio("");
    setFecha("");
    setHora("");
    setObservaciones("");
  };

  const guardarTurno = () => {
    if (!cliente || !servicio || !fecha || !hora) {
      toast.error("Completa todos los campos.");
      return;
    }

    const horarioOcupado = turnos.some(
      (turnoExistente) =>
        turnoExistente.fecha === fecha &&
        turnoExistente.hora === hora &&
        turnoExistente.id !== turno?.id
    );

    if (horarioOcupado) {
      toast.error("Ese horario ya está ocupado.");
      return;
    }

    const datosTurno = {
      cliente,
      servicio,
      fecha,
      hora,
      estado: turno?.estado || "Pendiente",
      observaciones,
    };

    if (modo === "editar" && turno) {
      editarTurno(turno.id, datosTurno);

      toast.success("Turno actualizado correctamente.");
    } else {
      agregarTurno(datosTurno);

      toast.success("Turno creado correctamente.");
    }

    limpiarFormulario();
    onClose();
  };

  const confirmarEliminar = async () => {
  if (!turno) return;

  // Cerramos primero el panel de edición
  onClose();

  // Después mostramos la confirmación
  const resultado = await Swal.fire({
    title: "¿Eliminar turno?",
    text: "Esta acción no se puede deshacer.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
    reverseButtons: true,
  });

  if (!resultado.isConfirmed) {
    return;
  }

  eliminarTurno(turno.id);

  toast.success("Turno eliminado correctamente.");

  limpiarFormulario();
};

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">

      <div className="appointment-modal">

        <div className="modal-header">

          <h3>
            {modo === "crear"
              ? "Nuevo turno"
              : "Editar turno"}
          </h3>

          <button
            className="btn-close"
            onClick={onClose}
          >
            ✕
          </button>

        </div>

        <AppointmentForm
          cliente={cliente}
          setCliente={setCliente}
          servicio={servicio}
          setServicio={setServicio}
          fecha={fecha}
          setFecha={setFecha}
          hora={hora}
          setHora={setHora}
          observaciones={observaciones}
          setObservaciones={setObservaciones}
        />

        <div className="modal-footer">

          <button
            className="btn btn-light"
            onClick={onClose}
          >
            Cancelar
          </button>

          {modo === "editar" && (
            <button
              className="btn btn-danger"
              onClick={confirmarEliminar}
            >
              Eliminar turno
            </button>
          )}

          <button
            className="btn btn-primary"
            onClick={guardarTurno}
          >
            {modo === "crear"
              ? "Guardar turno"
              : "Guardar cambios"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default AppointmentModal;