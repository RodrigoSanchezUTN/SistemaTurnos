import { useContext, useState } from "react";
import "../styles/calendario.css";
import DashboardLayout from "../layouts/DashboardLayout";

import CalendarHeader from "../components/CalendarHeader";
import CalendarGrid from "../components/CalendarGrid";

import AppContext from "../context/AppContext";

function Calendario() {
  const { turnos } = useContext(AppContext);

  const hoy = new Date();

  const [mesActual, setMesActual] = useState(hoy.getMonth());
  const [añoActual, setAñoActual] = useState(hoy.getFullYear());

  const cambiarMes = (direccion) => {
    let nuevoMes = mesActual + direccion;
    let nuevoAño = añoActual;

    if (nuevoMes > 11) {
      nuevoMes = 0;
      nuevoAño++;
    }

    if (nuevoMes < 0) {
      nuevoMes = 11;
      nuevoAño--;
    }

    setMesActual(nuevoMes);
    setAñoActual(nuevoAño);
  };

  return (
    <DashboardLayout>
      <div className="container-fluid">

        <CalendarHeader
          mesActual={mesActual}
          añoActual={añoActual}
          cambiarMes={cambiarMes}
        />

        <div className="row">

          <div className="col-lg-9">

            <CalendarGrid
              mesActual={mesActual}
              añoActual={añoActual}
              turnos={turnos}
            />

          </div>

          <div className="col-lg-3">

            <div className="card shadow rounded-4 border-0 p-4">

              <h4 className="fw-bold mb-3">
                Próximamente
              </h4>

              <p className="text-muted mb-0">
                Aquí aparecerán:
              </p>

              <ul className="mt-3">
                <li>📅 Turnos de hoy</li>
                <li>⏰ Próximos turnos</li>
                <li>📊 Resumen mensual</li>
              </ul>

            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default Calendario;