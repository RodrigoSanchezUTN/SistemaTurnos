const express = require("express");
const cors = require("cors");

const clientesRoutes = require("./routes/clientes");

const app = express();



app.use(cors());
app.use(express.json());
app.use("/clientes", clientesRoutes);

app.get("/", (req, res) => {
    res.json({
        mensaje: "El servidor funciona correctamente."
    });
});

app.listen(3000, () => {
    console.log("Servidor iniciado en el puerto 3000.");
});