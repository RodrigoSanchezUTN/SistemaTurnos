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

function UsuarioProvider({ children }) {
  const [usuario, setUsuario] =
    useState(() => {
      const datos =
        localStorage.getItem(
          "usuarioActual"
        );

      return datos
        ? JSON.parse(datos)
        : null;
    });

  // ==========================
  // GUARDAR SESIÓN
  // ==========================

  useEffect(() => {
    if (usuario) {
      localStorage.setItem(
        "usuarioActual",
        JSON.stringify(usuario)
      );
    } else {
      localStorage.removeItem(
        "usuarioActual"
      );
    }
  }, [usuario]);

  // ==========================
  // LOGIN NORMAL
  // ==========================

  const iniciarSesion = (
    datosUsuario
  ) => {
    setUsuario(datosUsuario);
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

        setUsuario(datosUsuario);

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

  const cerrarSesion = async () => {
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