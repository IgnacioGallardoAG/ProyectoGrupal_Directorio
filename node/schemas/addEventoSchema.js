import Joi from 'joi';

const validarEvento = (evento) => {
    const schema = Joi.object({
        direccion_evento: Joi.string().required().trim(),
        nombre_evento: Joi.string().required().trim(),
        fecha_hora: Joi.date().required(),
        descripcion_evento: Joi.string().required().trim(),
        imagen: Joi.string()
    });
    return schema.validarEvento(evento);
};

export { validarEvento };