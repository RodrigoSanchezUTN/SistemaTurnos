const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function verHorarios() {
    try {
        const horarios = await prisma.horario.findMany({
            orderBy: {
                id: "asc"
            }
        });

        console.log(horarios);
    } catch (error) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}

verHorarios();
