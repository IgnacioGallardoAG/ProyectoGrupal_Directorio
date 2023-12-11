import {TOKEN_SECRET} from '../config.js'
import jwt from "jsonwebtoken"

// esta funcion crea un token de acceso aleatorio y se verifica con un TOKEN_SECRET (seria como la clave de seguridad)
export function crearTokenDeAcceso(payload) {
    return new Promise((resolve, reject) =>{
        jwt.sign(
            payload,
            TOKEN_SECRET,
            {
                expiresIn: '5h',
            },
            (err, token) => {
                if (err) reject(err)
                resolve(token)
            }
        )
    })
}