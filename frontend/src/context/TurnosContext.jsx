import { createContext, useContext, useState } from "react";

const TurnosContext = createContext();

export function TurnosProvider({ children }) {

  const [turnos, setTurnos] = useState([
    {
      id: 1,
      cliente: "Juan Pérez",
      servicio: "Masaje relajante",
      fecha: "2026-08-10",
      hora: "10:00",
      estado: "Confirmado",
    },
    {
      id: 2,
      cliente: "María Gómez",
      servicio: "Drenaje linfático",
      fecha: "2026-08-11",
      hora: "11:30",
      estado: "Pendiente",
    },
  ]);

  const agregarTurno = (nuevoTurno) => {

    setTurnos((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...nuevoTurno,
      },
    ]);

  };

  const editarTurno = (id, datos) => {

    setTurnos((prev) =>
      prev.map((turno) =>
        turno.id === id
          ? { ...turno, ...datos }
          : turno
      )
    );

  };

  const eliminarTurno = (id) => {

    setTurnos((prev) =>
      prev.filter((turno) => turno.id !== id)
    );

  };

  return (

    <TurnosContext.Provider
      value={{
        turnos,
        agregarTurno,
        editarTurno,
        eliminarTurno,
      }}
    >
      {children}
    </TurnosContext.Provider>

  );

}

// eslint-disable-next-line react-refresh/only-export-components
export function useTurnos() {

  return useContext(TurnosContext);

}