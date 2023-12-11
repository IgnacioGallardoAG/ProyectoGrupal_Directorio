import {Sequelize} from 'sequelize'


// conexion a la bd con sequelize
const db = new Sequelize('bd_proyecto', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
}) 

export default db;