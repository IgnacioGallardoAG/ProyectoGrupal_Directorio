import ReseñaNegocio from "../models/resenaNegocioModel.js";
import Usuario from '../models/usuarioModel.js'
import Negocio from "../models/negociosModels.js";

export const AgregarReseña = async (req, res) => {
   try {
        const {id_usuario, id_negocio, comentario, calificacion} = req.body

        const fecha_reseña = new Date()

        await crearReseña(id_usuario, id_negocio, fecha_reseña, comentario, calificacion)

        res.status(200).json({ success: true, message: "Reseña creada exitosamente" });
     
   } catch (error) {
        console.error("Error al crear una reseña", error)
        res.status(500).json({ success: false, error: 'Error al crear una reseña'});
   }
}

const crearReseña = async (id_usuario, id_negocio, fecha_reseña, comentario, calificacion) => {
    try {
        await ReseñaNegocio.create({
            id_usuario: id_usuario,
            id_negocio: id_negocio,
            fecha_reseña: fecha_reseña,
            comentario: comentario,
            calificacion: calificacion,
        })
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const MostrarReseñas = async (req, res) => {
    try {
        const resenas = await ReseñaNegocio.findAll(
            {
                include: [
                    { model: Usuario, as: 'usuario' },
                    { model: Negocio, as: 'negocio'}
                ]
            }
        )
        res.json(resenas)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Error al obtener las reseñas'})
    }
}

export const MostrarReseña = async (req, res) => {
    try {
        const resena = await ReseñaNegocio.findByPk(req.params.id)
    
        if (!resena) return res.status(404).json({message: "Reseña no encontrada"})
        res.json(resena)

    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Error al obtener la reseña'})

    }
}