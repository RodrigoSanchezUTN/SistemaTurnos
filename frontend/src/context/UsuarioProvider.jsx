import {
  useEffect,
  useState,
} from "react";

import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase";

import UsuarioContext from "./UsuarioContext";

// ==========================
// OBTENER USUARIO GUARDADO
// ==========================

function obtenerUsuarioGuardado() {
  const usuarioLocal =
    localStorage.getItem("usuarioActual");

  if (usuarioLocal) {
    try {
      return JSON.parse(usuarioLocal);
    } catch (error) {
      console.error(
        "Error leyendo usuario local:",
        error
      );

      localStorage.removeItem(
        "usuarioActual"
      );
    }
  }

  const usuarioSesion =
    sessionStorage.getItem("usuarioActual");

  if (usuarioSesion) {
    try {
      return JSON.parse(usuarioSesion);
    } catch (error) {
      console.error(
        "Error leyendo usuario de sesión:",
        error
      );

      sessionStorage.removeItem(
        "usuarioActual"
      );
    }
  }

  return null;
}

// ==========================
// NORMALIZAR ROL
// ==========================

function normalizarRol(rol) {
  if (rol === "Administrador") {
    return "admin";
  }

  if (rol === "Usuario") {
    return "usuario";
  }

  if (rol === "Administrador".toLowerCase()) {
    return "admin";
  }

  if (rol === "Usuario".toLowerCase()) {
    return "usuario";
  }

  return rol;
}

function UsuarioProvider({ children }) {
  const [usuario, setUsuario] =
    useState(obtenerUsuarioGuardado);

  // ==========================
  // GUARDAR SESIÓN
  // ==========================

  useEffect(() => {
    if (!usuario) {
      localStorage.removeItem(
        "usuarioActual"
      );

      sessionStorage.removeItem(
        "usuarioActual"
      );

      return;
    }

    const usuarioNormalizado = {
      ...usuario,
      rol: normalizarRol(usuario.rol),
    };

    // Si existe token en localStorage,
    // significa que "Recordarme" está activo.
    const tokenLocal =
      localStorage.getItem("token");

    if (tokenLocal) {
      localStorage.setItem(
        "usuarioActual",
        JSON.stringify(
          usuarioNormalizado
        )
      );

      sessionStorage.removeItem(
        "usuarioActual"
      );

      return;
    }

    // Si no hay token local, la sesión
    // corresponde a sessionStorage.
    const tokenSesion =
      sessionStorage.getItem("token");

    if (tokenSesion) {
      sessionStorage.setItem(
        "usuarioActual",
        JSON.stringify(
          usuarioNormalizado
        )
      );

      localStorage.removeItem(
        "usuarioActual"
      );

      return;
    }

    // Si no existe ningún token,
    // no dejamos datos de sesión guardados.
    localStorage.removeItem(
      "usuarioActual"
    );

    sessionStorage.removeItem(
      "usuarioActual"
    );
  }, [usuario]);

  // ==========================
  // LOGIN NORMAL
  // ==========================

  const iniciarSesion = (
    datosUsuario
  ) => {
    const usuarioNormalizado = {
      ...datosUsuario,
      rol: normalizarRol(
        datosUsuario.rol
      ),
    };

    setUsuario(
      usuarioNormalizado
    );
  };

  // ==========================
  // LOGIN CON GOOGLE
  // ==========================

  const iniciarSesionConGoogle =
    async () => {
      try {
        const provider =
          new GoogleAuthProvider();

        const resultado =
          await signInWithPopup(
            auth,
            provider
          );

        const usuarioGoogle =
          resultado.user;

        const datosUsuario = {
          nombre:
            usuarioGoogle.displayName ||
            "Usuario",

          email:
            usuarioGoogle.email || "",

          telefono:
            usuarioGoogle.phoneNumber || "",

          foto:
            usuarioGoogle.photoURL || "",

          rol: "usuario",

          proveedor: "google",
        };

        setUsuario(
          datosUsuario
        );

        return datosUsuario;
      } catch (error) {
        console.error(
          "Error de Firebase Google:",
          error
        );

        throw error;
      }
    };

  // ==========================
  // CERRAR SESIÓN
  // ==========================

  const cerrarSesion =
    async () => {
      console.log(
    "CERRAR SESIÓN DEL CONTEXT EJECUTADO"
);
      try {
        if (auth.currentUser) {
          await signOut(auth);
        }
      } catch (error) {
        console.error(
          "Error al cerrar sesión de Google:",
          error
        );
      }

      localStorage.removeItem(
        "token"
      );

      sessionStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "usuarioActual"
      );

      sessionStorage.removeItem(
        "usuarioActual"
      );
console.log(
    "BORRANDO USUARIO DEL CONTEXT"
);
      setUsuario(null);
    };

  return (
    <UsuarioContext.Provider
      value={{
        usuario,
        setUsuario,
        iniciarSesion,
        iniciarSesionConGoogle,
        cerrarSesion,
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
}

export default UsuarioProvider;