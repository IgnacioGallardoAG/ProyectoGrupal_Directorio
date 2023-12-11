import express from 'express';
import { obtenerNegocios, obtenerNegocio} from '../controllers/negociosController.js';
import { authRequerida } from '../middlewares/validarToken.js';
const router = express.Router();

router.get('/mostrar', obtenerNegocios)
router.get('/mostrar/:id',obtenerNegocio)

export default router