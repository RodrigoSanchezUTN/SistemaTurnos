function Card({ titulo, valor, color }) {
  return (
    <div className="col-md-3 mb-4">
      <div className={`card text-white bg-${color} shadow`}>
        <div className="card-body">
          <h6>{titulo}</h6>
          <h2>{valor}</h2>
        </div>
      </div>
    </div>
  );
}

export default Card;