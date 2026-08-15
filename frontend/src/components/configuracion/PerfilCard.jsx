import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";

import UsuarioContext from "../../context/UsuarioContext";

function PerfilCard() {
  const {
    usuario,
    setUsuario,
  } = useContext(UsuarioContext);

  const [telefono, setTelefono] =
    useState(usuario?.telefono || "");

  const handleTelefonoChange = (e) => {
    setTelefono(e.target.value);
  };

  const guardarPerfil = () => {
    const nombre =
      usuario?.nombre?.trim() || "";

    const email =
      usuario?.email?.trim() || "";

    if (!nombre) {
      toast.error(
        "Ingresá tu nombre."
      );
      return;
    }

    if (!email) {
      toast.error(
        "Ingresá tu email."
      );
      return;
    }

    const emailValido =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
      );

    if (!emailValido) {
      toast.error(
        "Ingresá un email válido."
      );
      return;
    }

    if (!telefono.trim()) {
      toast.error(
        "Ingresá tu teléfono."
      );
      return;
    }

    setUsuario({
      ...usuario,
      nombre,
      email,
      telefono: telefono.trim(),
    });

    toast.success(
      "Perfil actualizado correctamente"
    );
  };

  return (
    <div className="card shadow border-0 rounded-4 p-4 h-100">

      <h4 className="fw-bold mb-4 d-flex align-items-center">
        <FaUser className="me-2" />
        Perfil
      </h4>

      {/* NOMBRE */}

      <div className="mb-3">

        <label className="form-label">
          Nombre
        </label>

        <input
          type="text"
          className="form-control"
          value={usuario?.nombre || ""}
          onChange={(e) =>
            setUsuario({
              ...usuario,
              nombre: e.target.value,
            })
          }
        />

      </div>

      {/* EMAIL */}

      <div className="mb-3">

        <label className="form-label">
          Email
        </label>

        <input
          type="email"
          className="form-control"
          value={usuario?.email || ""}
          onChange={(e) =>
            setUsuario({
              ...usuario,
              email: e.target.value,
            })
          }
        />

      </div>

      {/* TELÉFONO */}

      <div className="mb-4">

        <label className="form-label">
          Teléfono
        </label>

        <input
          type="text"
          className="form-control"
          value={telefono}
          onChange={handleTelefonoChange}
        />

      </div>

      {/* GUARDAR */}

      <button
        type="button"
        className="btn btn-primary"
        onClick={guardarPerfil}
      >
        Guardar cambios
      </button>

    </div>
  );
}

export default PerfilCard;