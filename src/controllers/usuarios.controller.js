import { createUsuario, getUsuarios, updateUsuario, deleteUsuario } 
from "../services/usuarios.service.js";


// CREATE
export const createUsuarioController = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({ error: "Faltan datos" });
    }

    const user = await createUsuario(req.body);

    delete user.password; 
    res.status(201).json(user);

  } catch (error) {
    console.error(error);

    if (error.code === "23505") {
      return res.status(400).json({ error: "Email ya existe" });
    }

    res.status(500).json({ error: "Error del servidor" });
  }
};

//GET
export const getUsuariosController = async (req, res) => {
  try {
    const users = await getUsuarios();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error del servidor" });
  }
};

export const updateUsuarioController = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, rol } = req.body;

    if (!nombre || !email || !rol) {
      return res.status(400).json({ error: "Faltan datos" });
    }

    const user = await updateUsuario(id, { nombre, email, rol });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(user);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar" });
  }
};

export const deleteUsuarioController = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await deleteUsuario(id);

    if (!deleted) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario eliminado" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar" });
  }
};