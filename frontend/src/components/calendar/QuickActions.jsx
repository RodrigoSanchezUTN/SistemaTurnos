

function QuickActions({ onNuevoTurno }) {

  

  return (
    <>

      <div className="calendar-side-card">

        <h4 className="calendar-side-title">
          ⚡ Acciones rápidas
        </h4>

        <button
          className="btn btn-primary w-100 mb-2"
          onClick={onNuevoTurno}
        >
          + Nuevo turno
        </button>

        <button className="btn btn-light w-100 mb-2">
          Clientes
        </button>

        <button className="btn btn-light w-100">
          Servicios
        </button>

      </div>

     

    </>
  );

}

export default QuickActions;