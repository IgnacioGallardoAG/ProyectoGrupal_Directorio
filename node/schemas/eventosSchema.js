import mongoose from 'mongoose';

// Definición del esquema para los eventos
const eventosSchema = new mongoose.Schema({
    direccion_evento: {
        type: String,
        required: [true, 'La dirección del evento es obligatoria'],
        trim: true
    },
    nombre_evento: {
        type: String,
        required: [true, 'El nombre del evento es obligatorio'],
        trim: true
    },
    fecha_hora: {
        type: Date,
        required: [true, 'La fecha y hora del evento son obligatorias']
    },
    descripcion_evento: {
        type: String,
        required: [true, 'La descripción del evento es obligatoria'],
        trim: true
    },
    imagen: {
        type: String,
        required: false // Haciendo que la imagen no sea obligatoria
    }
}, {
    timestamps: true // Agrega campos createdAt y updatedAt automáticamente
});

// Creando y exportando el modelo basado en el esquema
export default mongoose.model('Evento', eventosSchema);