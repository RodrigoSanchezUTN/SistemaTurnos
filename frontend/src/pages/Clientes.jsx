import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import {
  FaUsers,
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
  obtenerClientes,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
} from "../services/api";

function Clientes() {
  const { clientes, setClientes } =
    useContext(AppContext);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");

  const [busqueda, setBusqueda] = useState("");

  const [modoEdicion, setModoEdicion] =
    useState(false);
  const [idEditar, setIdEditar] =
    useState(null);

  const [cargandoClientes, setCargandoClientes] =
    useState(true);

  // =========================
  // TOKEN
  // =========================

  const obtenerToken = () => {
    return (
      localStorage.getItem("token") ||
      sessionStorage.getItem("token")
    );
  };

  // =========================
  // CARGAR CLIENTES
  // =========================

  useEffect(() => {
    const cargarClientes = async () => {
      try {
        const token = obtenerToken();

        if (!token) {
          throw new Error(
            "No hay sesión iniciada."
          );
        }

        const clientesBackend =
          await obtenerClientes(token);

        setClientes(clientesBackend);
      } catch (error) {
        console.error(
          "Error al cargar clientes:",
          error
        );

        toast.error(
          error.message ||
            "No se pudieron cargar los clientes."
        );
      } finally {
        setCargandoClientes(false);
      }
    };

    cargarClientes();
  }, [setClientes]);

  // =========================
  // LIMPIAR FORMULARIO
  // =========================

  const limpiarFormulario = () => {
    setNombre("");
    setApellido("");
    setTelefono("");
    setEmail("");
    setModoEdicion(false);
    setIdEditar(null);
  };

  // =========================
  // VALIDAR FORMULARIO
  // =========================

  const validarFormulario = () => {
    if (
      !nombre.trim() ||
      !apellido.trim() ||
      !telefono.trim() ||
      !email.trim()
    ) {
      toast.error("Complete todos los campos");
      return false;
    }

    const emailValido =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email.trim()
      );

    if (!emailValido) {
      toast.error("Ingresá un email válido");
      return false;
    }

    return true;
  };

  // =========================
  // AGREGAR CLIENTE
  // =========================

  const agregarCliente = async () => {
    if (!validarFormulario()) {
      return;
    }

    const emailNormalizado =
      email.trim().toLowerCase();

    const existe = clientes.some(
      (cliente) =>
        cliente.email?.toLowerCase() ===
        emailNormalizado
    );

    if (existe) {
      toast.warning(
        "Ese email ya está registrado"
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

      const nuevoCliente =
        await crearCliente(token, {
          nombre: nombre.trim(),
          apellido: apellido.trim(),
          telefono: telefono.trim(),
          email: emailNormalizado,
        });

      setClientes([
        ...clientes,
        nuevoCliente,
      ]);

      toast.success(
        "Cliente agregado correctamente"
      );

      limpiarFormulario();
    } catch (error) {
      console.error(
        "Error al agregar cliente:",
        error
      );

      toast.error(
        error.message ||
          "No se pudo agregar el cliente."
      );
    }
  };

  // =========================
  // EDITAR CLIENTE
  // =========================

  const editarCliente = (cliente) => {
    setNombre(cliente.nombre || "");
    setApellido(cliente.apellido || "");
    setTelefono(cliente.telefono || "");
    setEmail(cliente.email || "");

    setModoEdicion(true);
    setIdEditar(cliente.id);
  };

  // =========================
  // ACTUALIZAR CLIENTE
  // =========================

  const actualizarClienteHandler =
    async () => {
      if (!validarFormulario()) {
        return;
      }

      try {
        const token = obtenerToken();

        if (!token) {
          throw new Error(
            "No hay sesión iniciada."
          );
        }

        const clienteActualizado =
          await actualizarCliente(
            token,
            idEditar,
            {
              nombre: nombre.trim(),
              apellido: apellido.trim(),
              telefono: telefono.trim(),
              email: email
                .trim()
                .toLowerCase(),
            }
          );

        const clientesActualizados =
          clientes.map((cliente) =>
            cliente.id === idEditar
              ? clienteActualizado
              : cliente
          );

        setClientes(
          clientesActualizados
        );

        toast.info(
          "Cliente actualizado correctamente"
        );

        limpiarFormulario();
      } catch (error) {
        console.error(
          "Error al actualizar cliente:",
          error
        );

        toast.error(
          error.message ||
            "No se pudo actualizar el cliente."
        );
      }
    };

  // =========================
  // ELIMINAR CLIENTE
  // =========================

  const eliminarClienteHandler = (
    id
  ) => {
    Swal.fire({
      title: "¿Eliminar cliente?",
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

        await eliminarCliente(token, id);

        setClientes(
          clientes.filter(
            (cliente) =>
              cliente.id !== id
          )
        );

        toast.success(
          "Cliente eliminado correctamente"
        );
      } catch (error) {
        console.error(
          "Error al eliminar cliente:",
          error
        );

        toast.error(
          error.message ||
            "No se pudo eliminar el cliente."
        );
      }
    });
  };

  // =========================
  // BÚSQUEDA
  // =========================

  const clientesFiltrados =
    clientes.filter((cliente) => {
      const texto =
        busqueda.toLowerCase();

      return (
        `${cliente.nombre || ""} ${
          cliente.apellido || ""
        }`
          .toLowerCase()
          .includes(texto) ||
        (cliente.telefono || "")
          .toLowerCase()
          .includes(texto) ||
        (cliente.email || "")
          .toLowerCase()
          .includes(texto)
      );
    });

  // =========================
  // INTERFAZ
  // =========================

  return (
    <DashboardLayout>

      <div className="container-fluid">

        <h2 className="mb-4 d-flex align-items-center">
          <FaUsers className="me-2" />
          Gestión de Clientes
        </h2>

        {/* FORMULARIO */}

        <div className="card shadow border-0 mb-4">

          <div className="card-header bg-primary text-white">

            <h5 className="mb-0">
              {modoEdicion
                ? "Editar Cliente"
                : "Nuevo Cliente"}
            </h5>

          </div>

          <div className="card-body">

            <div className="row">

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Nombre
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingrese el nombre"
                  value={nombre}
                  onChange={(e) =>
                    setNombre(
                      e.target.value
                    )
                  }
                />

              </div>

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Apellido
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingrese el apellido"
                  value={apellido}
                  onChange={(e) =>
                    setApellido(
                      e.target.value
                    )
                  }
                />

              </div>

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Teléfono
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingrese el teléfono"
                  value={telefono}
                  onChange={(e) =>
                    setTelefono(
                      e.target.value
                    )
                  }
                />

              </div>

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Email
                </label>

                <input
                  type="email"
                  className="form-control"
                  placeholder="Ingrese el email"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                />

              </div>

            </div>

            {!modoEdicion ? (

              <button
                type="button"
                className="btn btn-success"
                onClick={agregarCliente}
              >
                <FaPlus className="me-2" />
                Agregar Cliente
              </button>

            ) : (

              <>
                <button
                  type="button"
                  className="btn btn-primary me-2"
                  onClick={
                    actualizarClienteHandler
                  }
                >
                  <FaSave className="me-2" />
                  Actualizar Cliente
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

            )}

          </div>

        </div>

        {/* BÚSQUEDA Y TABLA */}

        <div className="card shadow border-0">

          <div className="card-body">

            <div className="row mb-3">

              <div className="col-md-6 position-relative">

                <FaSearch
                  style={{
                    position: "absolute",
                    left: "25px",
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
                  placeholder="Buscar por nombre, apellido, teléfono o email..."
                  value={busqueda}
                  onChange={(e) =>
                    setBusqueda(
                      e.target.value
                    )
                  }
                />

              </div>

            </div>

            <div className="table-responsive">

              <table className="table table-hover align-middle">

                <thead className="table-dark">

                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Teléfono</th>
                    <th>Email</th>
                    <th width="180">
                      Acciones
                    </th>
                  </tr>

                </thead>

                <tbody>

                  {cargandoClientes ? (

                    <tr>
                      <td
                        colSpan="6"
                        className="text-center py-4"
                      >
                        Cargando clientes...
                      </td>
                    </tr>

                  ) : clientesFiltrados.length >
                    0 ? (

                    clientesFiltrados.map(
                      (cliente) => (

                        <tr
                          key={cliente.id}
                        >

                          <td>
                            {cliente.id}
                          </td>

                          <td>
                            {cliente.nombre}
                          </td>

                          <td>
                            {cliente.apellido}
                          </td>

                          <td>
                            {cliente.telefono}
                          </td>

                          <td>
                            {cliente.email}
                          </td>

                          <td>

                            <button
                              type="button"
                              className="btn btn-warning btn-sm me-2"
                              onClick={() =>
                                editarCliente(
                                  cliente
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
                                eliminarClienteHandler(
                                  cliente.id
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
                        colSpan="6"
                        className="text-center py-4"
                      >
                        No se encontraron
                        clientes.
                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Clientes;