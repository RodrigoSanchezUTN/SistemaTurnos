const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function corregirRol() {
    try {
        const usuario = await prisma.usuario.update({
            where: {
                id: 3
            },
            data: {
                rol: "Usuario"
            }
        });

        console.log("Rol corregido correctamente:");
        console.log({
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol
        });
    } catch (error) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}

corregirRol();