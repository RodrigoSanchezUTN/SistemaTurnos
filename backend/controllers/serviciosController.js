const prisma = require("../config/prisma");

const obtenerServicios = async (req, res, next) => {
    try {
        const servicios = await prisma.servicio.findMany();

        res.json(servicios);
    } catch (error) {
        next(error);
    }
};


const crearServicio = async (req, res, next) => {
    try {
        const { nombre, precio, duracion } = req.body;

        // Validar campos obligatorios
        if (!nombre || precio === undefined || duracion === undefined) {
            return res.status(400).json({
                mensaje: "Nombre, precio y duración son obligatorios."
            });
        }

        // Convertir a números
        const precioNumero = Number(precio);
        const duracionNumero = Number(duracion);

        // Validar precio
        if (isNaN(precioNumero) || precioNumero <= 0) {
            return res.status(400).json({
                mensaje: "El precio debe ser un número mayor que 0."
            });
        }

        // Validar duración
        if (isNaN(duracionNumero) || duracionNumero <= 0) {
            return res.status(400).json({
                mensaje: "La duración debe ser un número mayor que 0."
            });
        }

        const servicio = await prisma.servicio.create({
            data: {
                nombre,
                precio: precioNumero,
                duracion: duracionNumero
            }
        });

        res.status(201).json(servicio);

    } catch (error) {
        next(error);
    }
};


const actualizarServicio = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                mensaje: "El ID del servicio no es válido."
            });
        }

        const { nombre, precio, duracion } = req.body;

        // Validar campos obligatorios
        if (!nombre || precio === undefined || duracion === undefined) {
            return res.status(400).json({
                mensaje: "Nombre, precio y duración son obligatorios."
            });
        }

        const precioNumero = Number(precio);
        const duracionNumero = Number(duracion);

        // Validar precio
        if (isNaN(precioNumero) || precioNumero <= 0) {
            return res.status(400).json({
                mensaje: "El precio debe ser un número mayor que 0."
            });
        }

        // Validar duración
        if (isNaN(duracionNumero) || duracionNumero <= 0) {
            return res.status(400).json({
                mensaje: "La duración debe ser un número mayor que 0."
            });
        }

        const servicio = await prisma.servicio.update({
            where: {
                id: id
            },
            data: {
                nombre,
                precio: precioNumero,
                duracion: duracionNumero
            }
        });

        res.json(servicio);

    } catch (error) {
        next(error);
    }
};


const eliminarServicio = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                mensaje: "El ID del servicio no es válido."
            });
        }

        await prisma.servicio.delete({
            where: {
                id: id
            }
        });

        res.json({
            mensaje: "Servicio eliminado correctamente."
        });

    } catch (error) {
        next(error);
    }
};


module.exports = {
    obtenerServicios,
    crearServicio,
    actualizarServicio,
    eliminarServicio
};