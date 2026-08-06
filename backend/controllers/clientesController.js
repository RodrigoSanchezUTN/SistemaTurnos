const prisma = require("../config/prisma");

const obtenerClientes = async (req, res) => {
    const clientes = await prisma.cliente.findMany();

    res.json(clientes);
};

const crearCliente = async (req, res) => {
    const { nombre, apellido, telefono, email, observaciones } = req.body;

    const cliente = await prisma.cliente.create({
        data: {
            nombre,
            apellido,
            telefono,
            email,
            observaciones
        }
    });

    res.json(cliente);
};

const actualizarCliente = async (req, res) => {
    const id = Number(req.params.id);

    const cliente = await prisma.cliente.update({
        where: { id },
        data: req.body
    });

    res.json(cliente);
};

const eliminarCliente = async (req, res) => {
    const id = Number(req.params.id);

    await prisma.cliente.delete({
        where: { id }
    });

    res.json({
        mensaje: "Cliente eliminado."
    });
};

module.exports = {
    obtenerClientes,
    crearCliente,
    actualizarCliente,
    eliminarCliente
};