function ClienteSearch({ busqueda, setBusqueda }) {
  return (
    <input
      className="form-control mb-4"
      placeholder="🔍 Buscar cliente..."
      value={busqueda}
      onChange={(e) => setBusqueda(e.target.value)}
    />
  );
}

export default ClienteSearch;