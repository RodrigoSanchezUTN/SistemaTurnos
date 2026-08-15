const prisma = require("../config/prisma");

const DIAS_VALIDOS = [
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
    "sabado",
    "domingo"
];

// ==========================
// OBTENER HORARIOS
// ==========================

const obtenerHorarios = async (req, res, next) => {
    try {
        // ==========================
        // OBTENER ADMINISTRADOR
        // ==========================

        const administrador =
            await prisma.usuario.findFirst({
                where: {
                    rol: "Administrador"
                },
                select: {
                    id: true
                }
            });

        if (!administrador) {
            return res.status(404).json({
                mensaje:
                    "No se encontró el administrador del negocio."
            });
        }

        // ==========================
        // OBTENER HORARIOS DEL NEGOCIO
        // ==========================

        const horarios =
            await prisma.horario.findMany({
                where: {
                    usuarioId:
                        administrador.id
                },
                orderBy: {
                    id: "asc"
                }
            });

        res.json(horarios);

    } catch (error) {
        next(error);
    }
};


// ==========================
// GUARDAR HORARIOS
// ==========================

const guardarHorarios = async (req, res, next) => {
    try {
        const horarios = req.body;

        if (
            !horarios ||
            typeof horarios !== "object" ||
            Array.isArray(horarios)
        ) {
            return res.status(400).json({
                mensaje: "La configuración de horarios no es válida."
            });
        }

        const resultados = [];

        for (const dia of DIAS_VALIDOS) {
            const configuracion = horarios[dia];

            if (!configuracion) {
                continue;
            }

            const activo = Boolean(configuracion.activo);

            const inicio = configuracion.inicio || "";
            const fin = configuracion.fin || "";
            const inicio2 = configuracion.inicio2 || null;
            const fin2 = configuracion.fin2 || null;

            const horario = await prisma.horario.upsert({
                where: {
                    usuarioId_dia: {
                        usuarioId: req.usuario.id,
                        dia
                    }
                },
                update: {
                    activo,
                    inicio,
                    fin,
                    inicio2,
                    fin2
                },
                create: {
                    dia,
                    activo,
                    inicio,
                    fin,
                    inicio2,
                    fin2,
                    usuarioId: req.usuario.id
                }
            });

            resultados.push(horario);
        }

        res.json({
            mensaje: "Horarios actualizados correctamente.",
            horarios: resultados
        });

    } catch (error) {
        next(error);
    }
};


module.exports = {
    obtenerHorarios,
    guardarHorarios
};