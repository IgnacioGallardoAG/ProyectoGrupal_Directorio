/*===================IMPORTS======================*/

import express from 'express'
import cors from 'cors'
import path from 'path'
import db from './database/db.config.js'
import routesAuth from './routes/auth.routes.js'
import routesNegocio from './routes/negocios.routes.js'
import routerEventos from './routes/eventos.routes.js'
import routerTareas from './routes/tareas.routes.js'
import routerLugares from './routes/lugares.routes.js'
import bodyParser from 'body-parser'
import routerConsultas from './routes/consultas.routes.js'
import routerImagenes from './routes/images.routes.js'
import routerResenas from './routes/reseñas.routes.js'
import cookieParser from 'cookie-parser'
import { connectDB } from './database/db.config.mongodb.js'
import './models/relaciones.js'
import './models/relaciones2.js'

/*===================IMPORTS======================*/

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuración del enrutamiento estático para servir imágenes
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

try {
    await db.authenticate()
    console.log("Conexion exitosa a la DB")
} catch (error) {
    console.error("Error al conectar con la DB: " + error)
}

app.use('/auth', routesAuth)
app.use('/negocios', routesNegocio)
app.use('/consultas', routerConsultas)
app.use('/eventos', routerEventos)
app.use('/lugares', routerLugares)
app.use('/imagenes', routerImagenes)
app.use('/tareas', routerTareas)
app.use('/resenas', routerResenas)


connectDB();

const PORT = 4000
app.listen(PORT, () =>{
    console.log("listening on port http://localhost:" + PORT)
})