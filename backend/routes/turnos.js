const express = require("express");

const {
    obtenerTurnos,
    crearTurno,
    crearReserva,
    actualizarTurno,
    cambiarEstadoTurno,
    eliminarTurno,
    cancelarTurno
} = require("../controllers/turnosController");

const verificarToken = require("../middleware/authMiddleware");
const verificarRol = require("../middleware/roleMiddleware");

const router = express.Router();

// ==========================
// VER TURNOS
// ==========================

router.get(
    "/",
    verificarToken,
    obtenerTurnos
);

// ==========================
// RESERVA DE USUARIO
// ==========================

router.post(
    "/reserva",
    verificarToken,
    crearReserva
);

// ==========================
// CANCELAR TURNO DE USUARIO
// ==========================

router.patch(
    "/:id/cancelar",
    verificarToken,
    cancelarTurno
);
// ==========================
// CREAR TURNO
// SOLO ADMINISTRADOR
// ==========================

router.post(
    "/",
    verificarToken,
    verificarRol("Administrador"),
    crearTurno
);

// ==========================
// MODIFICAR TURNO
// SOLO ADMINISTRADOR
// ==========================

router.put(
    "/:id",
    verificarToken,
    verificarRol("Administrador"),
    actualizarTurno
);

// ==========================
// CAMBIAR ESTADO
// SOLO ADMINISTRADOR
// ==========================

router.patch(
    "/:id/estado",
    verificarToken,
    verificarRol("Administrador"),
    cambiarEstadoTurno
);

// ==========================
// ELIMINAR TURNO
// SOLO ADMINISTRADOR
// ==========================

router.delete(
    "/:id",
    verificarToken,
    verificarRol("Administrador"),
    eliminarTurno
);

module.exports = router;