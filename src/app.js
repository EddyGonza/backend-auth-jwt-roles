import express from "express";
import usuariosRoutes from "./routes/usuarios.routes.js";
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";

const app = express();

app.use(cors()); // 👈 PRIMERO
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/usuarios", usuariosRoutes);

// prueba
app.get("/", (req, res) => {
  res.send("API funcionando ");
});

export default app;