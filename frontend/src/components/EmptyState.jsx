function EmptyState({ mensaje }) {
  return (
    <div className="alert alert-secondary text-center mt-4">
      {mensaje}
    </div>
  );
}

export default EmptyState;