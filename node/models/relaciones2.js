import Usuario from './usuarioModel.js';
import Lugar from './lugaresModels.js'
import ReseñaLugar from './resenaLugarModel.js';

Usuario.hasMany(ReseñaLugar, {foreignKey: 'id_usuario', as: 'reseña'})
Lugar.hasMany(ReseñaLugar, { foreignKey: 'id_lugar', as: 'reseña' })

ReseñaLugar.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'usuarios' })
ReseñaLugar.belongsTo(Lugar, { foreignKey: 'id_lugar', as: 'lugares' })