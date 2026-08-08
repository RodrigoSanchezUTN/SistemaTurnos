import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { FaCog, FaDatabase } from "react-icons/fa";

import DashboardLayout from "../layouts/DashboardLayout";

import PerfilCard from "../components/configuracion/PerfilCard";
import NegocioCard from "../components/configuracion/NegocioCard";
import AparienciaCard from "../components/configuracion/AparienciaCard";

function Configuracion() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("seccion") === "perfil") {
      setTimeout(() => {
        document
          .getElementById("perfil")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 100);
    }
  }, [searchParams]);

  return (
    <DashboardLayout>

      <div className="container-fluid">

        {/* ENCABEZADO */}

        <div className="mb-5">

          <h2 className="fw-bold d-flex align-items-center">
            <FaCog className="me-2" />
            Configuración
          </h2>

          <p className="text-muted">
            Personaliza la información de tu perfil,
            negocio y preferencias del sistema.
          </p>

        </div>

        {/* CONFIGURACIONES */}

        <div className="row g-4">

          {/* PERFIL */}

          <div
            className="col-lg-6"
            id="perfil"
          >
            <PerfilCard />
          </div>

          {/* NEGOCIO */}

          <div className="col-lg-6">
            <NegocioCard />
          </div>

          {/* APARIENCIA */}

          <div className="col-lg-6">
            <AparienciaCard />
          </div>

          {/* DATOS */}

          <div className="col-lg-6">

            <div className="card shadow border-0 rounded-4 p-4 h-100">

              <h4 className="fw-bold mb-4 d-flex align-items-center">
                <FaDatabase className="me-2" />
                Datos
              </h4>

              <p className="text-muted">
                Próximamente podrás exportar e
                importar todos los datos del sistema.
              </p>

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Configuracion;