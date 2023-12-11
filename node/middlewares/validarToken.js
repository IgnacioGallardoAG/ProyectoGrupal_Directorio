import jwt  from "jsonwebtoken"
import { TOKEN_SECRET } from "../config.js"



// Esta funcion valida el token de acceso
export const authRequerida = (req, res, next) => {
    const {token} = req.cookies

    if (!token) {
        return res.status(401).json({message: "No posee token, denegado"})
    }

    jwt.verify(token, TOKEN_SECRET, (err, usuarioValidado) => {
        if(err) return res.status(403).json({message: "Token Invalido"})
        req.user = usuarioValidado
        console.log(req.user.usuarioId)
        next()
    })

}