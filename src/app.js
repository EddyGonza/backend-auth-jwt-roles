import express from "express";
import usuariosRoutes from "./routes/usuarios.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(express.json());
app.use("/auth", authRoutes);

// rutas
app.use("/usuarios", usuariosRoutes);

// prueba
app.get("/", (req, res) => {
  res.send("API funcionando ");
});

export default app;