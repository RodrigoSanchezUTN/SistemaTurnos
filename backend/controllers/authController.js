const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registrarUsuario = async (req, res) => {
    const { nombre, email, password, rol } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const usuario = await prisma.usuario.create({
        data: {
            nombre,
            email,
            password: passwordHash,
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

const loginUsuario = async (req, res) => {
    const { email, password } = req.body;

    const usuario = await prisma.usuario.findUnique({
        where: {
            email: email
        }
    });

    if (!usuario) {
        return res.status(401).json({
            mensaje: "Email o contraseña incorrectos."
        });
    }

    const passwordCorrecta = await bcrypt.compare(
        password,
        usuario.password
    );

    if (!passwordCorrecta) {
        return res.status(401).json({
            mensaje: "Email o contraseña incorrectos."
        });
    }

    const token = jwt.sign(
        {
            id: usuario.id,
            email: usuario.email,
            rol: usuario.rol
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "2h"
        }
    );

    res.json({
        mensaje: "Login correcto.",
        token: token,
        usuario: {
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol
        }
    });
};

module.exports = {
    registrarUsuario,
    loginUsuario
};