
import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import usuariosRoutes from './routes/usuarios.routes.js';

app.use(usuariosRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});