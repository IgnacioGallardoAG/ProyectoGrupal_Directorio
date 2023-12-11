import db from '../database/db.config.js'  
import { DataTypes } from 'sequelize'

const ReseñaNegocio = db.define('resena_negocios', {
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_negocio: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fecha_reseña: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    comentario: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    calificacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {timestamps: false })

export default ReseñaNegocio