import {z} from 'zod'

export const addNegocioSchema = z.object({
    tipo_negocio: z.string({
        required_error: "Tipo de negocio es requerido" 
    }),
    H_operacion: z.string({
        required_error: "Horario de operacion es requerido"
    }),
    descripcion: z.string({
        required_error: "La descripcion del negocio es requerida"
    }),
    nombre: z.string({
        required_error: "El nombre del negocio es requerido"
    }),
    direccion: z.string({
        required_error: "La direccion del negocio es requerida"
    }),
    telefono: z.string({
        required_error: "El telefono es requerido"
    }),
    correo: z.string({
        required_error: "El correo de contacto es requerido"
    }),
    imagen: z.string({
        required_error: "Una imagen del negocio es querida"
    })
})