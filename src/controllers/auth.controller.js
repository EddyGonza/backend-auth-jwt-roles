import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByEmail } from "../services/auth.service.js";


export const loginController = async (req,res) => {
    try{

    if(!req.body){
        return res.status(400).json({error:"body requerido"});
    }
    
    const{email, password}= req.body;
    if (!email || !password){
        return res.status(400).json({error:"Faltan credenciales"});
    }

    const user = await findUserByEmail(email);

    if (!user){
        return res.status(401).json({error:"Usuario no existe"});
    }
    const isMatch = await bcrypt.compare(password,user.password);

    if (!isMatch){
        return res.status(401).json({error:"password incorrecto"})
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            rol: user.rol
        },
        "secreto_super_seguro",
        { expiresIn: "1h" }
    );

    res.json({
        message:"Login exitoso",
        token
    });

} catch (error){
    console.error(error);
    res.status(500).json({error: "Error del servidor"});
}
};