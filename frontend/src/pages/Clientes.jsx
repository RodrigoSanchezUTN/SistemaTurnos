import { useState } from "react";

function Clientes() {
  const [clientes, setClientes] = useState([
    {
      id: 1,
      nombre: "Juan Pérez",
      telefono: "2604123456",
      email: "juan@gmail.com",
    },
    {
      id: 2,
      nombre: "María Gómez",
      telefono: "2604555555",
      email: "maria@gmail.com",
    },
  ]);

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [busqueda, setBusqueda] = useState("");

  const agregarCliente = () => {
    if (!nombre || !telefono || !email) {
      alert("Complete todos los campos");
      return;
    }

    const nuevoCliente = {
      id: Date.now(),
      nombre,
      telefono,
      email,
    };

    setClientes([...clientes, nuevoCliente]);

    setNombre("");
    setTelefono("");
    setEmail("");
  };

  const eliminarCliente = (id) => {
    const confirmar = window.confirm(
      "¿Está seguro de eliminar este cliente?"
    );

    if (!confirmar) return;

    setClientes(clientes.filter((cliente) => cliente.id !== id));
  };

  const clientesFiltrados = clientes.filter((cliente) =>
    cliente.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="container mt-5">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>👥 Clientes</h2>
      </div>

      <div className="card shadow p-4 mb-4">

        <h4 className="mb-3">Nuevo Cliente</h4>

        <div className="row">

          <div className="col-md-4 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="col-md-4 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </div>

          <div className="col-md-4 mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

        </div>

        <button
          className="btn btn-success"
          onClick={agregarCliente}
        >
          Agregar Cliente
        </button>

      </div>

      <input
        type="text"
        className="form-control mb-4"
        placeholder="🔍 Buscar cliente..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <table className="table table-striped table-hover shadow">

        <thead className="table-dark">

          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>

        </thead>

        <tbody>

          {clientesFiltrados.length > 0 ? (
            clientesFiltrados.map((cliente) => (

              <tr key={cliente.id}>

                <td>{cliente.id}</td>

                <td>{cliente.nombre}</td>

                <td>{cliente.telefono}</td>

                <td>{cliente.email}</td>

                <td>

                  <button
                    className="btn btn-warning btn-sm me-2"
                  >
                    Editar
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => eliminarCliente(cliente.id)}
                  >
                    Eliminar
                  </button>

                </td>

              </tr>

            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No se encontraron clientes.
              </td>
            </tr>
          )}

        </tbody>

      </table>

    </div>
  );
}

export default Clientes;