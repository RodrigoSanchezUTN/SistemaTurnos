import { useState, useContext } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import AppContext from "../../context/AppContext";
import AppointmentForm from "./AppointmentForm";

function AppointmentModal({
  show,
  onClose,
  modo = "crear",
  turno = null,
}) {
  const [cliente, setCliente] = useState(
    turno?.cliente || ""
  );

  const [servicio, setServicio] = useState(
    turno?.servicio || ""
  );

  const [fecha, setFecha] = useState(
    turno?.fecha || ""
  );

  const [hora, setHora] = useState(
    turno?.hora || ""
  );

  const [observaciones, setObservaciones] =
    useState(
      turno?.observaciones || ""
    );

  const {
    turnos,
    setTurnos,
  } = useContext(AppContext);

  // ==========================
  // LIMPIAR FORMULARIO
  // ==========================

  const limpiarFormulario = () => {
    setCliente("");
    setServicio("");
    setFecha("");
    setHora("");
    setObservaciones("");
  };

  // ==========================
  // GUARDAR TURNO
  // ==========================

  const guardarTurno = () => {
    if (
      !cliente ||
      !servicio ||
      !fecha ||
      !hora
    ) {
      toast.error(
        "Completa todos los campos."
      );

      return;
    }

    // Comprobar horario ocupado
    const horarioOcupado =
      turnos.some(
        (turnoExistente) =>
          turnoExistente.fecha === fecha &&
          turnoExistente.hora === hora &&
          turnoExistente.id !== turno?.id &&
          turnoExistente.estado !==
            "Cancelado"
      );

    if (horarioOcupado) {
      toast.error(
        "Ese horario ya está ocupado."
      );

      return;
    }

    const datosTurno = {
      cliente,
      servicio,
      fecha,
      hora,
      estado:
        turno?.estado || "Pendiente",
      observaciones,
    };

    // ==========================
    // EDITAR
    // ==========================

    if (
      modo === "editar" &&
      turno
    ) {
      const turnosActualizados =
        turnos.map(
          (turnoActual) =>
            turnoActual.id === turno.id
              ? {
                  ...turnoActual,
                  ...datosTurno,
                }
              : turnoActual
        );

      setTurnos(
        turnosActualizados
      );

      toast.success(
        "Turno actualizado correctamente."
      );
    }

    // ==========================
    // CREAR
    // ==========================

    else {
      const nuevoTurno = {
        id: Date.now(),
        ...datosTurno,
      };

      setTurnos([
        ...turnos,
        nuevoTurno,
      ]);

      toast.success(
        "Turno creado correctamente."
      );
    }

    limpiarFormulario();
    onClose();
  };

  // ==========================
  // ELIMINAR TURNO
  // ==========================

  const confirmarEliminar =
    async () => {
      if (!turno) {
        return;
      }

      // Cerramos primero el editor
      onClose();

      // Esperamos a que React termine
      // de desmontar el modal
      await new Promise(
        (resolve) =>
          setTimeout(resolve, 0)
      );

      // ==========================
      // CONFIRMACIÓN
      // ==========================

      const resultado =
        await Swal.fire({
          title: "¿Eliminar turno?",
          text: "Esta acción no se puede deshacer.",
          icon: "warning",

          showCancelButton: true,

          confirmButtonText:
            "Sí, eliminar",

          cancelButtonText:
            "Cancelar",

          confirmButtonColor:
            "#d33",

          cancelButtonColor:
            "#6c757d",

          reverseButtons: true,

          allowOutsideClick: false,
        });

      // ==========================
      // CANCELAR
      // ==========================

      if (!resultado.isConfirmed) {
        return;
      }

      // ==========================
      // ELIMINAR
      // ==========================

      const turnosActualizados =
        turnos.filter(
          (turnoActual) =>
            turnoActual.id !==
            turno.id
        );

      setTurnos(
        turnosActualizados
      );

      toast.success(
        "Turno eliminado correctamente."
      );

      limpiarFormulario();
    };

  // ==========================
  // MODAL CERRADO
  // ==========================

  if (!show) {
    return null;
  }

  // ==========================
  // MODAL
  // ==========================

  return (
    <div className="modal-overlay">

      <div className="appointment-modal">

        {/* HEADER */}

        <div className="modal-header">

          <h3>
            {modo === "crear"
              ? "Nuevo turno"
              : "Editar turno"}
          </h3>

          <button
            type="button"
            className="btn-close"
            onClick={onClose}
          >
            ✕
          </button>

        </div>

        {/* FORMULARIO */}

        <AppointmentForm
          cliente={cliente}
          setCliente={setCliente}
          servicio={servicio}
          setServicio={setServicio}
          fecha={fecha}
          setFecha={setFecha}
          hora={hora}
          setHora={setHora}
          observaciones={
            observaciones
          }
          setObservaciones={
            setObservaciones
          }
        />

        {/* FOOTER */}

        <div className="modal-footer">

          <button
            type="button"
            className="btn btn-light"
            onClick={onClose}
          >
            Cancelar
          </button>

          {modo === "editar" && (
            <button
              type="button"
              className="btn btn-danger"
              onClick={
                confirmarEliminar
              }
            >
              Eliminar turno
            </button>
          )}

          <button
            type="button"
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