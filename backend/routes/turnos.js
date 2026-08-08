const express = require("express");

const {
    obtenerTurnos,
    crearTurno,
    actualizarTurno,
    eliminarTurno
} = require("../controllers/turnosController");

const verificarToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", verificarToken, obtenerTurnos);

router.post("/", verificarToken, crearTurno);

router.put("/:id", verificarToken, actualizarTurno);

router.delete("/:id", verificarToken, eliminarTurno);

module.exports = router;