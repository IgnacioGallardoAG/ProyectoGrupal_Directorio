import Usuario from './usuarioModel.js';
import Negocio from './negociosModels.js';
import Lugar from './lugaresModels.js'

import ReseñaNegocio from './resenaNegocioModel.js';
import ReseñaLugar from './resenaLugarModel.js';


// negocios

Usuario.hasMany(ReseñaNegocio, { foreignKey: 'id_usuario', as: 'reseñas' });
Negocio.hasMany(ReseñaNegocio, { foreignKey: 'id_negocio', as: 'reseñas' });

ReseñaNegocio.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'usuario' });
ReseñaNegocio.belongsTo(Negocio, { foreignKey: 'id_negocio', as: 'negocio' });


// lugares 
/*
Usuario.hasMany(ReseñaLugar, {foreignKey: 'id_usuario', as: 'reseña'})
Lugar.hasMany(ReseñaLugar, { foreignKey: 'id_lugar', as: 'reseña' });

ReseñaNegocio.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'usuarios' });
ReseñaNegocio.belongsTo(Lugar, { foreignKey: 'id_lugar', as: 'lugar' }); */