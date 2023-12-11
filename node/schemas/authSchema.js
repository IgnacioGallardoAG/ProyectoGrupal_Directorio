import {z} from 'zod'
// validacion de los datos del registro
export const registerSchema = z.object({
    nombre_usuario: z.string({
        required_error: "Nombre de usuario es requerido"
    }),
    correo_usuario: z.string({
        required_error: "Correo es requerido"
    }).email({
        message: "Correo invalido"
    }),
    contraseña: z.string({
        required_error: "Contraseña es requerida" 
    }).min(6,{
        message: "La contraseña debe tener un minimo de 6 caracteres"
    })
})
// validacion de los datos del login
export const loginSchema = z.object({
    nombre_usuario: z.string({
        required_error: "Nombre de usuario es requerido",
    }),
    contraseña: z.string({
        required_error: "Contraseña es requerida"
    }).min(6,{
        message: "La contraseña debe tener un minimo de 6 caracteres"
    }),
})