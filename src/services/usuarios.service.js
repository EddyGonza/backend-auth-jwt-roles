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

export const updateUsuario = async (id, data) => {
  const { nombre, email, rol } = data;

  const result = await pool.query(
    'UPDATE usuarios SET nombre=$1, email=$2, rol=$3 WHERE id=$4 RETURNING *',
    [nombre, email, rol, id]
  );

  return result.rows[0];
};

export const deleteUsuario = async (id) => {
  const result = await pool.query(
    'DELETE FROM usuarios WHERE id=$1 RETURNING *',
    [id]
  );

  return result.rows[0];
};