import {
  useCallback,
  useEffect,
  useState,
} from "react";

import AppContext from "./AppContext";

import {
  obtenerClientes,
  obtenerServicios,
  obtenerTurnos,
  obtenerHorarios,
  guardarHorarios,
} from "../services/api";

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

  const [clientes, setClientes] = useState([]);

  // ==========================
  // SERVICIOS
  // ==========================

  const [servicios, setServicios] = useState([]);

  // ==========================
  // TURNOS
  // ==========================

  const [turnos, setTurnos] = useState([]);

  // ==========================
  // CARGANDO DATOS
  // ==========================

  const [cargandoDatos, setCargandoDatos] =
    useState(false);

  // ==========================
  // HORARIOS
  // ==========================

  const [horarios, setHorarios] =
    useState(horariosPorDefecto);

  // ==========================
  // CONVERTIR HORARIOS
  // ==========================

  const convertirHorarios = (
    horariosBackend
  ) => {
    const resultado = {
      ...horariosPorDefecto,
    };

    if (!Array.isArray(horariosBackend)) {
      return resultado;
    }

    horariosBackend.forEach((horario) => {
      if (!horario?.dia) {
        return;
      }

      resultado[horario.dia] = {
        activo: Boolean(horario.activo),
        inicio: horario.inicio || "",
        fin: horario.fin || "",
        inicio2: horario.inicio2 || "",
        fin2: horario.fin2 || "",
      };
    });

    return resultado;
  };

  // ==========================
  // OBTENER TOKEN
  // ==========================

  const obtenerToken = () => {
    return (
      localStorage.getItem("token") ||
      sessionStorage.getItem("token")
    );
  };

  // ==========================
  // CARGAR DATOS DEL BACKEND
  // ==========================

  const cargarDatosBackend =
    useCallback(async () => {
      const token = obtenerToken();

      if (!token) {
        setClientes([]);
        setServicios([]);
        setTurnos([]);
        setHorarios(horariosPorDefecto);

        return;
      }

      try {
        setCargandoDatos(true);

        /*
         * Usamos Promise.allSettled para que si un usuario
         * normal recibe 403 en /clientes, eso NO impida
         * cargar servicios, turnos y horarios.
         */

        const resultados =
          await Promise.allSettled([
            obtenerClientes(token),
            obtenerServicios(token),
            obtenerTurnos(token),
            obtenerHorarios(token),
          ]);

        // ==========================
        // CLIENTES
        // ==========================

        if (
          resultados[0].status ===
          "fulfilled"
        ) {
          setClientes(
            Array.isArray(
              resultados[0].value
            )
              ? resultados[0].value
              : []
          );
        } else {
          console.warn(
            "No se pudieron cargar los clientes:",
            resultados[0].reason
          );

          setClientes([]);
        }

        // ==========================
        // SERVICIOS
        // ==========================

        if (
          resultados[1].status ===
          "fulfilled"
        ) {
          setServicios(
            Array.isArray(
              resultados[1].value
            )
              ? resultados[1].value
              : []
          );
        } else {
          console.error(
            "No se pudieron cargar los servicios:",
            resultados[1].reason
          );

          setServicios([]);
        }

        // ==========================
        // TURNOS
        // ==========================

        if (
          resultados[2].status ===
          "fulfilled"
        ) {
          setTurnos(
            Array.isArray(
              resultados[2].value
            )
              ? resultados[2].value
              : []
          );
        } else {
          console.error(
            "No se pudieron cargar los turnos:",
            resultados[2].reason
          );

          setTurnos([]);
        }

        // ==========================
        // HORARIOS
        // ==========================

        if (
          resultados[3].status ===
          "fulfilled"
        ) {
          setHorarios(
            convertirHorarios(
              resultados[3].value
            )
          );
        } else {
          console.error(
            "No se pudieron cargar los horarios:",
            resultados[3].reason
          );

          setHorarios(
            horariosPorDefecto
          );
        }

      } catch (error) {
        console.error(
          "Error inesperado al cargar datos:",
          error
        );

      } finally {
        setCargandoDatos(false);
      }
    }, []);

  // ==========================
  // GUARDAR HORARIOS
  // ==========================

  const guardarHorariosBackend =
    useCallback(
      async (nuevosHorarios) => {
        const token =
          obtenerToken();

        if (!token) {
          throw new Error(
            "No hay una sesión iniciada."
          );
        }

        const respuesta =
          await guardarHorarios(
            token,
            nuevosHorarios
          );

        setHorarios(
          convertirHorarios(
            respuesta.horarios
          )
        );

        return respuesta;
      },
      []
    );

  // ==========================
  // ESCUCHAR CAMBIOS DE SESIÓN
  // ==========================

  useEffect(() => {
    const actualizarDatos = () => {
      cargarDatosBackend();
    };

    /*
     * Cargar datos al iniciar la aplicación.
     *
     * El pequeño retraso evita el warning de ESLint
     * relacionado con actualizaciones de estado dentro
     * del efecto.
     */

    const temporizador =
      setTimeout(() => {
        cargarDatosBackend();
      }, 0);

    window.addEventListener(
      "auth-changed",
      actualizarDatos
    );

    return () => {
      clearTimeout(temporizador);

      window.removeEventListener(
        "auth-changed",
        actualizarDatos
      );
    };
  }, [cargarDatosBackend]);

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

        guardarHorariosBackend,

        cargandoDatos,
        cargarDatosBackend,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;