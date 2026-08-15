const prisma = require("../config/prisma");

const ESTADOS_VALIDOS = [
    "Pendiente",
    "Confirmado",
    "Cancelado",
    "Finalizado"
];

// ==========================
// OBTENER TURNOS
// ==========================

const obtenerTurnos = async (req, res, next) => {
    try {
        const esAdministrador =
            req.usuario.rol === "Administrador";

        const where = esAdministrador
            ? {}
            : {
                usuarioId: req.usuario.id
            };

        const turnos = await prisma.turno.findMany({
            where,
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


// ==========================
// CREAR TURNO
// SOLO ADMINISTRADOR
// ==========================

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
                mensaje:
                    "Fecha, estado, cliente, servicio y usuario son obligatorios."
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

        const cliente =
            await prisma.cliente.findUnique({
                where: {
                    id: clienteIdNumero
                }
            });

        if (!cliente) {
            return res.status(404).json({
                mensaje: "El cliente no existe."
            });
        }

        const servicio =
            await prisma.servicio.findUnique({
                where: {
                    id: servicioIdNumero
                }
            });

        if (!servicio) {
            return res.status(404).json({
                mensaje: "El servicio no existe."
            });
        }

        const usuario =
            await prisma.usuario.findUnique({
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
            fechaTurno.getTime() +
            servicio.duracion * 60000
        );

        const turnosExistentes =
            await prisma.turno.findMany({
                where: {
                    estado: {
                        in: [
                            "Pendiente",
                            "Confirmado"
                        ]
                    }
                },
                include: {
                    servicio: true
                }
            });

        const turnoSuperpuesto =
            turnosExistentes.find(
                (turnoExistente) => {
                    const inicioExistente =
                        new Date(
                            turnoExistente.fecha
                        );

                    const finExistente =
                        new Date(
                            inicioExistente.getTime() +
                            turnoExistente.servicio.duracion *
                            60000
                        );

                    return (
                        fechaTurno < finExistente &&
                        nuevaFechaFin >
                        inicioExistente
                    );
                }
            );

        if (turnoSuperpuesto) {
            return res.status(409).json({
                mensaje:
                    "El horario seleccionado está ocupado.",
                turnoExistente: {
                    id:
                        turnoSuperpuesto.id,
                    fecha:
                        turnoSuperpuesto.fecha,
                    servicio:
                        turnoSuperpuesto
                            .servicio
                            .nombre
                }
            });
        }

        const turno =
            await prisma.turno.create({
                data: {
                    fecha: fechaTurno,
                    estado,
                    clienteId:
                        clienteIdNumero,
                    servicioId:
                        servicioIdNumero,
                    usuarioId:
                        usuarioIdNumero
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


// ==========================
// ACTUALIZAR TURNO
// SOLO ADMINISTRADOR
// ==========================

const actualizarTurno = async (
    req,
    res,
    next
) => {
    try {
        const id =
            Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                mensaje:
                    "El ID del turno no es válido."
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
                mensaje:
                    "Fecha, estado, cliente, servicio y usuario son obligatorios."
            });
        }

        if (!ESTADOS_VALIDOS.includes(estado)) {
            return res.status(400).json({
                mensaje: "El estado no es válido.",
                estadosPermitidos:
                    ESTADOS_VALIDOS
            });
        }

        const fechaTurno =
            new Date(fecha);

        if (isNaN(fechaTurno.getTime())) {
            return res.status(400).json({
                mensaje:
                    "La fecha del turno no es válida."
            });
        }

        const clienteIdNumero =
            Number(clienteId);

        const servicioIdNumero =
            Number(servicioId);

        const usuarioIdNumero =
            Number(usuarioId);

        if (
            isNaN(clienteIdNumero) ||
            isNaN(servicioIdNumero) ||
            isNaN(usuarioIdNumero)
        ) {
            return res.status(400).json({
                mensaje:
                    "Los IDs deben ser números válidos."
            });
        }

        const turnoActual =
            await prisma.turno.findUnique({
                where: {
                    id
                }
            });

        if (!turnoActual) {
            return res.status(404).json({
                mensaje:
                    "El turno no existe."
            });
        }

        const cliente =
            await prisma.cliente.findUnique({
                where: {
                    id: clienteIdNumero
                }
            });

        if (!cliente) {
            return res.status(404).json({
                mensaje:
                    "El cliente no existe."
            });
        }

        const servicio =
            await prisma.servicio.findUnique({
                where: {
                    id: servicioIdNumero
                }
            });

        if (!servicio) {
            return res.status(404).json({
                mensaje:
                    "El servicio no existe."
            });
        }

        const usuario =
            await prisma.usuario.findUnique({
                where: {
                    id: usuarioIdNumero
                }
            });

        if (!usuario) {
            return res.status(404).json({
                mensaje:
                    "El usuario no existe."
            });
        }

        const nuevaFechaFin =
            new Date(
                fechaTurno.getTime() +
                servicio.duracion * 60000
            );

        const turnosExistentes =
            await prisma.turno.findMany({
                where: {
                    estado: {
                        in: [
                            "Pendiente",
                            "Confirmado"
                        ]
                    },
                    NOT: {
                        id
                    }
                },
                include: {
                    servicio: true
                }
            });

        const turnoSuperpuesto =
            turnosExistentes.find(
                (turnoExistente) => {
                    const inicioExistente =
                        new Date(
                            turnoExistente.fecha
                        );

                    const finExistente =
                        new Date(
                            inicioExistente.getTime() +
                            turnoExistente.servicio.duracion *
                            60000
                        );

                    return (
                        fechaTurno <
                        finExistente &&
                        nuevaFechaFin >
                        inicioExistente
                    );
                }
            );

        if (turnoSuperpuesto) {
            return res.status(409).json({
                mensaje:
                    "El horario seleccionado está ocupado.",
                turnoExistente: {
                    id:
                        turnoSuperpuesto.id,
                    fecha:
                        turnoSuperpuesto.fecha,
                    servicio:
                        turnoSuperpuesto
                            .servicio
                            .nombre
                }
            });
        }

        const turno =
            await prisma.turno.update({
                where: {
                    id
                },
                data: {
                    fecha: fechaTurno,
                    estado,
                    clienteId:
                        clienteIdNumero,
                    servicioId:
                        servicioIdNumero,
                    usuarioId:
                        usuarioIdNumero
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


// ==========================
// CAMBIAR ESTADO
// SOLO ADMINISTRADOR
// ==========================

const cambiarEstadoTurno = async (
    req,
    res,
    next
) => {
    try {
        const id =
            Number(req.params.id);

        const { estado } =
            req.body;

        if (isNaN(id)) {
            return res.status(400).json({
                mensaje:
                    "El ID del turno no es válido."
            });
        }

        if (!estado) {
            return res.status(400).json({
                mensaje:
                    "El estado es obligatorio."
            });
        }

        if (!ESTADOS_VALIDOS.includes(estado)) {
            return res.status(400).json({
                mensaje:
                    "El estado no es válido.",
                estadosPermitidos:
                    ESTADOS_VALIDOS
            });
        }

        const turno =
            await prisma.turno.findUnique({
                where: {
                    id
                }
            });

        if (!turno) {
            return res.status(404).json({
                mensaje:
                    "El turno no existe."
            });
        }

        const turnoActualizado =
            await prisma.turno.update({
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
            mensaje:
                "Estado del turno actualizado correctamente.",
            turno: turnoActualizado
        });

    } catch (error) {
        next(error);
    }
};


// ==========================
// ELIMINAR TURNO
// SOLO ADMINISTRADOR
// ==========================

const eliminarTurno = async (
    req,
    res,
    next
) => {
    try {
        const id =
            Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                mensaje:
                    "El ID del turno no es válido."
            });
        }

        const turno =
            await prisma.turno.findUnique({
                where: {
                    id
                }
            });

        if (!turno) {
            return res.status(404).json({
                mensaje:
                    "El turno no existe."
            });
        }

        await prisma.turno.delete({
            where: {
                id
            }
        });

        res.json({
            mensaje:
                "Turno eliminado correctamente."
        });

    } catch (error) {
        next(error);
    }
};


// ==========================
// CREAR RESERVA DE USUARIO
// ==========================

const crearReserva = async (
    req,
    res,
    next
) => {
    try {
        const {
            fecha,
            servicioId
        } = req.body;

        if (!fecha || !servicioId) {
            return res.status(400).json({
                mensaje:
                    "Fecha y servicio son obligatorios."
            });
        }

        const servicioIdNumero =
            Number(servicioId);

        if (isNaN(servicioIdNumero)) {
            return res.status(400).json({
                mensaje:
                    "El servicio no es válido."
            });
        }

        // ==========================
        // USUARIO AUTENTICADO
        // ==========================

        const usuario =
            await prisma.usuario.findUnique({
                where: {
                    id: req.usuario.id
                }
            });

        if (!usuario) {
            return res.status(404).json({
                mensaje:
                    "El usuario no existe."
            });
        }

        // ==========================
        // SERVICIO
        // ==========================

        const servicio =
            await prisma.servicio.findUnique({
                where: {
                    id: servicioIdNumero
                }
            });

        if (!servicio) {
            return res.status(404).json({
                mensaje:
                    "El servicio no existe."
            });
        }

        // ==========================
        // FECHA
        // ==========================

        const fechaTurno =
            new Date(fecha);

        if (isNaN(fechaTurno.getTime())) {
            return res.status(400).json({
                mensaje:
                    "La fecha del turno no es válida."
            });
        }

        // ==========================
        // BUSCAR CLIENTE
        // ==========================

        let cliente =
            await prisma.cliente.findFirst({
                where: {
                    email: usuario.email
                }
            });

        // ==========================
        // CREAR CLIENTE
        // ==========================

        if (!cliente) {
            const partesNombre =
                usuario.nombre
                    .trim()
                    .split(/\s+/);

            const nombre =
                partesNombre.shift() ||
                "Cliente";

            const apellido =
                partesNombre.join(" ") ||
                "Sin especificar";

            cliente =
                await prisma.cliente.create({
                    data: {
                        nombre,
                        apellido,
                        telefono:
                            usuario.telefono ||
                            "No especificado",
                        email:
                            usuario.email,
                        observaciones:
                            null
                    }
                });
        }

        // ==========================
        // SUPERPOSICIÓN
        // ==========================

        const nuevaFechaFin =
            new Date(
                fechaTurno.getTime() +
                servicio.duracion * 60000
            );

        const turnosExistentes =
            await prisma.turno.findMany({
                where: {
                    estado: {
                        in: [
                            "Pendiente",
                            "Confirmado"
                        ]
                    }
                },
                include: {
                    servicio: true
                }
            });

        const turnoSuperpuesto =
            turnosExistentes.find(
                (turnoExistente) => {
                    const inicioExistente =
                        new Date(
                            turnoExistente.fecha
                        );

                    const finExistente =
                        new Date(
                            inicioExistente.getTime() +
                            turnoExistente.servicio.duracion *
                            60000
                        );

                    return (
                        fechaTurno <
                        finExistente &&
                        nuevaFechaFin >
                        inicioExistente
                    );
                }
            );

        if (turnoSuperpuesto) {
            return res.status(409).json({
                mensaje:
                    "El horario seleccionado está ocupado.",
                turnoExistente: {
                    id:
                        turnoSuperpuesto.id,
                    fecha:
                        turnoSuperpuesto.fecha,
                    servicio:
                        turnoSuperpuesto
                            .servicio
                            .nombre
                }
            });
        }

        // ==========================
        // CREAR TURNO
        // ==========================

        const turno =
            await prisma.turno.create({
                data: {
                    fecha: fechaTurno,
                    estado: "Pendiente",
                    clienteId:
                        cliente.id,
                    servicioId:
                        servicio.id,
                    usuarioId:
                        usuario.id
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

// ==========================
// CANCELAR TURNO DE USUARIO
// ==========================

const cancelarTurno = async (
    req,
    res,
    next
) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                mensaje:
                    "El ID del turno no es válido."
            });
        }

        // ==========================
        // BUSCAR TURNO
        // ==========================

        const turno =
            await prisma.turno.findUnique({
                where: {
                    id
                }
            });

        if (!turno) {
            return res.status(404).json({
                mensaje:
                    "El turno no existe."
            });
        }

        // ==========================
        // VERIFICAR PROPIETARIO
        // ==========================

        if (
            turno.usuarioId !==
            req.usuario.id
        ) {
            return res.status(403).json({
                mensaje:
                    "No tenés permiso para cancelar este turno."
            });
        }

        // ==========================
        // VERIFICAR ESTADO
        // ==========================

        if (
            turno.estado === "Cancelado"
        ) {
            return res.status(400).json({
                mensaje:
                    "Este turno ya está cancelado."
            });
        }

        if (
            turno.estado === "Finalizado"
        ) {
            return res.status(400).json({
                mensaje:
                    "No podés cancelar un turno finalizado."
            });
        }

        // ==========================
        // CANCELAR
        // ==========================

        const turnoCancelado =
            await prisma.turno.update({
                where: {
                    id
                },
                data: {
                    estado: "Cancelado"
                },
                include: {
                    cliente: true,
                    servicio: true,
                    usuario: true
                }
            });

        res.json({
            mensaje:
                "Turno cancelado correctamente.",
            turno: turnoCancelado
        });

    } catch (error) {
        next(error);
    }
};

// ==========================
// EXPORTAR
// ==========================

module.exports = {
    obtenerTurnos,
    crearTurno,
    crearReserva,
    actualizarTurno,
    cambiarEstadoTurno,
    eliminarTurno,
    cancelarTurno
};