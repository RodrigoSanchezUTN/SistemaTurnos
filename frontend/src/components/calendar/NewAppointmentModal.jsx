import { useState } from "react";

function NewAppointmentModal({ show, onClose }) {

  const [cliente, setCliente] = useState("");
  const [servicio, setServicio] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [observaciones, setObservaciones] = useState("");

  if (!show) return null;

  return (
    <div className="modal-overlay">

      <div className="appointment-modal">

        <div className="modal-header">

          <h3>Nuevo turno</h3>

          <button
            className="btn-close"
            onClick={onClose}
          >
            ✕
          </button>

        </div>

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

        <div className="modal-footer">

          <button
            className="btn btn-light"
            onClick={onClose}
          >
            Cancelar
          </button>

          <button className="btn btn-primary">
            Guardar turno
          </button>

        </div>

      </div>

    </div>
  );
}

export default NewAppointmentModal;