import Negocio from '../models/negociosModels.js'
import { Sequelize } from "sequelize"
import multer from 'multer'

export const obtenerNegocios = async (req, res) => {
    try {
        const negocios = await Negocio.findAll()
        res.json(negocios)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Error al obtener negocios'})
    }
}

export const obtenerNegocio = async (req, res) => {
    const negocio = await Negocio.findByPk(req.params.id)

    if (!negocio) return res.status(404).json({message: "Negocio no encontrado"})
    
    console.log(negocio)
    res.json(negocio)
}

export const AgregarNegocio = async (req, res) => {
    try {
        const {tipo_negocio, H_operacion, descripcion, nombre, direccion, telefono, correo} = req.body;
        const imagenPath = req.file.filename
        
    const negocioExistente = await verificarNegocio(nombre, tipo_negocio)

    if (negocioExistente) {
        return res.status(409).json({message: "El negocio ya existe"})
    }

    // se llama a la funcion para crear el negocio
    await crearNegocio(tipo_negocio, H_operacion, descripcion, nombre, direccion, telefono, correo, imagenPath)

    res.status(200).json({ success: true, message: 'Negocio creado exitosamente' });

    } catch (error) {
        console.error('Error al crear un negocio', error)
        res.status(500).json({ success: false, error: 'Error al crear un negocio'})
    }
}

export const crearNegocio = async (param_tipo_negocio, param_H_operacion, param_descripcion, param_nombre, param_direccion, param_telefono, param_correo, imagenPath) => {

    try {
        await Negocio.create({
            tipo_negocio: param_tipo_negocio,
            H_operacion: param_H_operacion,
            descripcion: param_descripcion,
            nombre: param_nombre,
            direccion: param_direccion,
            telefono: param_telefono,
            correo: param_correo,
            imagen: imagenPath,
        })
    } catch (error) {
        throw error
    }
}


export const verificarNegocio = async (nombre_negocio, tipoNegocio) => {
    try {
        const negocio = await Negocio.findOne({
            where: {
              [Sequelize.Op.or]: [
                { nombre: nombre_negocio }, 
                { tipo_negocio: tipoNegocio },
              ],
            },
        })
        return !!negocio
    } catch (error) {
        throw error
    }
}

export const actualizarNegocio = async (req, res) => {
    try {
        const negocio = await Negocio.findByPk(req.params.id)
        
        if (!negocio) return res.status(400).json({message: "Negocio no encontrado"})
        
        const {tipo_negocio, H_operacion, descripcion, nombre, direccion, telefono, correo} = req.body;
        
        await negocio.update({
            tipo_negocio: tipo_negocio,
            H_operacion: H_operacion,
            descripcion: descripcion,
            nombre: nombre,
            direccion: direccion,
            telefono: telefono,
            correo: correo,
        })
        
        res.status(200).json({ success: true, message: 'Negocio actualizado exitosamente' });
        
    } catch (error) {
        console.error('Error al actualizar un negocio', error)
        res.status(500).json({ success: false, error: 'Error al actualizar un negocio'})
    }
}

export const eliminarNegocio = async (req, res) => {
    try {
        const negocio = await Negocio.findByPk(req.params.id)
        
        if (!negocio) return res.status(400).json({message: "Negocio no encontrado"})
        
        await negocio.destroy()
        
        res.status(200).json({ success: true, message: 'Negocio eliminado exitosamente' });
        
    } catch (error) {
        console.error('Error al eliminar un negocio', error)
        res.status(500).json({ success: false, error: 'Error al eliminar un negocio'})
    }
}


const almacenarImagen = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images/negocios_images/")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
})

export const subirImagenNegocio = multer({storage: almacenarImagen})