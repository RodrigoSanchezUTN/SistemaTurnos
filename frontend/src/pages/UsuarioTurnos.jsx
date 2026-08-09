import { useContext } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import {
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaBan,
  FaHistory,
  FaSpa,
  FaMoneyBillWave,
} from "react-icons/fa";

import UsuarioLayout from "../layouts/UsuarioLayout";
import AppContext from "../context/AppContext";
import UsuarioContext from "../context/UsuarioContext";

function UsuarioTurnos() {
  const {
    turnos,
    setTurnos,
    servicios,
  } = useContext(AppContext);

  const { usuario } =
    useContext(UsuarioContext);

  // ==========================
  // SOLO TURNOS DEL USUARIO
  // ==========================

  const misTurnos = turnos.filter(
    (turno) =>
      turno.email === usuario?.email
  );

  // ==========================
  // FECHA/HORA ACTUAL
  // ==========================

  const ahora = new Date();

  // ==========================
  // CONVERTIR FECHA
  // ==========================

  const convertirFecha = (
    fecha,
    hora = "00:00"
  ) => {
    if (!fecha) {
      return null;
    }

    const [anio, mes, dia] =
      fecha.split("-");

    const [horas, minutos] =
      hora.split(":");

    return new Date(
      Number(anio),
      Number(mes) - 1,
      Number(dia),
      Number(horas),
      Number(minutos)
    );
  };

  // ==========================
  // PRÓXIMOS TURNOS
  // ==========================

  const proximosTurnos =
    misTurnos
      .filter((turno) => {
        const fechaTurno =
          convertirFecha(
            turno.fecha,
            turno.hora
          );

        return (
          turno.estado !== "Cancelado" &&
          fechaTurno &&
          fechaTurno >= ahora
        );
      })
      .sort((a, b) => {
        return (
          convertirFecha(
            a.fecha,
            a.hora
          ) -
          convertirFecha(
            b.fecha,
            b.hora
          )
        );
      });

  // ==========================
  // TURNOS ANTERIORES
  // ==========================

  const turnosAnteriores =
    misTurnos
      .filter((turno) => {
        const fechaTurno =
          convertirFecha(
            turno.fecha,
            turno.hora
          );

        return (
          turno.estado === "Cancelado" ||
          (fechaTurno &&
            fechaTurno < ahora)
        );
      })
      .sort((a, b) => {
        return (
          convertirFecha(
            b.fecha,
            b.hora
          ) -
          convertirFecha(
            a.fecha,
            a.hora
          )
        );
      });

  // ==========================
  // OBTENER SERVICIO
  // ==========================

  const obtenerServicio = (
    nombreServicio
  ) => {
    return servicios.find(
      (servicio) =>
        servicio.nombre ===
        nombreServicio
    );
  };

  // ==========================
  // FORMATEAR FECHA
  // ==========================

  const formatearFecha = (
    fecha
  ) => {
    if (!fecha) {
      return "";
    }

    const [anio, mes, dia] =
      fecha.split("-");

    return `${dia}/${mes}/${anio}`;
  };

  // ==========================
  // CANCELAR TURNO
  // ==========================

  const cancelarTurno = async (id) => {
    const turno =
      misTurnos.find(
        (turnoActual) =>
          turnoActual.id === id
      );

    if (!turno) {
      return;
    }

    const fechaTurno =
      convertirFecha(
        turno.fecha,
        turno.hora
      );

    // TURNO YA PASADO

    if (
      fechaTurno &&
      fechaTurno < ahora
    ) {
      toast.error(
        "No podés cancelar un turno que ya pasó."
      );

      return;
    }

    // YA CANCELADO

    if (
      turno.estado === "Cancelado"
    ) {
      toast.info(
        "Este turno ya está cancelado."
      );

      return;
    }

    // CONFIRMACIÓN

    const resultado =
      await Swal.fire({
        title: "¿Cancelar turno?",
        text: `Vas a cancelar tu turno de ${turno.servicio} del ${formatearFecha(
          turno.fecha
        )} a las ${turno.hora}.`,
        icon: "warning",

        showCancelButton: true,

        confirmButtonText:
          "Sí, cancelar",

        cancelButtonText:
          "No, volver",

        confirmButtonColor:
          "#d33",

        cancelButtonColor:
          "#6c757d",

        reverseButtons: true,

        allowOutsideClick: false,
      });

    // USUARIO CANCELÓ

    if (!resultado.isConfirmed) {
      return;
    }

    // ACTUALIZAR TURNO

    const turnosActualizados =
      turnos.map(
        (turnoExistente) =>
          turnoExistente.id === id
            ? {
                ...turnoExistente,
                estado: "Cancelado",
              }
            : turnoExistente
      );

    setTurnos(
      turnosActualizados
    );

    toast.success(
      "Turno cancelado correctamente."
    );
  };

  // ==========================
  // INFORMACIÓN DEL ESTADO
  // ==========================

  const obtenerMensajeEstado = (
    estado
  ) => {
    if (estado === "Confirmado") {
      return {
        mensaje:
          "Tu turno está confirmado.",
        clase:
          "text-success",
      };
    }

    if (estado === "Cancelado") {
      return {
        mensaje:
          "Este turno fue cancelado.",
        clase:
          "text-danger",
      };
    }

    return {
      mensaje:
        "Tu turno está esperando confirmación.",
      clase:
        "text-warning",
    };
  };

  // ==========================
  // TARJETA DE TURNO
  // ==========================

  const renderTurno = (
    turno,
    esProximo = true
  ) => {
    const servicio =
      obtenerServicio(
        turno.servicio
      );

    const fechaTurno =
      convertirFecha(
        turno.fecha,
        turno.hora
      );

    const precio =
      Number(servicio?.precio);

    const informacionEstado =
      obtenerMensajeEstado(
        turno.estado
      );

    return (
      <div
        key={turno.id}
        className="card border-0 shadow-sm rounded-4 mb-3"
      >
        <div className="card-body p-4">

          {/* ==========================
              CABECERA
          ========================== */}

          <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-3">

            <div>
              <h5 className="fw-bold mb-1 d-flex align-items-center">

                <FaSpa className="me-2 text-primary" />

                {turno.servicio}

              </h5>

              {servicio && (
                <small className="text-muted">
                  Duración:{" "}
                  {servicio.duracion}{" "}
                  minutos
                </small>
              )}
            </div>

            {/* ESTADO */}

            <div>
              {turno.estado ===
              "Confirmado" ? (
                <span className="badge bg-success d-inline-flex align-items-center px-3 py-2">

                  <FaCheckCircle className="me-1" />

                  Confirmado

                </span>
              ) : turno.estado ===
                "Cancelado" ? (
                <span className="badge bg-danger d-inline-flex align-items-center px-3 py-2">

                  <FaTimesCircle className="me-1" />

                  Cancelado

                </span>
              ) : (
                <span className="badge bg-warning text-dark d-inline-flex align-items-center px-3 py-2">

                  <FaClock className="me-1" />

                  Pendiente

                </span>
              )}
            </div>
          </div>

          {/* ==========================
              MENSAJE DEL ESTADO
          ========================== */}

          <div
            className={`small fw-semibold mb-3 ${informacionEstado.clase}`}
          >
            {informacionEstado.mensaje}
          </div>

          {/* ==========================
              INFORMACIÓN
          ========================== */}

          <div className="row g-3">

            {/* FECHA */}

            <div className="col-12 col-md-4">

              <div className="border rounded-3 p-3 h-100">

                <small className="text-muted d-block mb-1">
                  Fecha
                </small>

                <strong className="d-flex align-items-center">

                  <FaCalendarAlt className="me-2 text-primary" />

                  {formatearFecha(
                    turno.fecha
                  )}

                </strong>

              </div>

            </div>

            {/* HORA */}

            <div className="col-12 col-md-4">

              <div className="border rounded-3 p-3 h-100">

                <small className="text-muted d-block mb-1">
                  Horario
                </small>

                <strong className="d-flex align-items-center">

                  <FaClock className="me-2 text-primary" />

                  {turno.hora}

                </strong>

              </div>

            </div>

            {/* PRECIO */}

            <div className="col-12 col-md-4">

              <div className="border rounded-3 p-3 h-100">

                <small className="text-muted d-block mb-1">
                  Precio
                </small>

                <strong className="d-flex align-items-center">

                  <FaMoneyBillWave className="me-2 text-success" />

                  {Number.isFinite(
                    precio
                  )
                    ? `$${precio.toLocaleString()}`
                    : "No disponible"}

                </strong>

              </div>

            </div>

          </div>

          {/* ==========================
              ACCIONES
          ========================== */}

          {esProximo &&
            turno.estado !==
              "Cancelado" &&
            fechaTurno &&
            fechaTurno >= ahora && (

              <div className="mt-3 pt-3 border-top">

                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  onClick={() =>
                    cancelarTurno(
                      turno.id
                    )
                  }
                >

                  <FaBan className="me-1" />

                  Cancelar turno

                </button>

              </div>
            )}

        </div>
      </div>
    );
  };

  // ==========================
  // RENDER
  // ==========================

  return (
    <UsuarioLayout>

      {/* ==========================
          ENCABEZADO
      ========================== */}

      <div className="mb-4">

        <h2 className="fw-bold d-flex align-items-center">

          <FaCalendarAlt className="me-2" />

          Mis turnos

        </h2>

        <p className="text-muted mb-0">
          Consultá tus reservas y el
          estado de cada turno.
        </p>

      </div>

      {/* ==========================
          PRÓXIMOS TURNOS
      ========================== */}

      <div className="mb-5">

        <h4 className="fw-bold mb-3 d-flex align-items-center">

          <FaCalendarAlt className="me-2" />

          Próximos turnos

        </h4>

        {proximosTurnos.length ===
        0 ? (

          <div className="card border-0 shadow-sm rounded-4">

            <div className="card-body text-center py-5">

              <FaCalendarAlt
                size={45}
                className="text-muted mb-3"
              />

              <h5 className="fw-bold">
                No tenés próximos turnos
              </h5>

              <p className="text-muted mb-0">
                Cuando reserves un turno,
                aparecerá acá.
              </p>

            </div>

          </div>

        ) : (

          proximosTurnos.map(
            (turno) =>
              renderTurno(
                turno,
                true
              )
          )

        )}

      </div>

      {/* ==========================
          HISTORIAL
      ========================== */}

      {turnosAnteriores.length >
        0 && (

        <div>

          <h4 className="fw-bold mb-3 d-flex align-items-center">

            <FaHistory className="me-2" />

            Historial

          </h4>

          {turnosAnteriores.map(
            (turno) =>
              renderTurno(
                turno,
                false
              )
          )}

        </div>

      )}

    </UsuarioLayout>
  );
}

export default UsuarioTurnos;