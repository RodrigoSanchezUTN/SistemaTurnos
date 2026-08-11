const prisma = require("../config/prisma");

const obtenerClientes = async (req, res, next) => {
    try {
        const clientes = await prisma.cliente.findMany();

        res.json(clientes);
    } catch (error) {
        next(error);
    }
};


const crearCliente = async (req, res, next) => {
    try {
        const {
            nombre,
            apellido,
            telefono,
            email,
            observaciones
        } = req.body;

        // Validar campos obligatorios
        if (!nombre || !apellido || !telefono || !email) {
            return res.status(400).json({
                mensaje: "Nombre, apellido, teléfono y email son obligatorios."
            });
        }

        // Validar email
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailValido.test(email)) {
            return res.status(400).json({
                mensaje: "El email no es válido."
            });
        }

        const cliente = await prisma.cliente.create({
            data: {
                nombre,
                apellido,
                telefono,
                email,
                observaciones
            }
        });

        res.status(201).json(cliente);

    } catch (error) {
        next(error);
    }
};


const actualizarCliente = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                mensaje: "El ID del cliente no es válido."
            });
        }

        const {
            nombre,
            apellido,
            telefono,
            email,
            observaciones
        } = req.body;

        // Validar campos obligatorios
        if (!nombre || !apellido || !telefono || !email) {
            return res.status(400).json({
                mensaje: "Nombre, apellido, teléfono y email son obligatorios."
            });
        }

        // Validar email
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailValido.test(email)) {
            return res.status(400).json({
                mensaje: "El email no es válido."
            });
        }

        const cliente = await prisma.cliente.update({
            where: {
                id: id
            },
            data: {
                nombre,
                apellido,
                telefono,
                email,
                observaciones
            }
        });

        res.json(cliente);

    } catch (error) {
        next(error);
    }
};


const eliminarCliente = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                mensaje: "El ID del cliente no es válido."
            });
        }

        await prisma.cliente.delete({
            where: {
                id: id
            }
        });

        res.json({
            mensaje: "Cliente eliminado correctamente."
        });

    } catch (error) {
        next(error);
    }
};


module.exports = {
    obtenerClientes,
    crearCliente,
    actualizarCliente,
    eliminarCliente
};