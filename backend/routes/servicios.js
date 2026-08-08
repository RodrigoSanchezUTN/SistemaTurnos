const express = require("express");

const {
    obtenerServicios,
    crearServicio,
    actualizarServicio,
    eliminarServicio
} = require("../controllers/serviciosController");

const verificarToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", verificarToken, obtenerServicios);

router.post("/", verificarToken, crearServicio);

router.put("/:id", verificarToken, actualizarServicio);

router.delete("/:id", verificarToken, eliminarServicio);

module.exports = router;