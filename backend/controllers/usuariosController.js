const prisma = require("../config/prisma");

const obtenerUsuarios = async (req, res) => {
    const usuarios = await prisma.usuario.findMany({
        select: {
            id: true,
            nombre: true,
            email: true,
            rol: true
        }
    });

    res.json(usuarios);
};

const crearUsuario = async (req, res) => {
    const { nombre, email, password, rol } = req.body;

    const usuario = await prisma.usuario.create({
        data: {
            nombre,
            email,
            password,
            rol
        }
    });

    res.json({
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
    });
};

module.exports = {
    obtenerUsuarios,
    crearUsuario
};