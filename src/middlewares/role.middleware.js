export const roleMiddleware = (rolesPermitidos) =>{
    return (req,res,next) => {
        try {
            const user = req.user;

            if(!user){
                return res.status(401).json({error:"No autenticado"});
            }

            if(!rolesPermitidos.includes(user.rol)){
                return res.status(403).json({error: "Acceso denegado"});
            }
            next();
        }catch(error){
            return res.status(500).json({error:"Error del servidor"});
        }
    };
} ;