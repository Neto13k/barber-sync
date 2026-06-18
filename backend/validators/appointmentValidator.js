const Joi = require('joi');

const createAppointmentSchema = Joi.object({
    serviceId: Joi.alternatives()
        .try(Joi.number().integer().positive(), Joi.string().pattern(/^\d+$/))
        .required()
        .messages({
            'any.required': 'serviceId é obrigatório',
        }),
    appointmentDate: Joi.alternatives()
        .try(Joi.date().iso(), Joi.date())
        .required()
        .messages({
            'date.base': 'appointmentDate deve ser uma data válida',
            'any.required': 'appointmentDate é obrigatório',
        }),
    notes: Joi.string().max(500).allow('').optional().messages({
        'string.max': 'Notas não podem ter mais de 500 caracteres',
    }),
});

const updateAppointmentSchema = Joi.object({
    status: Joi.string()
        .valid('pending', 'confirmed', 'completed', 'cancelled')
        .required()
        .messages({
            'any.only': 'Status deve ser: pending, confirmed, completed ou cancelled',
            'any.required': 'Status é obrigatório',
        }),
});

module.exports = {
    createAppointmentSchema,
    updateAppointmentSchema,
};