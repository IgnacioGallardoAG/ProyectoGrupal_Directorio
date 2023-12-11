import express from 'express';
// aqui se importan todos los controladores (mantener algo de orden para evitar confusiones)
import { authRequerida } from '../middlewares/validarToken.js';
import {login, logout, profile, verificarToken, registerFunction} from '../controllers/authController.js'
import { validarSchema } from '../middlewares/validarDatos.js';
import { registerSchema, loginSchema } from '../schemas/authSchema.js';
const router = express.Router()

// ruta de negocios en proceso
// authRequerida funciona como un guardia de seguridad que te solicita una autorizacion para entrar a una pagina
router.get('/profile', authRequerida, profile)

//verificar token del cliente
router.get('/token', verificarToken)

// esta ruta es para las consultas del login (verificacion de usuario, contrasena y dar la respuesta en forma de un token)
router.post('/login', validarSchema(loginSchema), login)

// esta ruta es para las consultas del registro

router.post('/register', validarSchema(registerSchema), registerFunction)


router.post('/logout', logout)


export default router;
