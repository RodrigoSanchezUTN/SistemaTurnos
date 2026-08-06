import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

function Servicios() {
  const [servicios, setServicios] = useState([
    {
      id: 1,
      nombre: "Masaje Relajante",
      duracion: 60,
      precio: 18000,
    },
    {
      id: 2,
      nombre: "Drenaje Linfático",
      duracion: 45,
      precio: 22000,
    },
  ]);

  const [nombre, setNombre] = useState("");
  const [duracion, setDuracion] = useState("");
  const [precio, setPrecio] = useState("");

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

    setNombre("");
    setDuracion("");
    setPrecio("");
  };

  const eliminarServicio = (id) => {
    if (window.confirm("¿Eliminar este servicio?")) {
      setServicios(servicios.filter((servicio) => servicio.id !== id));
    }
  };

  return (
    <DashboardLayout>

      <h2 className="mb-4">💆 Gestión de Servicios</h2>

      <div className="card shadow p-4 mb-4">

        <h4>Nuevo Servicio</h4>

        <div className="row mt-3">

          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <input
              type="number"
              className="form-control"
              placeholder="Duración (min)"
              value={duracion}
              onChange={(e) => setDuracion(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <input
              type="number"
              className="form-control"
              placeholder="Precio"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            />
          </div>

        </div>

        <button
          className="btn btn-success mt-3"
          onClick={agregarServicio}
        >
          Agregar Servicio
        </button>

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

              <td>${Number(servicio.precio).toLocaleString()}</td>

              <td>

                <button className="btn btn-warning btn-sm me-2">
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