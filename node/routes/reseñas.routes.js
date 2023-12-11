import express from 'express';
import { AgregarReseña, MostrarReseña, MostrarReseñas } from '../controllers/resenaNegocioController.js';
import { AgregarReseñaLugar, MostrarReseñaLugar, MostrarReseñasLugar } from '../controllers/resenaLugarController.js';
const router = express.Router()

// rutas resenas negocio
router.post('/add', AgregarReseña)
router.get('/', MostrarReseñas)
router.get('/:id', MostrarReseña)

// rutas resenas lugares
router.post('/lugar/add', AgregarReseñaLugar)
router.get('/lugar/mostrar', MostrarReseñasLugar)
router.get('/lugar/:id', MostrarReseñaLugar)

export default router