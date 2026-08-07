import { useState } from "react";
import { toast } from "react-toastify";

function NegocioCard() {
 const [negocio, setNegocio] = useState(() => {
  const datos = localStorage.getItem("negocio");

  return datos
    ? JSON.parse(datos)
    : {
        nombre: "",
        direccion: "",
        whatsapp: "",
        instagram: "",
        horario: "",
      };
});

  const handleChange = (e) => {
    setNegocio({
      ...negocio,
      [e.target.name]: e.target.value,
    });
  };

  const guardarNegocio = () => {
    localStorage.setItem("negocio", JSON.stringify(negocio));
    toast.success("Datos del negocio actualizados");
  };

  return (
    <div className="card shadow border-0 rounded-4 p-4 mb-4">

      <h4 className="fw-bold mb-4">
        💼 Negocio
      </h4>

      <div className="mb-3">
        <label className="form-label">Nombre del negocio</label>

        <input
          type="text"
          className="form-control"
          name="nombre"
          value={negocio.nombre}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Dirección</label>

        <input
          type="text"
          className="form-control"
          name="direccion"
          value={negocio.direccion}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">WhatsApp</label>

        <input
          type="text"
          className="form-control"
          name="whatsapp"
          value={negocio.whatsapp}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Instagram</label>

        <input
          type="text"
          className="form-control"
          name="instagram"
          value={negocio.instagram}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="form-label">Horario de atención</label>

        <input
          type="text"
          className="form-control"
          name="horario"
          value={negocio.horario}
          onChange={handleChange}
          placeholder="Ej: Lunes a Viernes de 9:00 a 18:00"
        />
      </div>

      <button
        className="btn btn-primary"
        onClick={guardarNegocio}
      >
        Guardar datos
      </button>

    </div>
  );
}

export default NegocioCard;