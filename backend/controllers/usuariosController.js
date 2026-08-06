const prisma = require("../config/prisma");

const obtenerUsuarios = async (req, res) => {
    const usuarios = await prisma.usuario.findMany();

    res.json(usuarios);
};

const crearUsuario = async (req, res) => {
    const usuario = await prisma.usuario.create({
        data: req.body
    });

    res.json(usuario);
};

module.exports = {
    obtenerUsuarios,
    crearUsuario
};