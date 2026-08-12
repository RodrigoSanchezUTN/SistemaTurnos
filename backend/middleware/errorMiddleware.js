const errorMiddleware = (err, req, res, next) => {
    console.error(err);

    if (err.code === "P2002") {
        return res.status(409).json({
            mensaje: "Ya existe un registro con ese dato."
        });
    }

    if (err.code === "P2025") {
        return res.status(404).json({
            mensaje: "El registro solicitado no existe."
        });
    }

    return res.status(500).json({
        mensaje: "Ocurrió un error interno en el servidor."
    });
};

module.exports = errorMiddleware;