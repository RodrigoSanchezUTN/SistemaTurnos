const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const ROLES_VALIDOS = [
    "Administrador",
    "Usuario"
];

const registrarUsuarioPublico = async (req, res, next) => {
    try {
        const {
            nombre,
            email,
            password,
            telefono
        } = req.body;

        if (!nombre || !email || !password) {
            return res.status(400).json({
                mensaje: "Nombre, email y contraseña son obligatorios."
            });
        }

        const emailNormalizado =
            email.trim().toLowerCase();

        const emailValido =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailValido.test(emailNormalizado)) {
            return res.status(400).json({
                mensaje: "El email no es válido."
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                mensaje:
                    "La contraseña debe tener al menos 6 caracteres."
            });
        }

        const usuarioExistente =
            await prisma.usuario.findUnique({
                where: {
                    email: emailNormalizado
                }
            });

        if (usuarioExistente) {
            return res.status(409).json({
                mensaje:
                    "Ya existe un usuario con ese email."
            });
        }

        const passwordHash =
            await bcrypt.hash(password, 10);

        const usuario =
            await prisma.usuario.create({
                data: {
                    nombre: nombre.trim(),
                    email: emailNormalizado,
                    password: passwordHash,
                    rol: "Usuario"
                }
            });

        res.status(201).json({
            mensaje:
                "Usuario registrado correctamente.",
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                telefono: telefono || "",
                rol: "Usuario"
            }
        });

    } catch (error) {
        next(error);
    }
};

const registrarUsuario = async (req, res, next) => {
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

        // Comprobar si el email ya existe
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

        // Nunca devolver la contraseña
        res.status(201).json({
            mensaje: "Usuario registrado correctamente.",
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


const loginUsuario = async (req, res, next) => {
    try {
        const {
            email,
            password
        } = req.body;

        // Validar campos
        if (!email || !password) {
            return res.status(400).json({
                mensaje: "Email y contraseña son obligatorios."
            });
        }

        // Normalizar email
        const emailNormalizado = email.trim().toLowerCase();

        // Buscar usuario
        const usuario = await prisma.usuario.findUnique({
            where: {
                email: emailNormalizado
            }
        });

        // No revelar si el email existe
        if (!usuario) {
            return res.status(401).json({
                mensaje: "Email o contraseña incorrectos."
            });
        }

        // Comparar contraseña
        const passwordCorrecta = await bcrypt.compare(
            password,
            usuario.password
        );

        if (!passwordCorrecta) {
            return res.status(401).json({
                mensaje: "Email o contraseña incorrectos."
            });
        }

        // Verificar que el usuario tenga un rol válido
        if (!ROLES_VALIDOS.includes(usuario.rol)) {
            return res.status(403).json({
                mensaje: "El usuario tiene un rol no válido."
            });
        }

        // Crear JWT
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

        // Respuesta sin contraseña
        res.json({
            mensaje: "Login correcto.",
            token,
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
    registrarUsuario,
    registrarUsuarioPublico,
    loginUsuario
    
};