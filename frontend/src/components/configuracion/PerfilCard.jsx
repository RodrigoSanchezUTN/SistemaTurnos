import { useState } from "react";
import { toast } from "react-toastify";

function PerfilCard() {
  const [perfil, setPerfil] = useState(() => {
    const datos = localStorage.getItem("perfil");

    return datos
      ? JSON.parse(datos)
      : {
          nombre: "",
          email: "",
          telefono: "",
        };
  });

  const handleChange = (e) => {
    setPerfil({
      ...perfil,
      [e.target.name]: e.target.value,
    });
  };

  const guardarPerfil = () => {
    if (!perfil.nombre.trim()) {
      toast.error("Ingresá tu nombre.");
      return;
    }

    if (!perfil.email.trim()) {
      toast.error("Ingresá tu email.");
      return;
    }

    const emailValido =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(perfil.email);

    if (!emailValido) {
      toast.error("Ingresá un email válido.");
      return;
    }

    if (!perfil.telefono.trim()) {
      toast.error("Ingresá tu teléfono.");
      return;
    }

    localStorage.setItem(
      "perfil",
      JSON.stringify(perfil)
    );

    toast.success(
      "Perfil actualizado correctamente"
    );
  };

  return (
    <div className="card shadow border-0 rounded-4 p-4 h-100">

      <h4 className="fw-bold mb-4">
        👤 Perfil
      </h4>

      <div className="mb-3">

        <label className="form-label">
          Nombre
        </label>

        <input
          type="text"
          className="form-control"
          name="nombre"
          value={perfil.nombre}
          onChange={handleChange}
        />

      </div>

      <div className="mb-3">

        <label className="form-label">
          Email
        </label>

        <input
          type="email"
          className="form-control"
          name="email"
          value={perfil.email}
          onChange={handleChange}
        />

      </div>

      <div className="mb-4">

        <label className="form-label">
          Teléfono
        </label>

        <input
          type="text"
          className="form-control"
          name="telefono"
          value={perfil.telefono}
          onChange={handleChange}
        />

      </div>

      <button
        className="btn btn-primary"
        onClick={guardarPerfil}
      >
        Guardar cambios
      </button>

    </div>
  );
}

export default PerfilCard;