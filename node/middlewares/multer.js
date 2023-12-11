import db from '../database/db.config.js'
import multer from 'multer'

const almacenamiento =  multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/profile_images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})

const subir = multer({ storage: almacenamiento })

db.sync()

export default subir
