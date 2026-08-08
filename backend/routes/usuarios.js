const express = require("express");

const {
    obtenerUsuarios,
    crearUsuario
} = require("../controllers/usuariosController");

const verificarToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", verificarToken, obtenerUsuarios);

router.post("/", verificarToken, crearUsuario);

module.exports = router;