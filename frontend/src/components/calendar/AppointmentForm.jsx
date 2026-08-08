function AppointmentForm({
  cliente,
  setCliente,
  servicio,
  setServicio,
  fecha,
  setFecha,
  hora,
  setHora,
  observaciones,
  setObservaciones,
}) {
  return (
    <div className="modal-body">

      <div className="mb-3">
        <label>Cliente</label>

        <select
          className="form-select"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
        >
          <option value="">Seleccionar cliente...</option>
          <option>Juan Pérez</option>
          <option>María Gómez</option>
          <option>Pedro López</option>
        </select>
      </div>

      <div className="mb-3">
        <label>Servicio</label>

        <select
          className="form-select"
          value={servicio}
          onChange={(e) => setServicio(e.target.value)}
        >
          <option value="">Seleccionar servicio...</option>
          <option>Masaje relajante</option>
          <option>Masaje descontracturante</option>
          <option>Drenaje linfático</option>
        </select>
      </div>

      <div className="row">

        <div className="col">
          <label>Fecha</label>

          <input
            type="date"
            className="form-control"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>

        <div className="col">
          <label>Hora</label>

          <input
            type="time"
            className="form-control"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
          />
        </div>

      </div>

      <div className="mt-3">

        <label>Observaciones</label>

        <textarea
          className="form-control"
          rows="3"
          value={observaciones}
          onChange={(e) => setObservaciones(e.target.value)}
          placeholder="Escribí alguna observación..."
        />

      </div>

    </div>
  );
}

export default AppointmentForm;