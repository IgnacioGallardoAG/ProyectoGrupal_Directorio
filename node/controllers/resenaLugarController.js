import ReseñaLugar from "../models/resenaLugarModel.js"
import Usuario from '../models/usuarioModel.js'
import Lugar from "../models/lugaresModels.js"


export const AgregarReseñaLugar = async (req, res) => {
   try {
        const {id_usuario, id_lugar, comentario, calificacion} = req.body

        const fecha_reseña = new Date()

        await crearReseña(id_usuario, id_lugar, fecha_reseña, comentario, calificacion)

        res.status(200).json({ success: true, message: "Reseña creada exitosamente" });
     
   } catch (error) {
        console.error("Error al crear una reseña", error)
        res.status(500).json({ success: false, error: 'Error al crear una reseña'});
   }
}

const crearReseña = async (id_usuario, id_lugar, fecha_reseña, comentario, calificacion) => {
    try {
        await ReseñaLugar.create({
            id_usuario: id_usuario,
            id_lugar: id_lugar,
            fecha_reseña: fecha_reseña,
            comentario: comentario,
            calificacion: calificacion,
        })
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const MostrarReseñasLugar = async (req, res) => {
    try {
        const resenas = await ReseñaLugar.findAll(
            {
                include: [
                    { model: Usuario, as: 'usuarios' },
                    { model: Lugar, as: 'lugares'}
                ]
            }
        )
        res.json(resenas)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Error al obtener las reseñas'})
    }
}

export const MostrarReseñaLugar = async (req, res) => {
    try {
        const resena = await ReseñaLugar.findByPk(req.params.id)
    
        if (!resena) return res.status(404).json({message: "Reseña no encontrada"})
        res.json(resena)

    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Error al obtener la reseña'})

    }
}