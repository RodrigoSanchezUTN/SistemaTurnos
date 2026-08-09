import { useContext, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import {
  FaCalendarAlt,
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
} from "react-icons/fa";

import DashboardLayout from "../layouts/DashboardLayout";
import AppContext from "../context/AppContext";

function Turnos() {
  const {
    clientes,
    servicios,
    turnos,
    setTurnos,
  } = useContext(AppContext);

  // ==========================
  // FORMULARIO
  // ==========================

  const [cliente, setCliente] =
    useState("");

  const [servicio, setServicio] =
    useState("");

  const [fecha, setFecha] =
    useState("");

  const [hora, setHora] =
    useState("");

  const [estado, setEstado] =
    useState("Pendiente");

  // ==========================
  // BÚSQUEDA
  // ==========================

  const [busqueda, setBusqueda] =
    useState("");

  // ==========================
  // EDICIÓN
  // ==========================

  const [modoEdicion, setModoEdicion] =
    useState(false);

  const [idEditar, setIdEditar] =
    useState(null);

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

  const agregarTurno = () => {
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

    // Comprobar horario ocupado
    const existe = turnos.some(
      (turno) =>
        turno.fecha === fecha &&
        turno.hora === hora &&
        (
          !modoEdicion ||
          turno.id !== idEditar
        ) &&
        turno.estado !== "Cancelado"
    );

    if (existe) {
      toast.warning(
        "Ese horario ya está ocupado"
      );

      return;
    }

    // ==========================
    // ACTUALIZAR
    // ==========================

    if (modoEdicion) {
      const turnosActualizados =
        turnos.map((turno) =>
          turno.id === idEditar
            ? {
                ...turno,
                cliente,
                servicio,
                fecha,
                hora,
                estado,
              }
            : turno
        );

      setTurnos(
        turnosActualizados
      );

      toast.info(
        "Turno actualizado correctamente"
      );
    }

    // ==========================
    // CREAR
    // ==========================

    else {
      const nuevoTurno = {
        id: Date.now(),
        cliente,
        servicio,
        fecha,
        hora,
        estado,
      };

      setTurnos([
        ...turnos,
        nuevoTurno,
      ]);

      toast.success(
        "Turno agregado correctamente"
      );
    }

    limpiarFormulario();
  };

  // ==========================
  // EDITAR
  // ==========================

  const editarTurno = (turno) => {
    setCliente(
      turno.cliente || ""
    );

    setServicio(
      turno.servicio || ""
    );

    setFecha(
      turno.fecha || ""
    );

    setHora(
      turno.hora || ""
    );

    setEstado(
      turno.estado || "Pendiente"
    );

    setIdEditar(turno.id);

    setModoEdicion(true);

    // Llevar el formulario hacia arriba
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==========================
  // ELIMINAR
  // ==========================

  const eliminarTurno = (id) => {
    Swal.fire({
      title: "¿Eliminar turno?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText:
        "Sí, eliminar",
      cancelButtonText:
        "Cancelar",
    }).then((result) => {
      if (!result.isConfirmed) {
        return;
      }

      setTurnos(
        turnos.filter(
          (turno) =>
            turno.id !== id
        )
      );

      // Si justo estábamos editando
      // ese turno, limpiamos.
      if (idEditar === id) {
        limpiarFormulario();
      }

      toast.success(
        "Turno eliminado correctamente"
      );
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
          turno.cliente || ""
        ).toLowerCase();

      const servicioTexto =
        String(
          turno.servicio || ""
        ).toLowerCase();

      const fechaTexto =
        String(
          turno.fecha || ""
        ).toLowerCase();

      const horaTexto =
        String(
          turno.hora || ""
        ).toLowerCase();

      const estadoTexto =
        String(
          turno.estado || ""
        ).toLowerCase();

      return (
        clienteTexto.includes(
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

      {/* ==========================
          TÍTULO
      ========================== */}

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
                    key={
                      clienteActual.id
                    }
                    value={
                      clienteActual.nombre
                    }
                  >
                    {
                      clienteActual.nombre
                    }
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
                    key={
                      servicioActual.id
                    }
                    value={
                      servicioActual.nombre
                    }
                  >
                    {
                      servicioActual.nombre
                    }
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

            </select>

          </div>

          {/* BOTONES */}

          <div className="col-md-8 d-flex align-items-end">

            {/* CONTENEDOR ESTABLE */}

            <div className="d-flex gap-2">

              {modoEdicion && (
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={
                    agregarTurno
                  }
                >

                  <FaSave className="me-2" />

                  Actualizar

                </button>
              )}

              {modoEdicion && (
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
              )}

              {!modoEdicion && (
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={
                    agregarTurno
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

            {turnosFiltrados.length ===
            0 ? (

              <tr>

                <td
                  colSpan="6"
                  className="text-center"
                >
                  No hay turnos
                  registrados.
                </td>

              </tr>

            ) : (

              turnosFiltrados.map(
                (turno) => (

                  <tr
                    key={turno.id}
                  >

                    <td>
                      {
                        turno.cliente
                      }
                    </td>

                    <td>
                      {
                        turno.servicio
                      }
                    </td>

                    <td>
                      {
                        turno.fecha
                      }
                    </td>

                    <td>
                      {
                        turno.hora
                      }
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
                            : "bg-warning text-dark"
                        }`}
                      >
                        {
                          turno.estado
                        }
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
                            eliminarTurno(
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

                )
              )

            )}

          </tbody>

        </table>

      </div>

    </DashboardLayout>
  );
}

export default Turnos;