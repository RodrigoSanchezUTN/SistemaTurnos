import { useContext } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import AppContext from "../context/AppContext";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function Estadisticas() {
  const { clientes, servicios, turnos } = useContext(AppContext);

  const confirmados = turnos.filter(
    (t) => t.estado === "Confirmado"
  ).length;

  const pendientes = turnos.filter(
    (t) => t.estado === "Pendiente"
  ).length;

  const cancelados = turnos.filter(
    (t) => t.estado === "Cancelado"
  ).length;

  const barras = {
    labels: ["Clientes", "Servicios", "Turnos"],
    datasets: [
      {
        label: "Cantidad",
        data: [
          clientes.length,
          servicios.length,
          turnos.length,
        ],
        backgroundColor: [
          "#2563eb",
          "#9333ea",
          "#16a34a",
        ],
      },
    ],
  };

  const circular = {
    labels: [
      "Confirmados",
      "Pendientes",
      "Cancelados",
    ],
    datasets: [
      {
        data: [
          confirmados,
          pendientes,
          cancelados,
        ],
        backgroundColor: [
          "#22c55e",
          "#facc15",
          "#ef4444",
        ],
      },
    ],
  };

  return (
    <DashboardLayout>

      <h2 className="mb-4">
        📊 Estadísticas
      </h2>

      <div className="row">

        <div className="col-lg-7">

          <div className="card shadow p-4">

            <h5 className="mb-4">
              Resumen del Sistema
            </h5>

            <Bar data={barras} />

          </div>

        </div>

        <div className="col-lg-5">

          <div className="card shadow p-4">

            <h5 className="mb-4">
              Estado de Turnos
            </h5>

            <Doughnut data={circular} />

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Estadisticas;