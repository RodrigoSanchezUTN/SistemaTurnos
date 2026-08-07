import { useContext, useState } from "react";
import { toast } from "react-toastify";
import DashboardLayout from "../layouts/DashboardLayout";
import Swal from "sweetalert2";
import AppContext from "../context/AppContext";

function Turnos() {
  const { clientes, servicios, turnos, setTurnos } =
    useContext(AppContext);

  const [cliente, setCliente] = useState("");
  const [servicio, setServicio] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [estado, setEstado] = useState("Pendiente");
  const [busqueda, setBusqueda] = useState("");

  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  const limpiarFormulario = () => {
    setCliente("");
    setServicio("");
    setFecha("");
    setHora("");
    setEstado("Pendiente");
    setModoEdicion(false);
    setIdEditar(null);
  };

  const agregarTurno = () => {
    if (!cliente || !servicio || !fecha || !hora) {
      toast.error("Complete todos los campos");
      return;
    }

    const existe = turnos.some(
      (t) =>
        t.fecha === fecha &&
        t.hora === hora &&
        (!modoEdicion || t.id !== idEditar)
    );

    if (existe) {
      toast.warning("Ese horario ya está ocupado");
      return;
    }

    if (modoEdicion) {
      const turnosActualizados = turnos.map((turno) =>
        turno.id === idEditar
          ? {
              ...turno,
              cliente,
              servicio,
              fecha,
              hora,
              estado,
            }
          : turno
      );

      setTurnos(turnosActualizados);
      toast.info("Turno actualizado correctamente");
    } else {
      const nuevoTurno = {
        id: Date.now(),
        cliente,
        servicio,
        fecha,
        hora,
        estado,
      };

      setTurnos([...turnos, nuevoTurno]);
      toast.success("Turno agregado correctamente");
    }

    limpiarFormulario();
  };

  const editarTurno = (turno) => {
    setCliente(turno.cliente);
    setServicio(turno.servicio);
    setFecha(turno.fecha);
    setHora(turno.hora);
    setEstado(turno.estado);

    setModoEdicion(true);
    setIdEditar(turno.id);
  };

  const eliminarTurno = (id) => {
  Swal.fire({
    title: "¿Eliminar turno?",
    text: "Esta acción no se puede deshacer.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      setTurnos(turnos.filter((t) => t.id !== id));

      toast.success("Turno eliminado correctamente");
    }
  });
};
const turnosFiltrados = turnos.filter((turno) => {
  const texto = busqueda.toLowerCase();

  return (
    turno.cliente.toLowerCase().includes(texto) ||
    turno.servicio.toLowerCase().includes(texto) ||
    turno.fecha.includes(texto) ||
    turno.hora.includes(texto) ||
    turno.estado.toLowerCase().includes(texto)
  );
});
  return (
    <DashboardLayout>

      <h2 className="mb-4">📅 Gestión de Turnos</h2>

      <div className="card shadow p-4 mb-4">

        <h4 className="mb-3">
          {modoEdicion ? "Editar Turno" : "Nuevo Turno"}
        </h4>

        <div className="row g-3">

          <div className="col-md-4">

            <label className="form-label">
              Cliente
            </label>

            <select
              className="form-select"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
            >
              <option value="">Seleccione un cliente</option>

              {clientes.map((c) => (
                <option
                  key={c.id}
                  value={c.nombre}
                >
                  {c.nombre}
                </option>
              ))}
            </select>

          </div>

          <div className="col-md-4">

            <label className="form-label">
              Servicio
            </label>

            <select
              className="form-select"
              value={servicio}
              onChange={(e) => setServicio(e.target.value)}
            >
              <option value="">
                Seleccione un servicio
              </option>

              {servicios.map((s) => (
                <option
                  key={s.id}
                  value={s.nombre}
                >
                  {s.nombre}
                </option>
              ))}
            </select>

          </div>

          <div className="col-md-2">

            <label className="form-label">
              Fecha
            </label>

            <input
              type="date"
              className="form-control"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />

          </div>

          <div className="col-md-2">

            <label className="form-label">
              Hora
            </label>

            <input
              type="time"
              className="form-control"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
            />

          </div>

          <div className="col-md-4">

            <label className="form-label">
              Estado
            </label>

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

            {modoEdicion ? (
              <>
                <button
                  className="btn btn-warning me-2"
                  onClick={agregarTurno}
                >
                  Actualizar
                </button>

                <button
                  className="btn btn-secondary"
                  onClick={limpiarFormulario}
                >
                  Cancelar
                </button>
              </>
            ) : (
              <button
                className="btn btn-success"
                onClick={agregarTurno}
              >
                Agregar Turno
              </button>
            )}

          </div>

        </div>

      </div>
      <div className="mb-4">
  <input
    type="text"
    className="form-control"
    placeholder="🔍 Buscar por cliente, servicio, fecha, hora o estado..."
    value={busqueda}
    onChange={(e) => setBusqueda(e.target.value)}
  />
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

          {turnosFiltrados.length === 0 ? (

            <tr>
              <td colSpan="6" className="text-center">
                No hay turnos registrados.
              </td>
            </tr>

          ) : (

            turnosFiltrados.map((turno) => (

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

                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => editarTurno(turno)}
                  >
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

          )}

        </tbody>

      </table>

    </DashboardLayout>
  );
}

export default Turnos;