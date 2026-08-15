const express = require("express");

const {
    obtenerClientes,
    crearCliente,
    actualizarCliente,
    eliminarCliente
} = require("../controllers/clientesController");

const verificarToken = require("../middleware/authMiddleware");
const verificarRol = require("../middleware/roleMiddleware");

const router = express.Router();

// ==========================
// CLIENTES
// SOLO ADMINISTRADORES
// ==========================

router.get(
    "/",
    verificarToken,
    verificarRol("Administrador"),
    obtenerClientes
);

router.post(
    "/",
    verificarToken,
    verificarRol("Administrador"),
    crearCliente
);

router.put(
    "/:id",
    verificarToken,
    verificarRol("Administrador"),
    actualizarCliente
);

router.delete(
    "/:id",
    verificarToken,
    verificarRol("Administrador"),
    eliminarCliente
);

module.exports = router;