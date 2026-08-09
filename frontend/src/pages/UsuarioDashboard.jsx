import {
  FaCalendarAlt,
  FaClock,
  FaPlus,
  FaListAlt,
  FaUser,
} from "react-icons/fa";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import UsuarioLayout from "../layouts/UsuarioLayout";
import UsuarioContext from "../context/UsuarioContext";
import AppContext from "../context/AppContext";

function UsuarioDashboard() {
  const { usuario } =
    useContext(UsuarioContext);

  const {
    turnos,
    servicios,
  } = useContext(AppContext);

  const navigate = useNavigate();

  // ==========================
  // MIS TURNOS
  // ==========================

  const misTurnos = turnos.filter(
    (turno) =>
      turno.email === usuario?.email
  );

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

  const ahora = new Date();

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
  // PRÓXIMO TURNO
  // ==========================

  const proximoTurno =
    proximosTurnos[0] || null;

  // ==========================
  // TURNOS REALIZADOS
  // ==========================

  const turnosRealizados =
    misTurnos.filter((turno) => {
      const fechaTurno =
        convertirFecha(
          turno.fecha,
          turno.hora
        );

      return (
        turno.estado !== "Cancelado" &&
        fechaTurno &&
        fechaTurno < ahora
      );
    });

  // ==========================
  // SERVICIO
  // ==========================

  const servicioProximo =
    servicios.find(
      (servicio) =>
        servicio.nombre ===
        proximoTurno?.servicio
    );

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
  // ESTADO
  // ==========================

  const mostrarEstado = (
    estado
  ) => {
    if (estado === "Confirmado") {
      return (
        <span className="badge bg-success">
          Confirmado
        </span>
      );
    }

    if (estado === "Cancelado") {
      return (
        <span className="badge bg-danger">
          Cancelado
        </span>
      );
    }

    return (
      <span className="badge bg-warning text-dark">
        Pendiente
      </span>
    );
  };

  return (
    <UsuarioLayout>

      {/* ==========================
          ENCABEZADO
      ========================== */}

      <div className="mb-4">

        <h2 className="fw-bold">
          Bienvenido
          {usuario?.nombre
            ? `, ${usuario.nombre}`
            : ""}
        </h2>

        <p className="text-muted mb-0">
          Gestioná tus turnos de forma
          rápida y sencilla.
        </p>

      </div>

      {/* ==========================
          RESUMEN
      ========================== */}

      <div className="row g-4 mb-4">

        {/* PRÓXIMO TURNO */}

        <div className="col-md-6 col-xl-4">

          <div className="card border-0 shadow-sm rounded-4 p-4 h-100">

            <div className="d-flex align-items-center mb-3">

              <div
                className="d-flex align-items-center justify-content-center rounded-3"
                style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor:
                    "#e0edff",
                  color: "#2563eb",
                }}
              >
                <FaCalendarAlt />
              </div>

              <div className="ms-3">

                <span className="text-muted">
                  Próximo turno
                </span>

                <h5 className="fw-bold mb-0">

                  {proximoTurno
                    ? formatearFecha(
                        proximoTurno.fecha
                      )
                    : "Sin turnos"}

                </h5>

              </div>

            </div>

            <p className="text-muted mb-0">

              {proximoTurno
                ? `${proximoTurno.servicio} · ${proximoTurno.hora}`
                : "Todavía no tenés ningún turno reservado."}

            </p>

          </div>

        </div>

        {/* MIS TURNOS */}

        <div className="col-md-6 col-xl-4">

          <div className="card border-0 shadow-sm rounded-4 p-4 h-100">

            <div className="d-flex align-items-center mb-3">

              <div
                className="d-flex align-items-center justify-content-center rounded-3"
                style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor:
                    "#e8f7ee",
                  color: "#16a34a",
                }}
              >
                <FaClock />
              </div>

              <div className="ms-3">

                <span className="text-muted">
                  Mis turnos
                </span>

                <h5 className="fw-bold mb-0">
                  {misTurnos.length}
                </h5>

              </div>

            </div>

            <p className="text-muted mb-0">

              {misTurnos.length === 1
                ? "Tenés 1 turno registrado."
                : `Tenés ${misTurnos.length} turnos registrados.`}

            </p>

          </div>

        </div>

        {/* RESERVAR */}

        <div className="col-md-6 col-xl-4">

          <div className="card border-0 shadow-sm rounded-4 p-4 h-100">

            <div className="d-flex align-items-center mb-3">

              <div
                className="d-flex align-items-center justify-content-center rounded-3"
                style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor:
                    "#f3e8ff",
                  color: "#9333ea",
                }}
              >
                <FaPlus />
              </div>

              <div className="ms-3">

                <span className="text-muted">
                  Reservar
                </span>

                <h5 className="fw-bold mb-0">
                  Nuevo turno
                </h5>

              </div>

            </div>

            <p className="text-muted mb-3">
              Elegí un servicio y reservá
              tu próximo turno.
            </p>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() =>
                navigate(
                  "/usuario/reservar"
                )
              }
            >
              <FaPlus className="me-2" />
              Reservar turno
            </button>

          </div>

        </div>

      </div>

      {/* ==========================
          PRÓXIMO TURNO
      ========================== */}

      <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">

        <h5 className="fw-bold mb-4 d-flex align-items-center">

          <FaCalendarAlt className="me-2" />

          Mi próximo turno

        </h5>

        {proximoTurno ? (

          <div className="border rounded-4 p-4">

            <div className="row g-4">

              {/* SERVICIO */}

              <div className="col-md-6">

                <small className="text-muted d-block mb-1">
                  Servicio
                </small>

                <h5 className="fw-bold mb-0">
                  {proximoTurno.servicio}
                </h5>

                {servicioProximo && (
                  <small className="text-muted">
                    {servicioProximo.duracion}{" "}
                    minutos
                  </small>
                )}

              </div>

              {/* FECHA */}

              <div className="col-md-3">

                <small className="text-muted d-block mb-1">
                  Fecha
                </small>

                <strong>
                  <FaCalendarAlt className="me-2 text-primary" />

                  {formatearFecha(
                    proximoTurno.fecha
                  )}
                </strong>

              </div>

              {/* HORA */}

              <div className="col-md-3">

                <small className="text-muted d-block mb-1">
                  Horario
                </small>

                <strong>
                  <FaClock className="me-2 text-primary" />

                  {proximoTurno.hora}
                </strong>

              </div>

            </div>

            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mt-4 pt-4 border-top">

              <div>
                {mostrarEstado(
                  proximoTurno.estado
                )}
              </div>

              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() =>
                  navigate(
                    "/usuario/turnos"
                  )
                }
              >
                <FaListAlt className="me-2" />
                Ver mis turnos
              </button>

            </div>

          </div>

        ) : (

          <div
            className="text-center py-5"
            style={{
              backgroundColor:
                "#f8f9fa",
              borderRadius: "16px",
            }}
          >

            <FaCalendarAlt
              size={35}
              className="text-muted mb-3"
            />

            <h6 className="fw-bold">
              No tenés turnos próximos
            </h6>

            <p className="text-muted mb-3">
              Cuando reserves un turno,
              aparecerá acá.
            </p>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() =>
                navigate(
                  "/usuario/reservar"
                )
              }
            >
              <FaPlus className="me-2" />
              Reservar turno
            </button>

          </div>

        )}

      </div>

      {/* ==========================
          RESUMEN DE ACTIVIDAD
      ========================== */}

      <div className="card border-0 shadow-sm rounded-4 p-4">

        <h5 className="fw-bold mb-4 d-flex align-items-center">

          <FaUser className="me-2" />

          Resumen de actividad

        </h5>

        <div className="row g-3">

          <div className="col-md-4">

            <div className="border rounded-4 p-3">

              <small className="text-muted d-block">
                Próximos
              </small>

              <h4 className="fw-bold mb-0">
                {proximosTurnos.length}
              </h4>

            </div>

          </div>

          <div className="col-md-4">

            <div className="border rounded-4 p-3">

              <small className="text-muted d-block">
                Realizados
              </small>

              <h4 className="fw-bold mb-0">
                {turnosRealizados.length}
              </h4>

            </div>

          </div>

          <div className="col-md-4">

            <div className="border rounded-4 p-3">

              <small className="text-muted d-block">
                Total
              </small>

              <h4 className="fw-bold mb-0">
                {misTurnos.length}
              </h4>

            </div>

          </div>

        </div>

      </div>

    </UsuarioLayout>
  );
}

export default UsuarioDashboard;