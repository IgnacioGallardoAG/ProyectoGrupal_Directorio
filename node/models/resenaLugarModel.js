import db from '../database/db.config.js'  
import { DataTypes } from 'sequelize'

const ReseñaLugar = db.define('resena_lugars', {
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_lugar: {
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

export default ReseñaLugar