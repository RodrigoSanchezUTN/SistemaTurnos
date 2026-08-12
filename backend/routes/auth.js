const express = require("express");

const {
    registrarUsuario,
    loginUsuario
} = require("../controllers/authController");

const verificarToken = require("../middleware/authMiddleware");
const verificarRol = require("../middleware/roleMiddleware");

const router = express.Router();


// Login
// Público: no necesita token
router.post(
    "/login",
    loginUsuario
);


// Registro
// Solo Administradores pueden crear usuarios
router.post(
    "/registro",
    verificarToken,
    verificarRol("Administrador"),
    registrarUsuario
);


module.exports = router;