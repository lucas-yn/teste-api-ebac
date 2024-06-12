const Joi = require('joi')

const usuariosSchema = Joi.object({
    usuarios: Joi.array().items({
        administrador: Joi.string(),
        email: Joi.string(),
        nome: Joi.string(),
        password: Joi.string(),
        _id: Joi.string()
    }),
    quantidade: Joi.number()
})

export default usuariosSchema;