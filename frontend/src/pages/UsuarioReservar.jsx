import { useContext, useState } from "react";
import { toast } from "react-toastify";

import {
  FaCalendarAlt,
  FaClock,
  FaSpa,
  FaCheckCircle,
} from "react-icons/fa";

import UsuarioLayout from "../layouts/UsuarioLayout";
import AppContext from "../context/AppContext";
import UsuarioContext from "../context/UsuarioContext";

function UsuarioReservar() {
  const {
    servicios,
    turnos,
    setTurnos,
    horarios,
  } = useContext(AppContext);

  const { usuario } = useContext(UsuarioContext);

  const [servicioSeleccionado, setServicioSeleccionado] =
    useState("");

  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  // ==========================
  // OBTENER DÍA DE LA SEMANA
  // ==========================

  const obtenerDiaSemana = (fechaSeleccionada) => {
    const [anio, mes, dia] =
      fechaSeleccionada.split("-");

    const fechaLocal = new Date(
      Number(anio),
      Number(mes) - 1,
      Number(dia)
    );

    const dias = [
      "domingo",
      "lunes",
      "martes",
      "miercoles",
      "jueves",
      "viernes",
      "sabado",
    ];

    return dias[fechaLocal.getDay()];
  };

  // ==========================
  // CONVERTIR HORA A MINUTOS
  // ==========================

  const horaAMinutos = (hora) => {
    if (!hora) {
      return 0;
    }

    const [horas, minutos] =
      hora.split(":").map(Number);

    return horas * 60 + minutos;
  };

  // ==========================
  // CONVERTIR MINUTOS A HORA
  // ==========================

  const minutosAHora = (minutos) => {
    const horas = Math.floor(
      minutos / 60
    );

    const minutosRestantes =
      minutos % 60;

    return `${String(horas).padStart(
      2,
      "0"
    )}:${String(minutosRestantes).padStart(
      2,
      "0"
    )}`;
  };

  // ==========================
  // SERVICIO SELECCIONADO
  // ==========================

  const servicioActual = servicios.find(
    (servicio) =>
      servicio.nombre ===
      servicioSeleccionado
  );

  const duracionServicio =
    Number(servicioActual?.duracion) || 60;

  // ==========================
  // GENERAR HORARIOS
  // ==========================

  const generarHorarios = (
    inicio,
    fin,
    duracion
  ) => {
    if (!inicio || !fin) {
      return [];
    }

    const horariosGenerados = [];

    let minutos =
      horaAMinutos(inicio);

    const limite =
      horaAMinutos(fin);

    while (
      minutos + duracion <=
      limite
    ) {
      horariosGenerados.push(
        minutosAHora(minutos)
      );

      minutos += duracion;
    }

    return horariosGenerados;
  };

  // ==========================
  // HORARIOS DEL DÍA
  // ==========================

  const obtenerConfiguracionDia = () => {
    if (!fecha || !horarios) {
      return null;
    }

    const diaSemana =
      obtenerDiaSemana(fecha);

    // Primero intenta encontrar
    // exactamente el día.
    if (horarios[diaSemana]) {
      return horarios[diaSemana];
    }

    // Compatibilidad por si existe
    // una configuración con mayúsculas.
    const claveEncontrada =
      Object.keys(horarios).find(
        (clave) =>
          clave.toLowerCase() ===
          diaSemana
      );

    if (claveEncontrada) {
      return horarios[
        claveEncontrada
      ];
    }

    return null;
  };

  const configuracionDia =
    obtenerConfiguracionDia();

  const horariosDelDia =
    (() => {
      if (
        !fecha ||
        !servicioActual ||
        !configuracionDia
      ) {
        return [];
      }

      if (
        configuracionDia.activo ===
        false
      ) {
        return [];
      }

      const primerTurno =
        generarHorarios(
          configuracionDia.inicio,
          configuracionDia.fin,
          duracionServicio
        );

      const segundoTurno =
        generarHorarios(
          configuracionDia.inicio2,
          configuracionDia.fin2,
          duracionServicio
        );

      return [
        ...primerTurno,
        ...segundoTurno,
      ];
    })();

  // ==========================
  // COMPROBAR SUPERPOSICIÓN
  // ==========================

  const horarioEstaOcupado = (
    horario
  ) => {
    if (!fecha) {
      return false;
    }

    const inicioNuevo =
      horaAMinutos(horario);

    const finNuevo =
      inicioNuevo +
      duracionServicio;

    return turnos.some((turno) => {
      if (
        turno.fecha !== fecha ||
        turno.estado === "Cancelado"
      ) {
        return false;
      }

      const inicioExistente =
        horaAMinutos(turno.hora);

      const servicioExistente =
        servicios.find(
          (servicio) =>
            servicio.nombre ===
            turno.servicio
        );

      const duracionExistente =
        Number(
          servicioExistente?.duracion
        ) || 60;

      const finExistente =
        inicioExistente +
        duracionExistente;

      return (
        inicioNuevo <
          finExistente &&
        finNuevo >
          inicioExistente
      );
    });
  };

  // ==========================
  // RESERVAR TURNO
  // ==========================

  const reservarTurno = () => {
    if (!usuario) {
      toast.error(
        "No hay un usuario iniciado."
      );
      return;
    }

    if (!servicioSeleccionado) {
      toast.error(
        "Seleccioná un servicio."
      );
      return;
    }

    if (!fecha) {
      toast.error(
        "Seleccioná una fecha."
      );
      return;
    }

    if (!hora) {
      toast.error(
        "Seleccioná un horario."
      );
      return;
    }

    if (horarioEstaOcupado(hora)) {
      toast.error(
        "Ese horario no está disponible."
      );
      return;
    }

    const nuevoTurno = {
      id: Date.now(),

      cliente: usuario.nombre,

      email: usuario.email,

      telefono: usuario.telefono,

      servicio: servicioSeleccionado,

      fecha,

      hora,

      estado: "Pendiente",
    };

    setTurnos([
      ...turnos,
      nuevoTurno,
    ]);

    setServicioSeleccionado("");
    setFecha("");
    setHora("");

    toast.success(
      "¡Turno reservado correctamente!"
    );
  };

  // ==========================
  // CAMBIAR FECHA
  // ==========================

  const cambiarFecha = (
    nuevaFecha
  ) => {
    setFecha(nuevaFecha);
    setHora("");
  };

  // ==========================
  // CAMBIAR SERVICIO
  // ==========================

  const cambiarServicio = (
    nuevoServicio
  ) => {
    setServicioSeleccionado(
      nuevoServicio
    );

    setHora("");
  };

  // ==========================
  // RENDER
  // ==========================

  return (
    <UsuarioLayout>

      <div className="mb-4">

        <h2 className="fw-bold d-flex align-items-center">

          <FaCalendarAlt className="me-2" />

          Reservar turno

        </h2>

        <p className="text-muted mb-0">
          Elegí el servicio, la fecha y
          un horario disponible.
        </p>

      </div>

      <div className="card border-0 shadow-sm rounded-4">

        <div className="card-body p-4">

          {/* SERVICIO */}

          <div className="mb-4">

            <label className="form-label fw-semibold">

              <FaSpa className="me-2" />

              Servicio

            </label>

            <select
              className="form-select"
              value={
                servicioSeleccionado
              }
              onChange={(e) =>
                cambiarServicio(
                  e.target.value
                )
              }
            >

              <option value="">
                Seleccioná un servicio
              </option>

              {servicios.map(
                (servicio) => (
                  <option
                    key={servicio.id}
                    value={
                      servicio.nombre
                    }
                  >
                    {servicio.nombre} — $
                    {Number(
                      servicio.precio
                    ).toLocaleString()}{" "}
                    · {servicio.duracion} min
                  </option>
                )
              )}

            </select>

          </div>

          {/* FECHA */}

          <div className="mb-4">

            <label className="form-label fw-semibold">

              <FaCalendarAlt className="me-2" />

              Fecha

            </label>

            <input
              type="date"
              className="form-control"
              value={fecha}
              min={
                new Date()
                  .toISOString()
                  .split("T")[0]
              }
              onChange={(e) =>
                cambiarFecha(
                  e.target.value
                )
              }
            />

          </div>

          {/* HORARIOS */}

          <div className="mb-4">

            <label className="form-label fw-semibold">

              <FaClock className="me-2" />

              Horario disponible

            </label>

            {!fecha ? (

              <div className="alert alert-light border rounded-3 mb-0">

                Primero seleccioná una
                fecha para ver los
                horarios disponibles.

              </div>

            ) : !servicioSeleccionado ? (

              <div className="alert alert-light border rounded-3 mb-0">

                Primero seleccioná un
                servicio para mostrar
                los horarios.

              </div>

            ) : horariosDelDia.length === 0 ? (

              <div className="alert alert-warning border rounded-3 mb-0">

                El negocio no está
                disponible este día.

              </div>

            ) : (

              <div className="row g-2">

                {horariosDelDia.map(
                  (horario) => {

                    const ocupado =
                      horarioEstaOcupado(
                        horario
                      );

                    const seleccionado =
                      hora === horario;

                    return (

                      <div
                        key={horario}
                        className="col-6 col-md-4 col-lg-3"
                      >

                        <button
                          type="button"
                          disabled={
                            ocupado
                          }
                          onClick={() =>
                            setHora(
                              horario
                            )
                          }
                          className={`btn w-100 ${
                            seleccionado
                              ? "btn-primary"
                              : ocupado
                              ? "btn-outline-secondary"
                              : "btn-outline-primary"
                          }`}
                        >

                          <FaClock className="me-2" />

                          {horario}

                          {ocupado && (
                            <span className="d-block small">
                              Ocupado
                            </span>
                          )}

                        </button>

                      </div>

                    );
                  }
                )}

              </div>

            )}

          </div>

          {/* RESUMEN */}

          {servicioSeleccionado &&
            fecha &&
            hora && (

              <div className="alert alert-light border rounded-4 mb-4">

                <div className="d-flex align-items-center mb-2">

                  <FaCheckCircle className="text-success me-2" />

                  <strong>
                    Resumen de tu turno
                  </strong>

                </div>

                <div className="ms-4">

                  <div>
                    <strong>
                      Servicio:
                    </strong>{" "}
                    {servicioSeleccionado}
                  </div>

                  <div>
                    <strong>
                      Duración:
                    </strong>{" "}
                    {duracionServicio} minutos
                  </div>

                  <div>
                    <strong>
                      Fecha:
                    </strong>{" "}
                    {fecha}
                  </div>

                  <div>
                    <strong>
                      Hora:
                    </strong>{" "}
                    {hora}
                  </div>

                </div>

              </div>

            )}

          {/* CONFIRMAR */}

          <button
            type="button"
            className="btn btn-primary"
            onClick={
              reservarTurno
            }
            disabled={
              !servicioSeleccionado ||
              !fecha ||
              !hora
            }
          >

            <FaCheckCircle className="me-2" />

            Confirmar turno

          </button>

        </div>

      </div>

    </UsuarioLayout>
  );
}

export default UsuarioReservar;