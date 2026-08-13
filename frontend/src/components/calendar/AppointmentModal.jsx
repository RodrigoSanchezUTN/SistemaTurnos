import { useContext, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import AppContext from "../../context/AppContext";
import AppointmentForm from "./AppointmentForm";

import {
  crearTurno,
  actualizarTurno,
  eliminarTurno,
} from "../../services/api";

function AppointmentModal({
  show,
  onClose,
  modo = "crear",
  turno = null,
}) {
  const { turnos, setTurnos } =
    useContext(AppContext);

  // ==========================
  // DATOS INICIALES
  // ==========================

  const obtenerDatosIniciales = () => {
    if (!turno) {
      return {
        cliente: "",
        servicio: "",
        fecha: "",
        hora: "",
        observaciones: "",
      };
    }

    const fechaTurno =
      new Date(turno.fecha);

    return {
      cliente: String(
        turno.clienteId ||
          turno.cliente?.id ||
          ""
      ),

      servicio: String(
        turno.servicioId ||
          turno.servicio?.id ||
          ""
      ),

      fecha:
        fechaTurno.toLocaleDateString(
          "en-CA"
        ),

      hora:
        fechaTurno
          .toTimeString()
          .slice(0, 5),

      observaciones:
        turno.observaciones || "",
    };
  };

  const datosIniciales =
    obtenerDatosIniciales();

  // ==========================
  // ESTADOS
  // ==========================

  const [cliente, setCliente] =
    useState(datosIniciales.cliente);

  const [servicio, setServicio] =
    useState(datosIniciales.servicio);

  const [fecha, setFecha] =
    useState(datosIniciales.fecha);

  const [hora, setHora] =
    useState(datosIniciales.hora);

  const [observaciones, setObservaciones] =
    useState(
      datosIniciales.observaciones
    );

  // ==========================
  // TOKEN
  // ==========================

  const obtenerToken = () => {
    return (
      localStorage.getItem("token") ||
      sessionStorage.getItem("token")
    );
  };

  // ==========================
  // USUARIO
  // ==========================

  const obtenerUsuario = () => {
    const usuarioGuardado =
      localStorage.getItem("usuario");

    if (!usuarioGuardado) {
      return null;
    }

    try {
      return JSON.parse(usuarioGuardado);
    } catch (error) {
      console.error(
        "Error al obtener usuario:",
        error
      );

      return null;
    }
  };

  // ==========================
  // LIMPIAR
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

  const guardarTurno = async () => {
    if (
      !cliente ||
      !servicio ||
      !fecha ||
      !hora
    ) {
      toast.error(
        "Completá todos los campos."
      );

      return;
    }

    try {
      const token = obtenerToken();

      if (!token) {
        throw new Error(
          "No hay sesión iniciada."
        );
      }

      const usuario =
        obtenerUsuario();

      if (!usuario?.id) {
        throw new Error(
          "No se encontró el usuario de la sesión."
        );
      }

      const datosTurno = {
        fecha: `${fecha}T${hora}:00`,
        estado:
          turno?.estado ||
          "Pendiente",
        clienteId: Number(cliente),
        servicioId: Number(servicio),
        usuarioId: Number(usuario.id),
      };

      // ==========================
      // EDITAR
      // ==========================

      if (
        modo === "editar" &&
        turno
      ) {
        const turnoActualizado =
          await actualizarTurno(
            token,
            turno.id,
            datosTurno
          );

        setTurnos(
          turnos.map(
            (turnoActual) =>
              turnoActual.id ===
              turno.id
                ? turnoActualizado
                : turnoActual
          )
        );

        toast.success(
          "Turno actualizado correctamente."
        );
      }

      // ==========================
      // CREAR
      // ==========================

      else {
        const nuevoTurno =
          await crearTurno(
            token,
            datosTurno
          );

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

    } catch (error) {
      console.error(
        "Error al guardar turno:",
        error
      );

      toast.error(
        error.message ||
          "No se pudo guardar el turno."
      );
    }
  };

  // ==========================
  // ELIMINAR
  // ==========================

  const confirmarEliminar =
    async () => {
      if (!turno) {
        return;
      }

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

      if (!resultado.isConfirmed) {
        return;
      }

      try {
        const token = obtenerToken();

        if (!token) {
          throw new Error(
            "No hay sesión iniciada."
          );
        }

        await eliminarTurno(
          token,
          turno.id
        );

        setTurnos(
          turnos.filter(
            (turnoActual) =>
              turnoActual.id !==
              turno.id
          )
        );

        toast.success(
          "Turno eliminado correctamente."
        );

        limpiarFormulario();
        onClose();

      } catch (error) {
        console.error(
          "Error al eliminar turno:",
          error
        );

        toast.error(
          error.message ||
            "No se pudo eliminar el turno."
        );
      }
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
            aria-label="Cerrar"
          >
            ×
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
          observaciones={
            observaciones
          }
          setObservaciones={
            setObservaciones
          }
        />

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