import { useContext, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import AppContext from "../context/AppContext";

function Servicios() {
  const { servicios, setServicios } = useContext(AppContext);

  const [nombre, setNombre] = useState("");
  const [duracion, setDuracion] = useState("");
  const [precio, setPrecio] = useState("");

  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  const limpiarFormulario = () => {
    setNombre("");
    setDuracion("");
    setPrecio("");
    setModoEdicion(false);
    setIdEditar(null);
  };

  const agregarServicio = () => {
    if (!nombre || !duracion || !precio) {
      alert("Complete todos los campos");
      return;
    }

    const nuevoServicio = {
      id: Date.now(),
      nombre,
      duracion,
      precio,
    };

    setServicios([...servicios, nuevoServicio]);
    limpiarFormulario();
  };

  const editarServicio = (servicio) => {
    setNombre(servicio.nombre);
    setDuracion(servicio.duracion);
    setPrecio(servicio.precio);
    setModoEdicion(true);
    setIdEditar(servicio.id);
  };

  const actualizarServicio = () => {
    if (!nombre || !duracion || !precio) {
      alert("Complete todos los campos");
      return;
    }

    const serviciosActualizados = servicios.map((servicio) =>
      servicio.id === idEditar
        ? {
            ...servicio,
            nombre,
            duracion,
            precio,
          }
        : servicio
    );

    setServicios(serviciosActualizados);
    limpiarFormulario();
  };

  const eliminarServicio = (id) => {
    if (window.confirm("¿Eliminar este servicio?")) {
      setServicios(
        servicios.filter((servicio) => servicio.id !== id)
      );
    }
  };

  return (
    <DashboardLayout>
      <h2 className="mb-4">💆 Gestión de Servicios</h2>

      <div className="card shadow p-4 mb-4">

        <h4 className="mb-3">
          {modoEdicion ? "Editar Servicio" : "Nuevo Servicio"}
        </h4>

        <div className="row g-3">

          <div className="col-md-4">
            <label className="form-label">Nombre</label>

            <input
              className="form-control"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">
              Duración (minutos)
            </label>

            <input
              type="number"
              className="form-control"
              value={duracion}
              onChange={(e) => setDuracion(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Precio</label>

            <input
              type="number"
              className="form-control"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            />
          </div>

        </div>

        <div className="mt-4">

          {modoEdicion ? (
            <>
              <button
                className="btn btn-warning me-2"
                onClick={actualizarServicio}
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
              onClick={agregarServicio}
            >
              Agregar Servicio
            </button>
          )}

        </div>

      </div>

      <table className="table table-striped table-hover shadow">

        <thead className="table-dark">

          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Duración</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>

        </thead>

        <tbody>

          {servicios.map((servicio) => (

            <tr key={servicio.id}>

              <td>{servicio.id}</td>

              <td>{servicio.nombre}</td>

              <td>{servicio.duracion} min</td>

              <td>
                ${Number(servicio.precio).toLocaleString()}
              </td>

              <td>

                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => editarServicio(servicio)}
                >
                  Editar
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => eliminarServicio(servicio.id)}
                >
                  Eliminar
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </DashboardLayout>
  );
}

export default Servicios;