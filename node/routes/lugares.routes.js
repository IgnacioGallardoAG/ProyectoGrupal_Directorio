import express from 'express';
import { obtenerLugares, obtenerLugar,AgregarLugar } from '../controllers/lugaresController.js';

const router = express.Router();

router.get('/mostrar', obtenerLugares);
router.get('/mostrar/:id', obtenerLugar);
router.post('/add', AgregarLugar)

export default router;