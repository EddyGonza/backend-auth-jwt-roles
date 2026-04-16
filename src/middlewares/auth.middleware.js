import jwt from "jsonwebtoken"

export const authMiddleware = (req,res,next) => {
    try{
        const authHeader = req.headers["authorization"];
        console.log("HEADER:",authHeader);
    
    if (!authHeader){
        return res.status(401).json({error:"token requerido"})
    }

    const token = authHeader.split(" ")[1];
    console.log("TOKEN", token);

    if(!token){
        return res.status(401).json({error: "token invalido"});
    }

    const decoded = jwt.verify(token,"secreto_super_seguro")
    
    req.user = decoded;

    next();

}catch (error){
    console.error("JWT ERROR",error.message);
    return res.status(401).json({error: "token invalido o expirado"});
}
};
