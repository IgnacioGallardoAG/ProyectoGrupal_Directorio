import { Sequelize } from "sequelize";
import Lugar from '../models/lugaresModels.js';
import multer from 'multer';

export const obtenerLugares = async (req, res) => {
    try {
        const lugares = await Lugar.findAll()
        res.json(lugares)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Error al obtener lugares'})
    }
}

export const obtenerLugar = async (req, res) => {
    const lugar = await Lugar.findByPk(req.params.id)

    if (!lugar) return res.status(404).json({message: "Lugar no encontrado"})
    
    res.json(lugar)
}

export const AgregarLugar = async (req, res) => {
    try {
        const {nombre_lugar, direccion_lugar, descripcion_lugar} = req.body;
        const imagenPath = req.file.filename
    
    const lugarExistente = await verificarLugar(nombre_lugar)

    if (lugarExistente) {
        return res.status(409).json({message: "El lugar ya existe"})
    }

    // se llama a la funcion para crear el negocio
    await crearLugar(nombre_lugar, direccion_lugar, descripcion_lugar, imagenPath)

    res.status(200).json({ success: true, message: 'Lugar creado exitosamente' });

    } catch (error) {
        console.error('Error al crear un lugar', error)
        res.status(500).json({ success: false, error: 'Error al crear un lugar'})
    }
}

export const crearLugar = async (param_nombre_lugar, param_direccion_lugar, param_descripcion_lugar, imagenPath) => {

    try {
        await Lugar.create({
            nombre_lugar: param_nombre_lugar,
            direccion_lugar: param_direccion_lugar,
            descripcion_lugar: param_descripcion_lugar,
            imagen: imagenPath,
        })
    } catch (error) {
        throw error
    }
}


export const verificarLugar = async (nombre_lugar) => {
    try {
        const lugar = await Lugar.findOne({
            where: {
              [Sequelize.Op.or]: [
                { nombre_lugar: nombre_lugar }, 
              ],
            },
        })
        return !!lugar
    } catch (error) {
        throw error
    }
}

export const actualizarLugar = async (req, res) => {
    try {
        const lugar = await Lugar.findByPk(req.params.id)
        
        if (!lugar) return res.status(400).json({message: "Lugar no encontrado"})
        
        const {nombre_lugar, direccion_lugar, descripcion_lugar} = req.body;
        
        const lugarExistente = await verificarLugar(nombre_lugar)
        
        if (lugarExistente) {
            return res.status(400).json({message: "Lugar existente encontrado"})
        }
        
        await lugar.update({
            nombre_lugar: nombre_lugar,
            direccion_lugar: direccion_lugar,
            descripcion_lugar: descripcion_lugar,
        })
        
        res.status(200).json({ success: true, message: 'Lugar actualizado exitosamente' });
        
    } catch (error) {
        console.error('Error al actualizar un lugar', error)
        res.status(500).json({ success: false, error: 'Error al actualizar un lugar'})
    }
}

export const eliminarLugar = async (req, res) => {
    try {
        const lugar = await Lugar.findByPk(req.params.id)
        
        if (!lugar) return res.status(400).json({message: "Lugar no encontrado"})
        
        await lugar.destroy()
        
        res.status(200).json({ success: true, message: 'Lugar eliminado exitosamente' });
        
    } catch (error) {
        console.error('Error al eliminar un lugar', error)
        res.status(500).json({ success: false, error: 'Error al eliminar un lugar'})
    }
}

const almacenarImagen = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images/lugares_images/")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
})

export const subirImagenLugar = multer({storage: almacenarImagen})
