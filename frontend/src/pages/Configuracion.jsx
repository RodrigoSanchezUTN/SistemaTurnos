import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

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

        <div className="mb-5">
          <h2 className="fw-bold">
            ⚙️ Configuración
          </h2>

          <p className="text-muted">
            Personaliza la información de tu perfil, negocio y preferencias del sistema.
          </p>
        </div>

        <div className="row g-4">

          <div
            className="col-lg-6"
            id="perfil"
          >
            <PerfilCard />
          </div>

          <div className="col-lg-6">
            <NegocioCard />
          </div>

          <div className="col-lg-6">
            <AparienciaCard />
          </div>

          <div className="col-lg-6">
            <div className="card shadow border-0 rounded-4 p-4 h-100">

              <h4 className="fw-bold mb-4">
                💾 Datos
              </h4>

              <p className="text-muted">
                Próximamente podrás exportar e importar todos los datos del sistema.
              </p>

            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default Configuracion;