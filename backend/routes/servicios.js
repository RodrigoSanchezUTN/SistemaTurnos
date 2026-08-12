const express = require("express");

const {
    obtenerServicios,
    crearServicio,
    actualizarServicio,
    eliminarServicio
} = require("../controllers/serviciosController");

const verificarToken = require("../middleware/authMiddleware");
const verificarRol = require("../middleware/roleMiddleware");

const router = express.Router();

// Cualquier usuario autenticado puede ver los servicios
router.get("/", verificarToken, obtenerServicios);

// Solo Administradores pueden crear servicios
router.post(
    "/",
    verificarToken,
    verificarRol("Administrador"),
    crearServicio
);

// Solo Administradores pueden modificar servicios
router.put(
    "/:id",
    verificarToken,
    verificarRol("Administrador"),
    actualizarServicio
);

// Solo Administradores pueden eliminar servicios
router.delete(
    "/:id",
    verificarToken,
    verificarRol("Administrador"),
    eliminarServicio
);

module.exports = router;