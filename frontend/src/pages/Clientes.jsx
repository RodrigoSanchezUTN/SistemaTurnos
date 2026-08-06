import { useContext, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import ClienteForm from "../components/ClienteForm";
import ClienteSearch from "../components/ClienteSearch";
import ClienteTable from "../components/ClienteTable";
import AppContext from "../context/AppContext";

function Clientes() {
  const { clientes, setClientes } = useContext(AppContext);

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [busqueda, setBusqueda] = useState("");

  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  const limpiarFormulario = () => {
    setNombre("");
    setTelefono("");
    setEmail("");
    setModoEdicion(false);
    setIdEditar(null);
  };

  const agregarCliente = () => {
    if (!nombre || !telefono || !email) {
      alert("Complete todos los campos");
      return;
    }

    const nuevoCliente = {
      id: Date.now(),
      nombre,
      telefono,
      email,
    };

    setClientes([...clientes, nuevoCliente]);
    limpiarFormulario();
  };

  const editarCliente = (cliente) => {
    setNombre(cliente.nombre);
    setTelefono(cliente.telefono);
    setEmail(cliente.email);
    setModoEdicion(true);
    setIdEditar(cliente.id);
  };

  const actualizarCliente = () => {
    if (!nombre || !telefono || !email) {
      alert("Complete todos los campos");
      return;
    }

    const clientesActualizados = clientes.map((cliente) =>
      cliente.id === idEditar
        ? {
            ...cliente,
            nombre,
            telefono,
            email,
          }
        : cliente
    );

    setClientes(clientesActualizados);
    limpiarFormulario();
  };

  const eliminarCliente = (id) => {
    if (window.confirm("¿Eliminar este cliente?")) {
      setClientes(clientes.filter((cliente) => cliente.id !== id));
    }
  };

  const clientesFiltrados = clientes.filter((cliente) =>
    cliente.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <DashboardLayout>
      <h2 className="mb-4">👥 Gestión de Clientes</h2>

      <ClienteForm
        nombre={nombre}
        setNombre={setNombre}
        telefono={telefono}
        setTelefono={setTelefono}
        email={email}
        setEmail={setEmail}
        modoEdicion={modoEdicion}
        agregarCliente={agregarCliente}
        actualizarCliente={actualizarCliente}
        limpiarFormulario={limpiarFormulario}
      />

      <ClienteSearch
        busqueda={busqueda}
        setBusqueda={setBusqueda}
      />

      <ClienteTable
        clientes={clientesFiltrados}
        editarCliente={editarCliente}
        eliminarCliente={eliminarCliente}
      />
    </DashboardLayout>
  );
}

export default Clientes;