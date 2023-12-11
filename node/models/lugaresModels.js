import db from "../database/db.config.js"
import { DataTypes } from "sequelize"


const Lugar = db.define('lugares', {
    nombre_lugar: {type : DataTypes.STRING},
    direccion_lugar: {type : DataTypes.STRING},
    descripcion_lugar: {type : DataTypes.STRING},
    imagen : {type : DataTypes.STRING},
}, {timestamps:false,})

export default Lugar;