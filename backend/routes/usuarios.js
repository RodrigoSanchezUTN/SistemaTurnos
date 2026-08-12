const express = require("express");

const {
    obtenerUsuarios,
    crearUsuario
} = require("../controllers/usuariosController");

const verificarToken = require("../middleware/authMiddleware");
const verificarRol = require("../middleware/roleMiddleware");

const router = express.Router();


// Ver usuarios
// Solo Administradores
router.get(
    "/",
    verificarToken,
    verificarRol("Administrador"),
    obtenerUsuarios
);


// Crear usuarios
// Solo Administradores
router.post(
    "/",
    verificarToken,
    verificarRol("Administrador"),
    crearUsuario
);


module.exports = router;