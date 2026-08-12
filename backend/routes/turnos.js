const express = require("express");

const {
    obtenerTurnos,
    crearTurno,
    actualizarTurno,
    cambiarEstadoTurno,
    eliminarTurno
} = require("../controllers/turnosController");

const verificarToken = require("../middleware/authMiddleware");
const verificarRol = require("../middleware/roleMiddleware");

const router = express.Router();

// Ver turnos
router.get(
    "/",
    verificarToken,
    obtenerTurnos
);

// Crear turno
router.post(
    "/",
    verificarToken,
    crearTurno
);

// Modificar turno
router.put(
    "/:id",
    verificarToken,
    actualizarTurno
);

// Cambiar estado
router.patch(
    "/:id/estado",
    verificarToken,
    cambiarEstadoTurno
);

// Eliminar turno: solo Administrador
router.delete(
    "/:id",
    verificarToken,
    verificarRol("Administrador"),
    eliminarTurno
);

module.exports = router;