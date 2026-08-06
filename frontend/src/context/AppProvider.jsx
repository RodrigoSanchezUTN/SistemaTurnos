import { useState } from "react";
import AppContext from "./AppContext";

function AppProvider({ children }) {

  const [clientes, setClientes] = useState([
    {
      id: 1,
      nombre: "Juan Pérez",
      telefono: "2604123456",
      email: "juan@gmail.com",
    },
    {
      id: 2,
      nombre: "María Gómez",
      telefono: "2604555555",
      email: "maria@gmail.com",
    },
  ]);

  const [servicios, setServicios] = useState([
    {
      id: 1,
      nombre: "Masaje Relajante",
      duracion: 60,
      precio: 18000,
    },
    {
      id: 2,
      nombre: "Drenaje Linfático",
      duracion: 45,
      precio: 22000,
    },
  ]);

  const [turnos, setTurnos] = useState([]);

  return (
    <AppContext.Provider
      value={{
        clientes,
        setClientes,
        servicios,
        setServicios,
        turnos,
        setTurnos,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;