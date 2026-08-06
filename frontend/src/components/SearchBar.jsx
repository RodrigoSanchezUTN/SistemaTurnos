function SearchBar({
  value,
  onChange,
  placeholder = "Buscar...",
}) {
  return (
    <input
      type="text"
      className="form-control mb-4"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default SearchBar;