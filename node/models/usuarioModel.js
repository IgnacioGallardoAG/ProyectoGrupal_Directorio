import db from '../database/db.config.js'
import { DataTypes } from 'sequelize'

const Usuario = db.define('usuarios', {
  contraseña: {
    type: DataTypes.STRING,
  },
  correo_usuario: { 
    type: DataTypes.STRING,
    unique: true,
  },
  nombre_usuario: {
    type: DataTypes.STRING,
    unique: true,
  },
  rango: {
    type: DataTypes.STRING,
    defaultValue: "usuario",
  },
  imagen: {
    type: DataTypes.STRING,
  }
},{timestamps:false,});

export default Usuario;
