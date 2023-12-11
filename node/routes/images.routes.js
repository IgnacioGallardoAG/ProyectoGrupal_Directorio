import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import subir from '../middlewares/multer.js';
import Usuario from '../models/usuarioModel.js';
import Negocio from '../models/negociosModels.js';
import Lugar from '../models/lugaresModels.js';
import Evento from '../models/eventosModel.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

router.post('/perfil/:id/images', subir.single('imagen'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send("No se ha subido ninguna imagen");
    }

    try {
        const usuarioId = req.params.id;
        const usuarioEncontrado = await Usuario.findByPk(usuarioId);

        if (!usuarioEncontrado) {
            return res.status(404).send("No se encontrado el usuario");
        }

        // Verificar si la nueva imagen es diferente de la actual
        const nuevaImagenURL = `images/profile_images/${req.file.filename}`;
        if (usuarioEncontrado.imagen === nuevaImagenURL) {
            return res.status(400).json({ error: "La nueva imagen es la misma que la actual" });
        }

        usuarioEncontrado.imagen = req.file.path;
        await usuarioEncontrado.update({ imagen: req.file.filename });
        await usuarioEncontrado.save();

        res.status(200).json({ url: nuevaImagenURL, message: "Imagen subida con éxito" });
        console.log(usuarioId);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al actualizar la imagen de perfil");
    }
});


router.get('/obtenerImageURL/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const imagenURL = usuario.imagen;

        if (!imagenURL) {
            return res.status(404).json({ error: 'Imagen no existe' });
        }

        const imgUrlCompleta = `/images/profile_images/${imagenURL}`;

        console.log(imgUrlCompleta);
        res.json(imgUrlCompleta);
    } catch (error) {
        console.error("Error al obtener la URL de la imagen", error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.get('/getNegocioURL/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const negocio = await Negocio.findByPk(id);

        if (!negocio) {
            return res.status(404).json({ error: 'Negocio no encontrado' });
        }

        console.log(negocio.imagen)
        const imagenURL = negocio.imagen;

        if (!imagenURL) {
            return res.status(404).json({ error: 'Imagen no existe' });
        }

        const imgUrlCompleta = `/images/negocios_images/${imagenURL}`;

        console.log(imgUrlCompleta);
        res.json(imgUrlCompleta);
    } catch (error) {
        console.error("Error al obtener la URL de la imagen", error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.get('/getLugarURL/:id', async (req, res) => {
    const id = req.params.id

    try {
        const lugar = await Lugar.findByPk(id)

        if(!lugar) {
            return res.status(404).json({error: 'Negocio no encontrado'})
        }

        console.log(lugar.imagen)
        const imagenURL = lugar.imagen

        if(!imagenURL) {
            return res.status(404).json({error: 'Imagen no existe'})
        }

        const imgUrlCompleta = `/images/lugares_images/${imagenURL}`;

        res.json(imgUrlCompleta)

    } catch (error) {
        console.error("Errror al obtener la URL de la imagen", error)
        res.status(500).json({error: "Error interno del servidor", error})
    }
})

router.get('/getEventoURL/:id', async (req, res) => {
    const id = req.params.id

    try {
        const lugar = await Evento.findById(id)

        if(!lugar) {
            return res.status(404).json({error: 'Negocio no encontrado'})
        }

        console.log(lugar.imagen)
        const imagenURL = lugar.imagen

        if(!imagenURL) {
            return res.status(404).json({error: 'Imagen no existe'})
        }

        const imgUrlCompleta = `/images/eventos_images/${imagenURL}`;

        res.json(imgUrlCompleta)

    } catch (error) {
        console.error("Errror al obtener la URL de la imagen", error)
        res.status(500).json({error: "Error interno del servidor", error})
    }
})



export default router;
