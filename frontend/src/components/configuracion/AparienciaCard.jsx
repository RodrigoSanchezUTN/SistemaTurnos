import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function AparienciaCard() {
  const [tema, setTema] = useState(
    localStorage.getItem("tema") || "claro"
  );

  useEffect(() => {
    document.body.classList.toggle(
      "dark-mode",
      tema === "oscuro"
    );
  }, [tema]);

  const guardarTema = () => {
    localStorage.setItem("tema", tema);

    document.body.classList.toggle(
      "dark-mode",
      tema === "oscuro"
    );

    toast.success("Preferencias guardadas");
  };

  return (
    <div className="card shadow border-0 rounded-4 p-4 h-100">
      <h4 className="fw-bold mb-4">
        🎨 Apariencia
      </h4>

      <div className="mb-3">
        <label className="form-label">
          Tema
        </label>

        <select
          className="form-select"
          value={tema}
          onChange={(e) => setTema(e.target.value)}
        >
          <option value="claro">
            Claro
          </option>

          <option value="oscuro">
            Oscuro
          </option>
        </select>
      </div>

      <button
        className="btn btn-primary"
        onClick={guardarTema}
      >
        Guardar preferencias
      </button>
    </div>
  );
}

export default AparienciaCard;