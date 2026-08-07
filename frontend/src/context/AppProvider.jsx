import { useEffect, useState } from "react";
import AppContext from "./AppContext";

function AppProvider({ children }) {

  // ==========================
  // CLIENTES
  // ==========================

  const [clientes, setClientes] = useState(() => {
    const datos = localStorage.getItem("clientes");

    return datos
      ? JSON.parse(datos)
      : [
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
        ];
  });

  // ==========================
  // SERVICIOS
  // ==========================

  const [servicios, setServicios] = useState(() => {
    const datos = localStorage.getItem("servicios");

    return datos
      ? JSON.parse(datos)
      : [
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
        ];
  });

  // ==========================
  // TURNOS
  // ==========================

  const [turnos, setTurnos] = useState(() => {
    const datos = localStorage.getItem("turnos");

    return datos ? JSON.parse(datos) : [];
  });

  // ==========================
  // GUARDAR EN LOCALSTORAGE
  // ==========================

  useEffect(() => {
    localStorage.setItem(
      "clientes",
      JSON.stringify(clientes)
    );
  }, [clientes]);

  useEffect(() => {
    localStorage.setItem(
      "servicios",
      JSON.stringify(servicios)
    );
  }, [servicios]);

  useEffect(() => {
    localStorage.setItem(
      "turnos",
      JSON.stringify(turnos)
    );
  }, [turnos]);

  // ==========================
  // CONTEXT
  // ==========================

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