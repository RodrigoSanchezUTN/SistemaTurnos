function ClienteForm({
  nombre,
  setNombre,
  telefono,
  setTelefono,
  email,
  setEmail,
  modoEdicion,
  agregarCliente,
  actualizarCliente,
  limpiarFormulario,
}) {
  return (
    <div className="card shadow p-4 mb-4">
      <h4 className="mb-3">
        {modoEdicion ? "Editar Cliente" : "Nuevo Cliente"}
      </h4>

      <div className="row">
        <div className="col-md-4 mb-3">
          <input
            className="form-control"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="col-md-4 mb-3">
          <input
            className="form-control"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>

        <div className="col-md-4 mb-3">
          <input
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      {!modoEdicion ? (
        <button
          className="btn btn-success"
          onClick={agregarCliente}
        >
          Agregar Cliente
        </button>
      ) : (
        <>
          <button
            className="btn btn-primary me-2"
            onClick={actualizarCliente}
          >
            Actualizar Cliente
          </button>

          <button
            className="btn btn-secondary"
            onClick={limpiarFormulario}
          >
            Cancelar
          </button>
        </>
      )}
    </div>
  );
}

export default ClienteForm;