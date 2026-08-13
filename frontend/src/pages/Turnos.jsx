import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import {
  FaCalendarAlt,
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
} from "react-icons/fa";

import DashboardLayout from "../layouts/DashboardLayout";
import AppContext from "../context/AppContext";

import {
  obtenerTurnos,
  crearTurno,
  actualizarTurno,
  eliminarTurno,
} from "../services/api";

function Turnos() {
  const {
    clientes,
    servicios,
    turnos,
    setTurnos,
  } = useContext(AppContext);

  const [cliente, setCliente] = useState("");
  const [servicio, setServicio] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [estado, setEstado] =
    useState("Pendiente");

  const [busqueda, setBusqueda] =
    useState("");

  const [modoEdicion, setModoEdicion] =
    useState(false);

  const [idEditar, setIdEditar] =
    useState(null);

  const [cargandoTurnos, setCargandoTurnos] =
    useState(true);

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
  // CARGAR TURNOS
  // ==========================

  useEffect(() => {
    const cargarTurnos = async () => {
      try {
        const token = obtenerToken();

        if (!token) {
          throw new Error(
            "No hay sesión iniciada."
          );
        }

        const turnosBackend =
          await obtenerTurnos(token);

        setTurnos(turnosBackend);
      } catch (error) {
        console.error(
          "Error al cargar turnos:",
          error
        );

        toast.error(
          error.message ||
            "No se pudieron cargar los turnos."
        );
      } finally {
        setCargandoTurnos(false);
      }
    };

    cargarTurnos();
  }, [setTurnos]);

  // ==========================
  // LIMPIAR FORMULARIO
  // ==========================

  const limpiarFormulario = () => {
    setCliente("");
    setServicio("");
    setFecha("");
    setHora("");
    setEstado("Pendiente");

    setModoEdicion(false);
    setIdEditar(null);
  };

  // ==========================
  // AGREGAR / ACTUALIZAR
  // ==========================

  const guardarTurno = async () => {
    if (
      !cliente ||
      !servicio ||
      !fecha ||
      !hora
    ) {
      toast.error(
        "Complete todos los campos"
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

      const usuarioGuardado =
        localStorage.getItem("usuario");

      if (!usuarioGuardado) {
        throw new Error(
          "No se encontró el usuario de la sesión."
        );
      }

      const usuarioActual =
        JSON.parse(usuarioGuardado);

      if (!usuarioActual.id) {
        throw new Error(
          "El usuario de la sesión no tiene un ID válido."
        );
      }

      /*
       * El backend recibe la fecha como Date.
       * Combinamos fecha + hora para enviar
       * el momento exacto del turno.
       */
      const fechaCompleta =
        `${fecha}T${hora}:00`;

      const datosTurno = {
        fecha: fechaCompleta,
        estado,
        clienteId: Number(cliente),
        servicioId: Number(servicio),
        usuarioId: Number(usuarioActual.id),
      };

      // ==========================
      // ACTUALIZAR
      // ==========================

      if (modoEdicion) {
        const turnoActualizado =
          await actualizarTurno(
            token,
            idEditar,
            datosTurno
          );

        const turnosActualizados =
          turnos.map((turno) =>
            turno.id === idEditar
              ? turnoActualizado
              : turno
          );

        setTurnos(
          turnosActualizados
        );

        toast.info(
          "Turno actualizado correctamente"
        );

        limpiarFormulario();

        return;
      }

      // ==========================
      // CREAR
      // ==========================

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
        "Turno agregado correctamente"
      );

      limpiarFormulario();

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
  // EDITAR
  // ==========================

  const editarTurno = (turno) => {
    const fechaTurno =
      new Date(turno.fecha);

    /*
     * Recuperamos la fecha y hora
     * para completar el formulario.
     */

    const fechaLocal =
      fechaTurno.toLocaleDateString(
        "en-CA"
      );

    const horaLocal =
      fechaTurno.toTimeString()
        .slice(0, 5);

    setCliente(
      String(
        turno.clienteId ||
          turno.cliente?.id ||
          ""
      )
    );

    setServicio(
      String(
        turno.servicioId ||
          turno.servicio?.id ||
          ""
      )
    );

    setFecha(fechaLocal);
    setHora(horaLocal);
    setEstado(
      turno.estado || "Pendiente"
    );

    setIdEditar(turno.id);
    setModoEdicion(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==========================
  // ELIMINAR
  // ==========================

  const eliminarTurnoHandler = (
    id
  ) => {
    Swal.fire({
      title: "¿Eliminar turno?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (!result.isConfirmed) {
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
          id
        );

        setTurnos(
          turnos.filter(
            (turno) =>
              turno.id !== id
          )
        );

        if (idEditar === id) {
          limpiarFormulario();
        }

        toast.success(
          "Turno eliminado correctamente"
        );

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
    });
  };

  // ==========================
  // FILTRAR TURNOS
  // ==========================

  const textoBusqueda =
    busqueda.toLowerCase();

  const turnosFiltrados =
    turnos.filter((turno) => {
      const clienteTexto =
        String(
          turno.cliente?.nombre ||
            turno.cliente ||
            ""
        ).toLowerCase();

      const apellidoTexto =
        String(
          turno.cliente?.apellido ||
            ""
        ).toLowerCase();

      const servicioTexto =
        String(
          turno.servicio?.nombre ||
            turno.servicio ||
            ""
        ).toLowerCase();

      const fechaTexto =
        String(
          turno.fecha || ""
        ).toLowerCase();

      const horaTexto =
        turno.fecha
          ? new Date(turno.fecha)
              .toTimeString()
              .slice(0, 5)
          : "";

      const estadoTexto =
        String(
          turno.estado || ""
        ).toLowerCase();

      return (
        clienteTexto.includes(
          textoBusqueda
        ) ||
        apellidoTexto.includes(
          textoBusqueda
        ) ||
        servicioTexto.includes(
          textoBusqueda
        ) ||
        fechaTexto.includes(
          textoBusqueda
        ) ||
        horaTexto.includes(
          textoBusqueda
        ) ||
        estadoTexto.includes(
          textoBusqueda
        )
      );
    });

  // ==========================
  // RENDER
  // ==========================

  return (
    <DashboardLayout>

      <h2 className="mb-4 d-flex align-items-center">
        <FaCalendarAlt className="me-2" />
        Gestión de Turnos
      </h2>

      {/* ==========================
          FORMULARIO
      ========================== */}

      <div className="card shadow p-4 mb-4">

        <h4 className="mb-3">
          {modoEdicion
            ? "Editar Turno"
            : "Nuevo Turno"}
        </h4>

        <div className="row g-3">

          {/* CLIENTE */}

          <div className="col-md-4">

            <label className="form-label">
              Cliente
            </label>

            <select
              className="form-select"
              value={cliente}
              onChange={(e) =>
                setCliente(
                  e.target.value
                )
              }
            >

              <option value="">
                Seleccione un cliente
              </option>

              {clientes.map(
                (clienteActual) => (

                  <option
                    key={clienteActual.id}
                    value={
                      clienteActual.id
                    }
                  >
                    {clienteActual.nombre}{" "}
                    {clienteActual.apellido}
                  </option>

                )
              )}

            </select>

          </div>

          {/* SERVICIO */}

          <div className="col-md-4">

            <label className="form-label">
              Servicio
            </label>

            <select
              className="form-select"
              value={servicio}
              onChange={(e) =>
                setServicio(
                  e.target.value
                )
              }
            >

              <option value="">
                Seleccione un servicio
              </option>

              {servicios.map(
                (servicioActual) => (

                  <option
                    key={servicioActual.id}
                    value={
                      servicioActual.id
                    }
                  >
                    {servicioActual.nombre}
                  </option>

                )
              )}

            </select>

          </div>

          {/* FECHA */}

          <div className="col-md-2">

            <label className="form-label">
              Fecha
            </label>

            <input
              type="date"
              className="form-control"
              value={fecha}
              onChange={(e) =>
                setFecha(
                  e.target.value
                )
              }
            />

          </div>

          {/* HORA */}

          <div className="col-md-2">

            <label className="form-label">
              Hora
            </label>

            <input
              type="time"
              className="form-control"
              value={hora}
              onChange={(e) =>
                setHora(
                  e.target.value
                )
              }
            />

          </div>

          {/* ESTADO */}

          <div className="col-md-4">

            <label className="form-label">
              Estado
            </label>

            <select
              className="form-select"
              value={estado}
              onChange={(e) =>
                setEstado(
                  e.target.value
                )
              }
            >

              <option value="Pendiente">
                Pendiente
              </option>

              <option value="Confirmado">
                Confirmado
              </option>

              <option value="Cancelado">
                Cancelado
              </option>

              <option value="Finalizado">
                Finalizado
              </option>

            </select>

          </div>

          {/* BOTONES */}

          <div className="col-md-8 d-flex align-items-end">

            <div className="d-flex gap-2">

              {modoEdicion ? (
                <>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={
                      guardarTurno
                    }
                  >
                    Actualizar
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={
                      limpiarFormulario
                    }
                  >
                    <FaTimes className="me-2" />
                    Cancelar
                  </button>
                </>
              ) : (

                <button
                  type="button"
                  className="btn btn-success"
                  onClick={
                    guardarTurno
                  }
                >
                  <FaPlus className="me-2" />
                  Agregar Turno
                </button>

              )}

            </div>

          </div>

        </div>

      </div>

      {/* ==========================
          BÚSQUEDA
      ========================== */}

      <div className="mb-4 position-relative">

        <FaSearch
          style={{
            position: "absolute",
            left: "14px",
            top: "50%",
            transform:
              "translateY(-50%)",
            color: "#6c757d",
            zIndex: 1,
          }}
        />

        <input
          type="text"
          className="form-control"
          style={{
            paddingLeft: "40px",
          }}
          placeholder="Buscar por cliente, servicio, fecha, hora o estado..."
          value={busqueda}
          onChange={(e) =>
            setBusqueda(
              e.target.value
            )
          }
        />

      </div>

      {/* ==========================
          TABLA
      ========================== */}

      <div className="table-responsive">

        <table className="table table-striped table-hover shadow">

          <thead className="table-dark">

            <tr>

              <th>
                Cliente
              </th>

              <th>
                Servicio
              </th>

              <th>
                Fecha
              </th>

              <th>
                Hora
              </th>

              <th>
                Estado
              </th>

              <th>
                Acciones
              </th>

            </tr>

          </thead>

          <tbody>

            {cargandoTurnos ? (

              <tr>

                <td
                  colSpan="6"
                  className="text-center py-4"
                >
                  Cargando turnos...
                </td>

              </tr>

            ) : turnosFiltrados.length ===
              0 ? (

              <tr>

                <td
                  colSpan="6"
                  className="text-center py-4"
                >
                  No hay turnos
                  registrados.
                </td>

              </tr>

            ) : (

              turnosFiltrados.map(
                (turno) => {

                  const fechaTurno =
                    new Date(
                      turno.fecha
                    );

                  const fechaTexto =
                    fechaTurno.toLocaleDateString(
                      "es-AR"
                    );

                  const horaTexto =
                    fechaTurno
                      .toTimeString()
                      .slice(0, 5);

                  const nombreCliente =
                    turno.cliente
                      ? `${turno.cliente.nombre} ${turno.cliente.apellido || ""}`.trim()
                      : "Sin cliente";

                  const nombreServicio =
                    turno.servicio?.nombre ||
                    "Sin servicio";

                  return (

                    <tr
                      key={turno.id}
                    >

                      <td>
                        {nombreCliente}
                      </td>

                      <td>
                        {nombreServicio}
                      </td>

                      <td>
                        {fechaTexto}
                      </td>

                      <td>
                        {horaTexto}
                      </td>

                      <td>

                        <span
                          className={`badge ${
                            turno.estado ===
                            "Confirmado"
                              ? "bg-success"
                              : turno.estado ===
                                "Cancelado"
                              ? "bg-danger"
                              : turno.estado ===
                                "Finalizado"
                              ? "bg-primary"
                              : "bg-warning text-dark"
                          }`}
                        >
                          {turno.estado}
                        </span>

                      </td>

                      <td>

                        <div className="d-flex gap-2">

                          <button
                            type="button"
                            className="btn btn-warning btn-sm"
                            onClick={() =>
                              editarTurno(
                                turno
                              )
                            }
                          >
                            <FaEdit className="me-1" />
                            Editar
                          </button>

                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              eliminarTurnoHandler(
                                turno.id
                              )
                            }
                          >
                            <FaTrash className="me-1" />
                            Eliminar
                          </button>

                        </div>

                      </td>

                    </tr>

                  );
                }
              )

            )}

          </tbody>

        </table>

      </div>

    </DashboardLayout>
  );
}

export default Turnos;