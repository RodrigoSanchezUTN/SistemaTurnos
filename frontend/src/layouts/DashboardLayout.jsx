import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function DashboardLayout({ children }) {
  return (
    <>
      <Navbar />

      <div className="d-flex">
        <Sidebar />

        <main
          className="container-fluid p-4"
          style={{
            backgroundColor: "#f8f9fa",
            minHeight: "100vh",
          }}
        >
          {children}
        </main>
      </div>
    </>
  );
}

export default DashboardLayout;