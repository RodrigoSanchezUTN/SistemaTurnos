const express = require("express");

const {
    obtenerHorarios,
    guardarHorarios
} = require("../controllers/horariosController");

const verificarToken = require("../middleware/authMiddleware");
const verificarRol = require("../middleware/roleMiddleware");

const router = express.Router();

// Cualquier usuario autenticado puede consultar sus horarios
router.get(
    "/",
    verificarToken,
    obtenerHorarios
);

// Solo Administradores pueden modificar horarios
router.put(
    "/",
    verificarToken,
    verificarRol("Administrador"),
    guardarHorarios
);

module.exports = router;