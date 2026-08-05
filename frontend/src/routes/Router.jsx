import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Clientes from "../pages/Clientes";
import Servicios from "../pages/Servicios";
import Turnos from "../pages/Turnos";
import Estadisticas from "../pages/Estadisticas";
import Configuracion from "../pages/Configuracion";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/turnos" element={<Turnos />} />
        <Route path="/estadisticas" element={<Estadisticas />} />
        <Route path="/configuracion" element={<Configuracion />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;