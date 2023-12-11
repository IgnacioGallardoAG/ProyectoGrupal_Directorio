import {z} from 'zod'

export const addLugarSchema = z.object({
    nombre_lugar: z.string({
        required_error: "El nombre del lugar es requerido"
    }),
    direccion_lugar: z.string({
        required_error: "La direccion del lugar es requerida"
    }),
    imagen: z.string({
        required_error: "La imagen del lugar es requerida"
    })
})