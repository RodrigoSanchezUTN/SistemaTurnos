const express = require("express");

const {
    obtenerServicios,
    crearServicio,
    actualizarServicio,
    eliminarServicio
} = require("../controllers/serviciosController");

const router = express.Router();

router.get("/", obtenerServicios);

router.post("/", crearServicio);

router.put("/:id", actualizarServicio);

router.delete("/:id", eliminarServicio);

module.exports = router;