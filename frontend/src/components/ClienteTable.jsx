function ClienteTable({
  clientes,
  editarCliente,
  eliminarCliente,
}) {
  return (
    <table className="table table-hover table-striped shadow">
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
        {clientes.map((cliente) => (
          <tr key={cliente.id}>
            <td>{cliente.id}</td>
            <td>{cliente.nombre}</td>
            <td>{cliente.telefono}</td>
            <td>{cliente.email}</td>

            <td>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => editarCliente(cliente)}
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
        ))}
      </tbody>
    </table>
  );
}

export default ClienteTable;