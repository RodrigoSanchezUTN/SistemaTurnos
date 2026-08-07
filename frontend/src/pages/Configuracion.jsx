import DashboardLayout from "../layouts/DashboardLayout";

function Configuracion() {
  return (
    <DashboardLayout>

      <h2 className="mb-4">
        ⚙ Configuración
      </h2>

      <div className="card shadow p-5">

        <h4>
          Configuración del sistema
        </h4>

        <p className="text-muted">
          Próximamente podrás cambiar las preferencias del sistema.
        </p>

      </div>

    </DashboardLayout>
  );
}

export default Configuracion;