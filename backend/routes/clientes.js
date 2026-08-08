const express = require("express");

const {
    obtenerClientes,
    crearCliente,
    actualizarCliente,
    eliminarCliente
} = require("../controllers/clientesController");

const verificarToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", verificarToken, obtenerClientes);

router.post("/", verificarToken, crearCliente);

router.put("/:id", verificarToken, actualizarCliente);

router.delete("/:id", verificarToken, eliminarCliente);

module.exports = router;