function ButtonPrimary({
  texto,
  onClick,
  color = "primary",
  type = "button",
}) {
  return (
    <button
      type={type}
      className={`btn btn-${color}`}
      onClick={onClick}
    >
      {texto}
    </button>
  );
}

export default ButtonPrimary;