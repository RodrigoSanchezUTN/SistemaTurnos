import { useContext } from "react";
import AppContext from "../../context/AppContext";

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
  const {
    clientes,
    servicios,
  } = useContext(AppContext);

  return (
    <div className="modal-body">

      <div className="mb-3">
        <label className="form-label">
          Cliente
        </label>

        <select
          className="form-select"
          value={cliente}
          onChange={(e) =>
            setCliente(e.target.value)
          }
        >
          <option value="">
            Seleccionar cliente...
          </option>

          {clientes.map((clienteActual) => (
            <option
              key={clienteActual.id}
              value={clienteActual.id}
            >
              {clienteActual.nombre}{" "}
              {clienteActual.apellido}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">
          Servicio
        </label>

        <select
          className="form-select"
          value={servicio}
          onChange={(e) =>
            setServicio(e.target.value)
          }
        >
          <option value="">
            Seleccionar servicio...
          </option>

          {servicios.map((servicioActual) => (
            <option
              key={servicioActual.id}
              value={servicioActual.id}
            >
              {servicioActual.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="row">

        <div className="col">
          <label className="form-label">
            Fecha
          </label>

          <input
            type="date"
            className="form-control"
            value={fecha}
            onChange={(e) =>
              setFecha(e.target.value)
            }
          />
        </div>

        <div className="col">
          <label className="form-label">
            Hora
          </label>

          <input
            type="time"
            className="form-control"
            value={hora}
            onChange={(e) =>
              setHora(e.target.value)
            }
          />
        </div>

      </div>

      <div className="mt-3">

        <label className="form-label">
          Observaciones
        </label>

        <textarea
          className="form-control"
          rows="3"
          value={observaciones}
          onChange={(e) =>
            setObservaciones(
              e.target.value
            )
          }
          placeholder="Escribí alguna observación..."
        />

      </div>

    </div>
  );
}

export default AppointmentForm;