import {DataTypes} from 'sequelize'
import db from '../database/db.config.js'

const Usuario = db.define('usuarios', {
     nombre_usuario: {
          type: DataTypes.STRING,
          unique: true,
      },
     contraseña: {
       type: DataTypes.STRING,
     },
   },{timestamps:false,});

export default Usuario