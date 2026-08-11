const prisma = require("../config/prisma");

const ESTADOS_VALIDOS = [
    "Pendiente",
    "Confirmado",
    "Cancelado",
    "Finalizado"
];


const obtenerTurnos = async (req, res, next) => {
    try {
        const turnos = await prisma.turno.findMany({
            include: {
                cliente: true,
                servicio: true,
                usuario: true
            },
            orderBy: {
                fecha: "asc"
            }
        });

        res.json(turnos);
    } catch (error) {
        next(error);
    }
};


const crearTurno = async (req, res, next) => {
    try {
        const {
            fecha,
            estado,
            clienteId,
            servicioId,
            usuarioId
        } = req.body;

        if (
            !fecha ||
            !estado ||
            !clienteId ||
            !servicioId ||
            !usuarioId
        ) {
            return res.status(400).json({
                mensaje: "Fecha, estado, cliente, servicio y usuario son obligatorios."
            });
        }

        if (!ESTADOS_VALIDOS.includes(estado)) {
            return res.status(400).json({
                mensaje: "El estado no es válido.",
                estadosPermitidos: ESTADOS_VALIDOS
            });
        }

        const clienteIdNumero = Number(clienteId);
        const servicioIdNumero = Number(servicioId);
        const usuarioIdNumero = Number(usuarioId);

        if (
            isNaN(clienteIdNumero) ||
            isNaN(servicioIdNumero) ||
            isNaN(usuarioIdNumero)
        ) {
            return res.status(400).json({
                mensaje: "Los IDs deben ser números válidos."
            });
        }

        const fechaTurno = new Date(fecha);

        if (isNaN(fechaTurno.getTime())) {
            return res.status(400).json({
                mensaje: "La fecha del turno no es válida."
            });
        }

        const cliente = await prisma.cliente.findUnique({
            where: {
                id: clienteIdNumero
            }
        });

        if (!cliente) {
            return res.status(404).json({
                mensaje: "El cliente no existe."
            });
        }

        const servicio = await prisma.servicio.findUnique({
            where: {
                id: servicioIdNumero
            }
        });

        if (!servicio) {
            return res.status(404).json({
                mensaje: "El servicio no existe."
            });
        }

        const usuario = await prisma.usuario.findUnique({
            where: {
                id: usuarioIdNumero
            }
        });

        if (!usuario) {
            return res.status(404).json({
                mensaje: "El usuario no existe."
            });
        }

        const nuevaFechaFin = new Date(
            fechaTurno.getTime() + servicio.duracion * 60000
        );

        const turnosExistentes = await prisma.turno.findMany({
            where: {
                estado: {
                    in: ["Pendiente", "Confirmado"]
                }
            },
            include: {
                servicio: true
            }
        });

        const turnoSuperpuesto = turnosExistentes.find((turnoExistente) => {
            const inicioExistente = new Date(turnoExistente.fecha);

            const finExistente = new Date(
                inicioExistente.getTime() +
                turnoExistente.servicio.duracion * 60000
            );

            return (
                fechaTurno < finExistente &&
                nuevaFechaFin > inicioExistente
            );
        });

        if (turnoSuperpuesto) {
            return res.status(409).json({
                mensaje: "El horario seleccionado está ocupado.",
                turnoExistente: {
                    id: turnoSuperpuesto.id,
                    fecha: turnoSuperpuesto.fecha,
                    servicio: turnoSuperpuesto.servicio.nombre
                }
            });
        }

        const turno = await prisma.turno.create({
            data: {
                fecha: fechaTurno,
                estado,
                clienteId: clienteIdNumero,
                servicioId: servicioIdNumero,
                usuarioId: usuarioIdNumero
            },
            include: {
                cliente: true,
                servicio: true,
                usuario: true
            }
        });

        res.status(201).json(turno);

    } catch (error) {
        next(error);
    }
};


const actualizarTurno = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                mensaje: "El ID del turno no es válido."
            });
        }

        const {
            fecha,
            estado,
            clienteId,
            servicioId,
            usuarioId
        } = req.body;

        if (
            !fecha ||
            !estado ||
            !clienteId ||
            !servicioId ||
            !usuarioId
        ) {
            return res.status(400).json({
                mensaje: "Fecha, estado, cliente, servicio y usuario son obligatorios."
            });
        }

        if (!ESTADOS_VALIDOS.includes(estado)) {
            return res.status(400).json({
                mensaje: "El estado no es válido.",
                estadosPermitidos: ESTADOS_VALIDOS
            });
        }

        const fechaTurno = new Date(fecha);

        if (isNaN(fechaTurno.getTime())) {
            return res.status(400).json({
                mensaje: "La fecha del turno no es válida."
            });
        }

        const clienteIdNumero = Number(clienteId);
        const servicioIdNumero = Number(servicioId);
        const usuarioIdNumero = Number(usuarioId);

        if (
            isNaN(clienteIdNumero) ||
            isNaN(servicioIdNumero) ||
            isNaN(usuarioIdNumero)
        ) {
            return res.status(400).json({
                mensaje: "Los IDs deben ser números válidos."
            });
        }

        const cliente = await prisma.cliente.findUnique({
            where: {
                id: clienteIdNumero
            }
        });

        if (!cliente) {
            return res.status(404).json({
                mensaje: "El cliente no existe."
            });
        }

        const servicio = await prisma.servicio.findUnique({
            where: {
                id: servicioIdNumero
            }
        });

        if (!servicio) {
            return res.status(404).json({
                mensaje: "El servicio no existe."
            });
        }

        const usuario = await prisma.usuario.findUnique({
            where: {
                id: usuarioIdNumero
            }
        });

        if (!usuario) {
            return res.status(404).json({
                mensaje: "El usuario no existe."
            });
        }

        const nuevaFechaFin = new Date(
            fechaTurno.getTime() + servicio.duracion * 60000
        );

        const turnosExistentes = await prisma.turno.findMany({
            where: {
                estado: {
                    in: ["Pendiente", "Confirmado"]
                },
                NOT: {
                    id
                }
            },
            include: {
                servicio: true
            }
        });

        const turnoSuperpuesto = turnosExistentes.find((turnoExistente) => {
            const inicioExistente = new Date(turnoExistente.fecha);

            const finExistente = new Date(
                inicioExistente.getTime() +
                turnoExistente.servicio.duracion * 60000
            );

            return (
                fechaTurno < finExistente &&
                nuevaFechaFin > inicioExistente
            );
        });

        if (turnoSuperpuesto) {
            return res.status(409).json({
                mensaje: "El horario seleccionado está ocupado.",
                turnoExistente: {
                    id: turnoSuperpuesto.id,
                    fecha: turnoSuperpuesto.fecha,
                    servicio: turnoSuperpuesto.servicio.nombre
                }
            });
        }

        const turno = await prisma.turno.update({
            where: {
                id
            },
            data: {
                fecha: fechaTurno,
                estado,
                clienteId: clienteIdNumero,
                servicioId: servicioIdNumero,
                usuarioId: usuarioIdNumero
            },
            include: {
                cliente: true,
                servicio: true,
                usuario: true
            }
        });

        res.json(turno);

    } catch (error) {
        next(error);
    }
};


const cambiarEstadoTurno = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const { estado } = req.body;

        if (isNaN(id)) {
            return res.status(400).json({
                mensaje: "El ID del turno no es válido."
            });
        }

        if (!estado) {
            return res.status(400).json({
                mensaje: "El estado es obligatorio."
            });
        }

        if (!ESTADOS_VALIDOS.includes(estado)) {
            return res.status(400).json({
                mensaje: "El estado no es válido.",
                estadosPermitidos: ESTADOS_VALIDOS
            });
        }

        const turno = await prisma.turno.update({
            where: {
                id
            },
            data: {
                estado
            },
            include: {
                cliente: true,
                servicio: true,
                usuario: true
            }
        });

        res.json({
            mensaje: "Estado del turno actualizado correctamente.",
            turno
        });

    } catch (error) {
        next(error);
    }
};


const eliminarTurno = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                mensaje: "El ID del turno no es válido."
            });
        }

        await prisma.turno.delete({
            where: {
                id
            }
        });

        res.json({
            mensaje: "Turno eliminado correctamente."
        });

    } catch (error) {
        next(error);
    }
};


module.exports = {
    obtenerTurnos,
    crearTurno,
    actualizarTurno,
    cambiarEstadoTurno,
    eliminarTurno
};