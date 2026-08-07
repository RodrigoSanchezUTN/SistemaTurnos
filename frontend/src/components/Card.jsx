function Card({ titulo, valor, color }) {
  return (
    <div className="col-lg-3 col-md-6 mb-4">

      <div
        className="card border-0 shadow-lg h-100"
        style={{
          borderLeft: `6px solid ${color}`,
          borderRadius: "15px",
          transition: "0.3s",
          cursor: "pointer",
        }}
      >

        <div className="card-body">

          <h6
            className="text-uppercase text-secondary fw-bold"
          >
            {titulo}
          </h6>

          <h1
            className="fw-bold mt-3"
            style={{ color }}
          >
            {valor}
          </h1>

        </div>

      </div>

    </div>
  );
}

export default Card;