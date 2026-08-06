const express = require("express");
const prisma = require("../config/prisma");

const router = express.Router();

router.get("/", async (req, res) => {
    const clientes = await prisma.cliente.findMany();

    res.json(clientes);
});

router.post("/", async (req, res) => {
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
});

module.exports = router;