const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");

const ROLES_VALIDOS = [
    "Administrador",
    "Usuario"
];


const obtenerUsuarios = async (req, res, next) => {
    try {
        const usuarios = await prisma.usuario.findMany({
            select: {
                id: true,
                nombre: true,
                email: true,
                rol: true
            }
        });

        res.json(usuarios);

    } catch (error) {
        next(error);
    }
};


const crearUsuario = async (req, res, next) => {
    try {
        const {
            nombre,
            email,
            password,
            rol
        } = req.body;

        // Validar campos obligatorios
        if (!nombre || !email || !password || !rol) {
            return res.status(400).json({
                mensaje: "Todos los campos son obligatorios."
            });
        }

        // Normalizar email
        const emailNormalizado = email.trim().toLowerCase();

        // Validar email
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailValido.test(emailNormalizado)) {
            return res.status(400).json({
                mensaje: "El email no es válido."
            });
        }

        // Validar contraseña
        if (password.length < 6) {
            return res.status(400).json({
                mensaje: "La contraseña debe tener al menos 6 caracteres."
            });
        }

        // Validar rol
        if (!ROLES_VALIDOS.includes(rol)) {
            return res.status(400).json({
                mensaje: "El rol no es válido.",
                rolesPermitidos: ROLES_VALIDOS
            });
        }

        // Comprobar email existente
        const usuarioExistente = await prisma.usuario.findUnique({
            where: {
                email: emailNormalizado
            }
        });

        if (usuarioExistente) {
            return res.status(409).json({
                mensaje: "Ya existe un usuario con ese email."
            });
        }

        // Hashear contraseña
        const passwordHash = await bcrypt.hash(password, 10);

        // Crear usuario
        const usuario = await prisma.usuario.create({
            data: {
                nombre: nombre.trim(),
                email: emailNormalizado,
                password: passwordHash,
                rol
            }
        });

        // Nunca devolver password
        res.status(201).json({
            mensaje: "Usuario creado correctamente.",
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol
            }
        });

    } catch (error) {
        next(error);
    }
};


module.exports = {
    obtenerUsuarios,
    crearUsuario
};