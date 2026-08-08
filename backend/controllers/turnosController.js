const prisma = require("../config/prisma");

const obtenerTurnos = async (req, res) => {
    const turnos = await prisma.turno.findMany({
        include: {
            cliente: true,
            servicio: true,
            usuario: true
        }
    });

    res.json(turnos);
};

const crearTurno = async (req, res) => {
    const turno = await prisma.turno.create({
        data: req.body
    });

    res.json(turno);
};

const actualizarTurno = async (req, res) => {
    const id = Number(req.params.id);

    const turno = await prisma.turno.update({
        where: { id },
        data: req.body
    });

    res.json(turno);
};

const eliminarTurno = async (req, res) => {
    const id = Number(req.params.id);

    await prisma.turno.delete({
        where: { id }
    });

    res.json({
        mensaje: "Turno eliminado."
    });
};

module.exports = {
    obtenerTurnos,
    crearTurno,
    actualizarTurno,
    eliminarTurno
};