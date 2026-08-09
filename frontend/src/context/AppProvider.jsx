import { useEffect, useState } from "react";
import AppContext from "./AppContext";

const horariosPorDefecto = {
  lunes: {
    activo: true,
    inicio: "09:00",
    fin: "13:00",
    inicio2: "15:00",
    fin2: "20:00",
  },

  martes: {
    activo: true,
    inicio: "09:00",
    fin: "13:00",
    inicio2: "15:00",
    fin2: "20:00",
  },

  miercoles: {
    activo: true,
    inicio: "09:00",
    fin: "13:00",
    inicio2: "15:00",
    fin2: "20:00",
  },

  jueves: {
    activo: true,
    inicio: "09:00",
    fin: "13:00",
    inicio2: "15:00",
    fin2: "20:00",
  },

  viernes: {
    activo: true,
    inicio: "09:00",
    fin: "13:00",
    inicio2: "15:00",
    fin2: "20:00",
  },

  sabado: {
    activo: true,
    inicio: "09:00",
    fin: "13:00",
    inicio2: "",
    fin2: "",
  },

  domingo: {
    activo: false,
    inicio: "",
    fin: "",
    inicio2: "",
    fin2: "",
  },
};

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
  // HORARIOS
  // ==========================

  const [horarios, setHorarios] = useState(() => {
    const datos = localStorage.getItem("horarios");

    if (!datos) {
      return horariosPorDefecto;
    }

    try {
      const guardados = JSON.parse(datos);

      // Combina lo guardado con los horarios por defecto.
      // Así nunca desaparece un día por una configuración vieja.
      return {
        ...horariosPorDefecto,
        ...guardados,
      };
    } catch {
      return horariosPorDefecto;
    }
  });

  // ==========================
  // GUARDAR CLIENTES
  // ==========================

  useEffect(() => {
    localStorage.setItem(
      "clientes",
      JSON.stringify(clientes)
    );
  }, [clientes]);

  // ==========================
  // GUARDAR SERVICIOS
  // ==========================

  useEffect(() => {
    localStorage.setItem(
      "servicios",
      JSON.stringify(servicios)
    );
  }, [servicios]);

  // ==========================
  // GUARDAR TURNOS
  // ==========================

  useEffect(() => {
    localStorage.setItem(
      "turnos",
      JSON.stringify(turnos)
    );
  }, [turnos]);

  // ==========================
  // GUARDAR HORARIOS
  // ==========================

  useEffect(() => {
    localStorage.setItem(
      "horarios",
      JSON.stringify(horarios)
    );
  }, [horarios]);

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

        horarios,
        setHorarios,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;