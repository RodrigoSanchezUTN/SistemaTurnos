import { useContext } from "react";

import {
  FaChartBar,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaSpa,
} from "react-icons/fa";

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
  const { clientes, servicios, turnos } =
    useContext(AppContext);

  const confirmados = turnos.filter(
    (t) => t.estado === "Confirmado"
  ).length;

  const pendientes = turnos.filter(
    (t) => t.estado === "Pendiente"
  ).length;

  const cancelados = turnos.filter(
    (t) => t.estado === "Cancelado"
  ).length;

  // ============================
  // INGRESOS TOTALES
  // ============================

  const ingresosTotales = turnos.reduce(
    (total, turno) => {
      const servicioEncontrado =
        servicios.find(
          (servicio) =>
            servicio.nombre === turno.servicio
        );

      return (
        total +
        (servicioEncontrado
          ? Number(servicioEncontrado.precio)
          : 0)
      );
    },
    0
  );

  // ============================
  // TURNOS DEL MES ACTUAL
  // ============================

  const fechaActual = new Date();

  const mesActual = fechaActual.getMonth();
  const añoActual = fechaActual.getFullYear();

  const turnosDelMes = turnos.filter((turno) => {
    const fechaTurno = new Date(
      `${turno.fecha}T00:00:00`
    );

    return (
      fechaTurno.getMonth() === mesActual &&
      fechaTurno.getFullYear() === añoActual
    );
  });

  // ============================
  // SERVICIOS MÁS SOLICITADOS
  // ============================

  const cantidadPorServicio = {};

  turnos.forEach((turno) => {
    if (!cantidadPorServicio[turno.servicio]) {
      cantidadPorServicio[turno.servicio] = 0;
    }

    cantidadPorServicio[turno.servicio]++;
  });

  const serviciosOrdenados = Object.entries(
    cantidadPorServicio
  ).sort((a, b) => b[1] - a[1]);

  const serviciosLabels =
    serviciosOrdenados.map(
      ([nombre]) => nombre
    );

  const serviciosData =
    serviciosOrdenados.map(
      ([, cantidad]) => cantidad
    );

  const serviciosChart = {
    labels: serviciosLabels,

    datasets: [
      {
        label: "Cantidad de turnos",

        data: serviciosData,

        backgroundColor: "#9333ea",
      },
    ],
  };

  // ============================
  // GRÁFICO DE BARRAS
  // ============================

  const barras = {
    labels: [
      "Clientes",
      "Servicios",
      "Turnos",
    ],

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

  // ============================
  // GRÁFICO CIRCULAR
  // ============================

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

      {/* TÍTULO */}

      <h2 className="mb-4 d-flex align-items-center">
        <FaChartBar className="me-2" />
        Estadísticas
      </h2>

      {/* RESUMEN */}

      <div className="row g-4 mb-4">

        <div className="col-md-6">

          <div className="card shadow border-0 rounded-4 p-4">

            <h5 className="text-muted d-flex align-items-center">

              <FaMoneyBillWave className="me-2" />

              Ingresos totales

            </h5>

            <h2 className="fw-bold mt-3">
              ${ingresosTotales.toLocaleString()}
            </h2>

          </div>

        </div>

        <div className="col-md-6">

          <div className="card shadow border-0 rounded-4 p-4">

            <h5 className="text-muted d-flex align-items-center">

              <FaCalendarAlt className="me-2" />

              Turnos del mes

            </h5>

            <h2 className="fw-bold mt-3">
              {turnosDelMes.length}
            </h2>

          </div>

        </div>

      </div>

      {/* GRÁFICOS PRINCIPALES */}

      <div className="row g-4">

        <div className="col-lg-7">

          <div className="card shadow border-0 rounded-4 p-4">

            <h5 className="mb-4">
              Resumen del Sistema
            </h5>

            <Bar data={barras} />

          </div>

        </div>

        <div className="col-lg-5">

          <div className="card shadow border-0 rounded-4 p-4">

            <h5 className="mb-4">
              Estado de Turnos
            </h5>

            <Doughnut data={circular} />

          </div>

        </div>

      </div>

      {/* SERVICIOS MÁS SOLICITADOS */}

      <div className="row mt-4">

        <div className="col-12">

          <div className="card shadow border-0 rounded-4 p-4">

            <h5 className="mb-4 d-flex align-items-center">

              <FaSpa className="me-2" />

              Servicios más solicitados

            </h5>

            {serviciosOrdenados.length === 0 ? (

              <p className="text-muted">
                Todavía no hay turnos registrados.
              </p>

            ) : (

              <Bar
                data={serviciosChart}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: true,
                    },
                  },
                }}
              />

            )}

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Estadisticas;