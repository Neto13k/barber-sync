const Joi = require('joi');

const registerSchema = Joi.object({
    firstName: Joi.string().min(2).max(100).required().messages({
        'string.empty': 'Primeiro nome é obrigatório',
        'string.min': 'Primeiro nome deve ter no mínimo 2 caracteres',
        'string.max': 'Primeiro nome deve ter no máximo 100 caracteres',
    }),
    lastName: Joi.string().min(2).max(100).required().messages({
        'string.empty': 'Sobrenome é obrigatório',
        'string.min': 'Sobrenome deve ter no mínimo 2 caracteres',
        'string.max': 'Sobrenome deve ter no máximo 100 caracteres',
    }),
    email: Joi.string().email().required().messages({
        'string.empty': 'Email é obrigatório',
        'string.email': 'Email deve ser válido',
    }),
    password: Joi.string().min(8).required().messages({
        'string.empty': 'Senha é obrigatória',
        'string.min': 'Senha deve ter no mínimo 8 caracteres',
    }),
    isBarber: Joi.boolean().default(false),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.empty': 'Email é obrigatório',
        'string.email': 'Email deve ser válido',
    }),
    password: Joi.string().required().messages({
        'string.empty': 'Senha é obrigatória',
    }),
});

module.exports = {
    registerSchema,
    loginSchema,
};