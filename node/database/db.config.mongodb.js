import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/bd_proyecto")
        console.log("conexion exitosa con mongodb")
    } catch (error) {
        console.error(error)
    }
}


