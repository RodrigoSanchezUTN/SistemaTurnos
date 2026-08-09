import { useContext } from "react";
import { FaClock, FaSave } from "react-icons/fa";
import { toast } from "react-toastify";

import AppContext from "../../context/AppContext";

function HorariosCard() {
  const { horarios, setHorarios } =
    useContext(AppContext);

  const cambiarHorario = (
    dia,
    campo,
    valor
  ) => {
    setHorarios({
      ...horarios,
      [dia]: {
        ...horarios[dia],
        [campo]: valor,
      },
    });
  };

  const cambiarEstado = (dia) => {
    setHorarios({
      ...horarios,
      [dia]: {
        ...horarios[dia],
        activo: !horarios[dia].activo,
      },
    });
  };

  const guardarHorarios = () => {
    toast.success(
      "Horarios actualizados correctamente."
    );
  };

  const dias = [
    {
      id: "lunes",
      nombre: "Lunes",
    },
    {
      id: "martes",
      nombre: "Martes",
    },
    {
      id: "miercoles",
      nombre: "Miércoles",
    },
    {
      id: "jueves",
      nombre: "Jueves",
    },
    {
      id: "viernes",
      nombre: "Viernes",
    },
    {
      id: "sabado",
      nombre: "Sábado",
    },
    {
      id: "domingo",
      nombre: "Domingo",
    },
  ];

  return (
    <div className="card shadow border-0 rounded-4 p-4 h-100">

      <h4 className="fw-bold mb-2 d-flex align-items-center">
        <FaClock className="me-2" />
        Horarios de atención
      </h4>

      <p className="text-muted mb-4">
        Configurá los días y horarios en los que
        tu negocio está disponible.
      </p>

      {dias.map((dia) => {
        const configuracion =
          horarios[dia.id];

        return (
          <div
            key={dia.id}
            className="border rounded-4 p-3 mb-3"
          >

            <div className="d-flex justify-content-between align-items-center mb-3">

              <strong>
                {dia.nombre}
              </strong>

              <button
                type="button"
                className={`btn btn-sm ${
                  configuracion.activo
                    ? "btn-success"
                    : "btn-outline-secondary"
                }`}
                onClick={() =>
                  cambiarEstado(dia.id)
                }
              >
                {configuracion.activo
                  ? "Abierto"
                  : "Cerrado"}
              </button>

            </div>

            {configuracion.activo && (
              <>
                <div className="row g-2">

                  <div className="col-6">
                    <label className="form-label small text-muted">
                      Apertura
                    </label>

                    <input
                      type="time"
                      className="form-control"
                      value={
                        configuracion.inicio
                      }
                      onChange={(e) =>
                        cambiarHorario(
                          dia.id,
                          "inicio",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className="col-6">
                    <label className="form-label small text-muted">
                      Cierre
                    </label>

                    <input
                      type="time"
                      className="form-control"
                      value={
                        configuracion.fin
                      }
                      onChange={(e) =>
                        cambiarHorario(
                          dia.id,
                          "fin",
                          e.target.value
                        )
                      }
                    />
                  </div>

                </div>

                <div className="row g-2 mt-1">

                  <div className="col-6">
                    <label className="form-label small text-muted">
                      Segunda apertura
                    </label>

                    <input
                      type="time"
                      className="form-control"
                      value={
                        configuracion.inicio2
                      }
                      onChange={(e) =>
                        cambiarHorario(
                          dia.id,
                          "inicio2",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className="col-6">
                    <label className="form-label small text-muted">
                      Segundo cierre
                    </label>

                    <input
                      type="time"
                      className="form-control"
                      value={
                        configuracion.fin2
                      }
                      onChange={(e) =>
                        cambiarHorario(
                          dia.id,
                          "fin2",
                          e.target.value
                        )
                      }
                    />
                  </div>

                </div>
              </>
            )}

          </div>
        );
      })}

      <button
        type="button"
        className="btn btn-primary w-100 mt-2"
        onClick={guardarHorarios}
      >
        <FaSave className="me-2" />
        Guardar horarios
      </button>

    </div>
  );
}

export default HorariosCard;