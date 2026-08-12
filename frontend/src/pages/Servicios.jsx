import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import {
  FaSpa,
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
} from "react-icons/fa";

import DashboardLayout from "../layouts/DashboardLayout";
import AppContext from "../context/AppContext";

import {
  obtenerServicios,
  crearServicio,
  actualizarServicio,
  eliminarServicio,
} from "../services/api";

function Servicios() {
  const { servicios, setServicios } = useContext(AppContext);

  const [nombre, setNombre] = useState("");
  const [duracion, setDuracion] = useState("");
  const [precio, setPrecio] = useState("");
  const [busqueda, setBusqueda] = useState("");

  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditar, setIdEditar] = useState(null);
  const [cargandoServicios, setCargandoServicios] = useState(true);

  // =========================
  // OBTENER TOKEN
  // =========================

  const obtenerToken = () => {
    return (
      localStorage.getItem("token") ||
      sessionStorage.getItem("token")
    );
  };

  // =========================
  // CARGAR SERVICIOS
  // =========================

  useEffect(() => {
    const cargarServicios = async () => {
      try {
        const token = obtenerToken();

        if (!token) {
          throw new Error("No hay sesión iniciada.");
        }

        const serviciosBackend =
          await obtenerServicios(token);

        setServicios(serviciosBackend);
      } catch (error) {
        console.error(
          "Error al cargar servicios:",
          error
        );

        toast.error(
          error.message ||
            "No se pudieron cargar los servicios."
        );
      } finally {
        setCargandoServicios(false);
      }
    };

    cargarServicios();
  }, [setServicios]);

  // =========================
  // LIMPIAR FORMULARIO
  // =========================

  const limpiarFormulario = () => {
    setNombre("");
    setDuracion("");
    setPrecio("");
    setModoEdicion(false);
    setIdEditar(null);
  };

  // =========================
  // AGREGAR SERVICIO
  // =========================

  const agregarServicio = async () => {
    if (!nombre.trim() || !duracion || !precio) {
      toast.error("Complete todos los campos");
      return;
    }

    if (Number(duracion) <= 0) {
      toast.error(
        "La duración debe ser mayor a 0"
      );
      return;
    }

    if (Number(precio) <= 0) {
      toast.error(
        "El precio debe ser mayor a 0"
      );
      return;
    }

    try {
      const token = obtenerToken();

      if (!token) {
        throw new Error("No hay sesión iniciada.");
      }

      const nuevoServicio =
        await crearServicio(token, {
          nombre: nombre.trim(),
          duracion: Number(duracion),
          precio: Number(precio),
        });

      setServicios([
        ...servicios,
        nuevoServicio,
      ]);

      toast.success(
        "Servicio agregado correctamente"
      );

      limpiarFormulario();
    } catch (error) {
      console.error(
        "Error al agregar servicio:",
        error
      );

      toast.error(
        error.message ||
          "No se pudo agregar el servicio."
      );
    }
  };

  // =========================
  // EDITAR SERVICIO
  // =========================

  const editarServicio = (servicio) => {
    setNombre(servicio.nombre);
    setDuracion(servicio.duracion);
    setPrecio(servicio.precio);

    setModoEdicion(true);
    setIdEditar(servicio.id);
  };

  // =========================
  // ACTUALIZAR SERVICIO
  // =========================

  const actualizarServicioHandler =
    async () => {
      if (
        !nombre.trim() ||
        !duracion ||
        !precio
      ) {
        toast.error(
          "Complete todos los campos"
        );
        return;
      }

      if (Number(duracion) <= 0) {
        toast.error(
          "La duración debe ser mayor a 0"
        );
        return;
      }

      if (Number(precio) <= 0) {
        toast.error(
          "El precio debe ser mayor a 0"
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

        const servicioActualizado =
          await actualizarServicio(
            token,
            idEditar,
            {
              nombre: nombre.trim(),
              duracion: Number(duracion),
              precio: Number(precio),
            }
          );

        const serviciosActualizados =
          servicios.map((servicio) =>
            servicio.id === idEditar
              ? servicioActualizado
              : servicio
          );

        setServicios(
          serviciosActualizados
        );

        toast.info(
          "Servicio actualizado correctamente"
        );

        limpiarFormulario();
      } catch (error) {
        console.error(
          "Error al actualizar servicio:",
          error
        );

        toast.error(
          error.message ||
            "No se pudo actualizar el servicio."
        );
      }
    };

  // =========================
  // ELIMINAR SERVICIO
  // =========================

  const eliminarServicioHandler = (
    id
  ) => {
    Swal.fire({
      title: "¿Eliminar servicio?",
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

        await eliminarServicio(
          token,
          id
        );

        setServicios(
          servicios.filter(
            (servicio) =>
              servicio.id !== id
          )
        );

        toast.success(
          "Servicio eliminado correctamente"
        );
      } catch (error) {
        console.error(
          "Error al eliminar servicio:",
          error
        );

        toast.error(
          error.message ||
            "No se pudo eliminar el servicio."
        );
      }
    });
  };

  // =========================
  // BÚSQUEDA
  // =========================

  const serviciosFiltrados =
    servicios.filter((servicio) => {
      const texto =
        busqueda.toLowerCase();

      return (
        servicio.nombre
          .toLowerCase()
          .includes(texto) ||
        servicio.duracion
          .toString()
          .includes(texto) ||
        servicio.precio
          .toString()
          .includes(texto)
      );
    });

  // =========================
  // INTERFAZ
  // =========================

  return (
    <DashboardLayout>

      <h2 className="mb-4 d-flex align-items-center">
        <FaSpa className="me-2" />
        Gestión de Servicios
      </h2>

      {/* FORMULARIO */}

      <div className="card shadow p-4 mb-4">

        <h4 className="mb-3">
          {modoEdicion
            ? "Editar Servicio"
            : "Nuevo Servicio"}
        </h4>

        <div className="row g-3">

          <div className="col-md-4">

            <label className="form-label">
              Nombre
            </label>

            <input
              className="form-control"
              value={nombre}
              onChange={(e) =>
                setNombre(e.target.value)
              }
            />

          </div>

          <div className="col-md-4">

            <label className="form-label">
              Duración (minutos)
            </label>

            <input
              type="number"
              min="1"
              className="form-control"
              value={duracion}
              onChange={(e) =>
                setDuracion(e.target.value)
              }
            />

          </div>

          <div className="col-md-4">

            <label className="form-label">
              Precio
            </label>

            <input
              type="number"
              min="1"
              className="form-control"
              value={precio}
              onChange={(e) =>
                setPrecio(e.target.value)
              }
            />

          </div>

        </div>

        <div className="mt-4">

          {!modoEdicion && (
            <button
              type="button"
              className="btn btn-success"
              onClick={agregarServicio}
            >
              <FaPlus className="me-2" />
              Agregar Servicio
            </button>
          )}

          {modoEdicion && (
            <>
              <button
                type="button"
                className="btn btn-warning me-2"
                onClick={
                  actualizarServicioHandler
                }
              >
                <FaSave className="me-2" />
                Actualizar
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={limpiarFormulario}
              >
                <FaTimes className="me-2" />
                Cancelar
              </button>
            </>
          )}

        </div>

      </div>

      {/* BÚSQUEDA */}

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
          placeholder="Buscar por nombre, duración o precio..."
          value={busqueda}
          onChange={(e) =>
            setBusqueda(e.target.value)
          }
        />

      </div>

      {/* TABLA */}

      <div className="table-responsive">

        <table className="table table-striped table-hover shadow">

          <thead className="table-dark">

            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Duración</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>

          </thead>

          <tbody>

            {cargandoServicios ? (

              <tr>
                <td
                  colSpan="5"
                  className="text-center py-4"
                >
                  Cargando servicios...
                </td>
              </tr>

            ) : serviciosFiltrados.length > 0 ? (

              serviciosFiltrados.map(
                (servicio) => (

                  <tr
                    key={servicio.id}
                  >

                    <td>
                      {servicio.id}
                    </td>

                    <td>
                      {servicio.nombre}
                    </td>

                    <td>
                      {servicio.duracion} min
                    </td>

                    <td>
                      $
                      {Number(
                        servicio.precio
                      ).toLocaleString()}
                    </td>

                    <td>

                      <button
                        type="button"
                        className="btn btn-warning btn-sm me-2"
                        onClick={() =>
                          editarServicio(
                            servicio
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
                          eliminarServicioHandler(
                            servicio.id
                          )
                        }
                      >
                        <FaTrash className="me-1" />
                        Eliminar
                      </button>

                    </td>

                  </tr>

                )
              )

            ) : (

              <tr>

                <td
                  colSpan="5"
                  className="text-center py-4"
                >
                  No se encontraron servicios.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </DashboardLayout>
  );
}

export default Servicios;