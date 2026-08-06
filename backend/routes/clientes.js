const express = require("express");

const {
    obtenerClientes,
    crearCliente,
    actualizarCliente,
    eliminarCliente
} = require("../controllers/clientesController");

const router = express.Router();

router.get("/", obtenerClientes);

router.post("/", crearCliente);

router.put("/:id", actualizarCliente);

router.delete("/:id", eliminarCliente);

module.exports = router;