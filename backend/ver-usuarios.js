const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function verUsuarios() {
    try {
        const usuarios = await prisma.usuario.findMany({
            select: {
                id: true,
                nombre: true,
                email: true,
                rol: true
            }
        });

        console.log(usuarios);
    } catch (error) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}

verUsuarios();