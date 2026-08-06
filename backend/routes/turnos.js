const express = require("express");

const {
    obtenerTurnos,
    crearTurno,
    eliminarTurno
} = require("../controllers/turnosController");

const router = express.Router();

router.get("/", obtenerTurnos);

router.post("/", crearTurno);

router.delete("/:id", eliminarTurno);

module.exports = router;