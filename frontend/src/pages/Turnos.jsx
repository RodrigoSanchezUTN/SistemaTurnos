import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import clientesData from "../data/clientes";
import serviciosData from "../data/servicios";

function Turnos() {
  const [turnos, setTurnos] = useState([
    {
      id: 1,
      cliente: "Juan Pérez",
      servicio: "Masaje Relajante",
      fecha: "2026-08-10",
      hora: "10:00",
      estado: "Pendiente",
    },
    {
      id: 2,
      cliente: "María Gómez",
      servicio: "Drenaje Linfático",
      fecha: "2026-08-10",
      hora: "11:30",
      estado: "Confirmado",
    },
  ]);

  const [cliente, setCliente] = useState("");
  const [servicio, setServicio] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [estado, setEstado] = useState("Pendiente");

  const [modoEdicion, setModoEdicion] = useState(false);
const [idEditar, setIdEditar] = useState(null);

  const agregarTurno = () => {
    if (!cliente || !servicio || !fecha || !hora) {
      alert("Complete todos los campos");
      return;
    }

    const existe = turnos.some(
      (t) => t.fecha === fecha && t.hora === hora
    );

    if (existe) {
      alert("Ya existe un turno en esa fecha y horario.");
      return;
    }

    const nuevoTurno = {
      id: Date.now(),
      cliente,
      servicio,
      fecha,
      hora,
      estado,
    };

    setTurnos([...turnos, nuevoTurno]);

    setCliente("");
    setServicio("");
    setFecha("");
    setHora("");
    setEstado("Pendiente");
  };

  const eliminarTurno = (id) => {
    if (window.confirm("¿Eliminar este turno?")) {
      setTurnos(turnos.filter((t) => t.id !== id));
    }
  };

  return (
    <DashboardLayout>
      <h2 className="mb-4">📅 Gestión de Turnos</h2>

      <div className="card shadow p-4 mb-4">
        <h4 className="mb-3">Nuevo Turno</h4>

        <div className="row g-3">

          <div className="col-md-4">
            <label className="form-label">Cliente</label>

            <select
              className="form-select"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
            >
              <option value="">Seleccione un cliente</option>

              {clientesData.map((c) => (
                <option key={c.id} value={c.nombre}>
                  {c.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">Servicio</label>

            <select
              className="form-select"
              value={servicio}
              onChange={(e) => setServicio(e.target.value)}
            >
              <option value="">Seleccione un servicio</option>

              {serviciosData.map((s) => (
                <option key={s.id} value={s.nombre}>
                  {s.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-2">
            <label className="form-label">Fecha</label>

            <input
              type="date"
              className="form-control"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>

          <div className="col-md-2">
            <label className="form-label">Hora</label>

            <input
              type="time"
              className="form-control"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Estado</label>

            <select
              className="form-select"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            >
              <option>Pendiente</option>
              <option>Confirmado</option>
              <option>Cancelado</option>
            </select>
          </div>

          <div className="col-md-8 d-flex align-items-end">
            <button
              className="btn btn-success"
              onClick={agregarTurno}
            >
              Agregar Turno
            </button>
          </div>

        </div>
      </div>

      <table className="table table-striped table-hover shadow">

        <thead className="table-dark">

          <tr>
            <th>Cliente</th>
            <th>Servicio</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>

        </thead>

        <tbody>

          {turnos.length > 0 ? (
            turnos.map((turno) => (
              <tr key={turno.id}>
                <td>{turno.cliente}</td>
                <td>{turno.servicio}</td>
                <td>{turno.fecha}</td>
                <td>{turno.hora}</td>
                <td>
                  <span
                    className={`badge ${
                      turno.estado === "Confirmado"
                        ? "bg-success"
                        : turno.estado === "Cancelado"
                        ? "bg-danger"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {turno.estado}
                  </span>
                </td>

                <td>
                  <button className="btn btn-warning btn-sm me-2">
                    Editar
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => eliminarTurno(turno.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No hay turnos registrados.
              </td>
            </tr>
          )}

        </tbody>

      </table>
    </DashboardLayout>
  );
}

export default Turnos;