
import {Router} from 'express'
import { subirImagenNegocio } from '../controllers/negociosController.js'
import { subirImagenLugar } from '../controllers/lugaresController.js'
import { authRequerida } from '../middlewares/validarToken.js'
import { AgregarNegocio, obtenerNegocio, obtenerNegocios, eliminarNegocio, actualizarNegocio } from '../controllers/negociosController.js'
import { subirImagenEvento } from '../controllers/eventoController.js'
import { AgregarEvento, obtenerEvento, obtenerEventos, eliminarEvento, actualizarEvento } from '../controllers/eventoController.js'
import { obtenerLugares, obtenerLugar, AgregarLugar, actualizarLugar, eliminarLugar } from '../controllers/lugaresController.js'
const router = Router()

// rutas para el dashboard de negocios
router.get('/negocios', authRequerida, obtenerNegocios)
router.get('/negocios/:id', authRequerida, obtenerNegocio)
router.post('/negocios/add', subirImagenNegocio.single('imagen'), authRequerida, AgregarNegocio)
router.delete('/negocios/delete/:id', eliminarNegocio)
router.put('/negocios/update/:id', authRequerida, actualizarNegocio)

// rutas para el dashboard de eventos
router.get('/eventos', authRequerida, obtenerEventos)
router.get('/eventos/:id', authRequerida, obtenerEvento)
router.post('/eventos/add', subirImagenEvento.single('imagen'), authRequerida, AgregarEvento)
router.delete('/eventos/delete/:id', eliminarEvento)
router.put('/eventos/update/:id', authRequerida, actualizarEvento)

// rutas para el dashboard de lugares
router.get('/lugares', authRequerida, obtenerLugares)
router.get('/lugares/:id', authRequerida, obtenerLugar)
router.post('/lugares/add', subirImagenLugar.single('imagen'), authRequerida, AgregarLugar)
router.delete('/lugares/delete/:id', authRequerida ,eliminarLugar)
router.put('/lugares/update/:id', authRequerida, actualizarLugar)

export default router
