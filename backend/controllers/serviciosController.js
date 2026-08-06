const prisma = require("../config/prisma");

const obtenerServicios = async (req, res) => {
    const servicios = await prisma.servicio.findMany();

    res.json(servicios);
};

const crearServicio = async (req, res) => {
    const { nombre, precio, duracion } = req.body;

    const servicio = await prisma.servicio.create({
        data: {
            nombre,
            precio,
            duracion
        }
    });

    res.json(servicio);
};

const actualizarServicio = async (req, res) => {
    const id = Number(req.params.id);

    const servicio = await prisma.servicio.update({
        where: { id },
        data: req.body
    });

    res.json(servicio);
};

const eliminarServicio = async (req, res) => {
    const id = Number(req.params.id);

    await prisma.servicio.delete({
        where: { id }
    });

    res.json({
        mensaje: "Servicio eliminado."
    });
};

module.exports = {
    obtenerServicios,
    crearServicio,
    actualizarServicio,
    eliminarServicio
};