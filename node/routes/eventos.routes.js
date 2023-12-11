import express from 'express';
import { obtenerEvento, obtenerEventos,AgregarEvento } from '../controllers/eventoController.js';

const router = express.Router();

router.get('/mostrar', obtenerEventos);
router.get('/mostrar/:id', obtenerEvento);
router.post('/add', AgregarEvento)

export default router;