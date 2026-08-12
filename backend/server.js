const express = require("express");
const cors = require("cors");

const clientesRoutes = require("./routes/clientes");
const serviciosRoutes = require("./routes/servicios");
const turnosRoutes = require("./routes/turnos");
const usuariosRoutes = require("./routes/usuarios");
const authRoutes = require("./routes/auth");

const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Servidor funcionando.");
});

app.use("/clientes", clientesRoutes);
app.use("/servicios", serviciosRoutes);
app.use("/turnos", turnosRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/auth", authRoutes);

app.use(errorMiddleware);

app.listen(3000, () => {
    console.log("Servidor iniciado en el puerto 3000.");
});