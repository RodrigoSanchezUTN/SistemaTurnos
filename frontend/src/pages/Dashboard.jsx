import DashboardLayout from "../layouts/DashboardLayout";
import Card from "../components/Card";

function Dashboard() {
  return (
    <DashboardLayout>

      <h2 className="mb-4">Dashboard</h2>

      <div className="row">

        <Card
          titulo="Clientes"
          valor="125"
          color="primary"
        />

        <Card
          titulo="Turnos Hoy"
          valor="18"
          color="success"
        />

        <Card
          titulo="Ingresos"
          valor="$185.000"
          color="warning"
        />

        <Card
          titulo="Servicios"
          valor="54"
          color="danger"
        />

      </div>

    </DashboardLayout>
  );
}

export default Dashboard;