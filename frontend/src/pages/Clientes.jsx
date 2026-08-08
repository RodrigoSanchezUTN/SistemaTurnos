import { useContext, useState } from "react";
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

function Clientes() {
  const { clientes, setClientes } = useContext(AppContext);

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");

  const [busqueda, setBusqueda] = useState("");

  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  const limpiarFormulario = () => {
    setNombre("");
    setTelefono("");
    setEmail("");

    setModoEdicion(false);
    setIdEditar(null);
  };

  const agregarCliente = () => {
    if (!nombre.trim() || !telefono.trim() || !email.trim()) {
      toast.error("Complete todos los campos");
      return;
    }

    const emailValido =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!emailValido) {
      toast.error("Ingresá un email válido");
      return;
    }

    const existe = clientes.some(
      (c) =>
        c.email.toLowerCase() === email.toLowerCase()
    );

    if (existe) {
      toast.warning("Ese email ya está registrado");
      return;
    }

    const nuevoCliente = {
      id: Date.now(),
      nombre,
      telefono,
      email,
    };

    setClientes([...clientes, nuevoCliente]);

    toast.success("Cliente agregado correctamente");

    limpiarFormulario();
  };

  const editarCliente = (cliente) => {
    setNombre(cliente.nombre);
    setTelefono(cliente.telefono);
    setEmail(cliente.email);

    setModoEdicion(true);
    setIdEditar(cliente.id);
  };

  const actualizarCliente = () => {
    if (!nombre.trim() || !telefono.trim() || !email.trim()) {
      toast.error("Complete todos los campos");
      return;
    }

    const emailValido =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!emailValido) {
      toast.error("Ingresá un email válido");
      return;
    }

    const clientesActualizados = clientes.map(
      (cliente) =>
        cliente.id === idEditar
          ? {
              ...cliente,
              nombre,
              telefono,
              email,
            }
          : cliente
    );

    setClientes(clientesActualizados);

    toast.info("Cliente actualizado");

    limpiarFormulario();
  };

  const eliminarCliente = (id) => {
    Swal.fire({
      title: "¿Eliminar cliente?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setClientes(
          clientes.filter(
            (cliente) => cliente.id !== id
          )
        );

        toast.success(
          "Cliente eliminado correctamente"
        );
      }
    });
  };

  const clientesFiltrados = clientes.filter(
    (cliente) => {
      const texto = busqueda.toLowerCase();

      return (
        cliente.nombre
          .toLowerCase()
          .includes(texto) ||
        cliente.telefono
          .toLowerCase()
          .includes(texto) ||
        cliente.email
          .toLowerCase()
          .includes(texto)
      );
    }
  );

  return (
    <DashboardLayout>

      <div className="container-fluid">

        {/* TÍTULO */}

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

              <div className="col-md-4 mb-3">

                <label className="form-label">
                  Nombre
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingrese el nombre"
                  value={nombre}
                  onChange={(e) =>
                    setNombre(e.target.value)
                  }
                />

              </div>

              <div className="col-md-4 mb-3">

                <label className="form-label">
                  Teléfono
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingrese el teléfono"
                  value={telefono}
                  onChange={(e) =>
                    setTelefono(e.target.value)
                  }
                />

              </div>

              <div className="col-md-4 mb-3">

                <label className="form-label">
                  Email
                </label>

                <input
                  type="email"
                  className="form-control"
                  placeholder="Ingrese el email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />

              </div>

            </div>

            {!modoEdicion ? (

              <button
                className="btn btn-success"
                onClick={agregarCliente}
              >
                <FaPlus className="me-2" />
                Agregar Cliente
              </button>

            ) : (

              <>
                <button
                  className="btn btn-primary me-2"
                  onClick={actualizarCliente}
                >
                  <FaSave className="me-2" />
                  Actualizar Cliente
                </button>

                <button
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
                  }}
                />

                <input
                  type="text"
                  className="form-control"
                  style={{
                    paddingLeft: "40px",
                  }}
                  placeholder="Buscar por nombre, teléfono o email..."
                  value={busqueda}
                  onChange={(e) =>
                    setBusqueda(e.target.value)
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
                    <th>Teléfono</th>
                    <th>Email</th>
                    <th width="180">Acciones</th>
                  </tr>

                </thead>

                <tbody>

                  {clientesFiltrados.length > 0 ? (

                    clientesFiltrados.map(
                      (cliente) => (

                        <tr key={cliente.id}>

                          <td>
                            {cliente.id}
                          </td>

                          <td>
                            {cliente.nombre}
                          </td>

                          <td>
                            {cliente.telefono}
                          </td>

                          <td>
                            {cliente.email}
                          </td>

                          <td>

                            <button
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
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                eliminarCliente(
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
                        colSpan="5"
                        className="text-center py-4"
                      >
                        No se encontraron clientes.
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