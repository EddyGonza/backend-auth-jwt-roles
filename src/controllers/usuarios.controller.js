import { createUsuario, getUsuarios,updateUserRole } from "../services/usuarios.service.js";


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


//UPDATE
export const updateUserRoleController = async (req,res) => {
  try {
    const {id} = req.params;
    const {rol} = req.body;

    //VALIDACION BASICA
    if(req.user.id == id){
      return res.status(400).json({error:"No puedes cambiar tu propio rol"});
    }
    if (!rol){
      return res.status(400).json ({error: "Rol requerido"});
    }

    if(!["admin", "user"].includes(rol)){
      return res.status(400).json({error: "rol inválido"});
    }
    const user = await updateUserRole(id,rol);

    if (!user){
      return res.status(400).json({error: "Usuario no encontrado"})
    }

    res.json({
      message: "rol actualizado",
      user,
    });
  }catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error del servidor" });
  }
};