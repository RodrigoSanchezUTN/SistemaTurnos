import {
  createContext,
  useEffect,
  useState,
} from "react";

import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase";

const UsuarioContext = createContext();

export function UsuarioProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const usuarioGuardado =
      localStorage.getItem("usuario");

    return usuarioGuardado
      ? JSON.parse(usuarioGuardado)
      : null;
  });

  // ==========================
  // GUARDAR SESIÓN
  // ==========================

  useEffect(() => {
    if (usuario) {
      localStorage.setItem(
        "usuario",
        JSON.stringify(usuario)
      );
    } else {
      localStorage.removeItem("usuario");
    }
  }, [usuario]);

  // ==========================
  // LOGIN NORMAL
  // ==========================

  const iniciarSesion = (datosUsuario) => {
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
          "Error al iniciar sesión con Google:",
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
      // Cerrar sesión de Firebase
      if (auth.currentUser) {
        await signOut(auth);
      }
    } catch (error) {
      console.error(
        "Error al cerrar sesión de Firebase:",
        error
      );
    }

    // Cerrar sesión de Turnify
    setUsuario(null);
  };

  // ==========================
  // ACTUALIZAR USUARIO
  // ==========================

  const actualizarUsuario = (
    nuevosDatos
  ) => {
    setUsuario(
      (usuarioActual) => ({
        ...usuarioActual,
        ...nuevosDatos,
      })
    );
  };

  return (
    <UsuarioContext.Provider
      value={{
        usuario,
        setUsuario,
        iniciarSesion,
        iniciarSesionConGoogle,
        cerrarSesion,
        actualizarUsuario,
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
}

export default UsuarioContext;