import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="d-flex">

        <Sidebar />

        <div className="container-fluid p-4">

          <h2 className="mb-4">
            Dashboard
          </h2>

          <div className="row">

            <div className="col-md-3 mb-3">
              <div className="card shadow">
                <div className="card-body text-center">
                  <h5>Clientes</h5>
                  <h2>125</h2>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card shadow">
                <div className="card-body text-center">
                  <h5>Turnos Hoy</h5>
                  <h2>18</h2>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card shadow">
                <div className="card-body text-center">
                  <h5>Ingresos</h5>
                  <h2>$185.000</h2>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card shadow">
                <div className="card-body text-center">
                  <h5>Servicios</h5>
                  <h2>54</h2>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Dashboard;