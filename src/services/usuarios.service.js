import { pool } from "../config/db.js";
import bcrypt from "bcrypt";

export const createUsuario = async ({ nombre, email, password }) => {
    const hashedpassword = await bcrypt.hash(password,10);

   const result = await pool.query(
  "INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3) RETURNING *",
  [nombre, email, hashedpassword]
  
);
  return result.rows[0];
}

export const getUsuarios = async () => {
    const result= await pool.query(
        "SELECT id, nombre, email, rol from usuarios"
    );
    return result.rows;
}

export const updateUserRole = async (id,rol) => {
    const result = await pool.query(
      "UPDATE usuarios SET rol = $1 WHERE id = $2 RETURNING id, nombre, email, rol",
    [rol, id]  
    );
    return result.rows[0];
};



