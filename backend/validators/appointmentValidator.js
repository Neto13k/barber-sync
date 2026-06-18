const Joi = require('joi');

const createAppointmentSchema = Joi.object({
    serviceId: Joi.number().integer().positive().required().messages({
        'number.base': 'serviceId deve ser um número',
        'number.positive': 'serviceId deve ser positivo',
        'any.required': 'serviceId é obrigatório',
    }),
    appointmentDate: Joi.date().iso().required().messages({
        'date.base': 'appointmentDate deve ser uma data válida (ISO 8601)',
        'any.required': 'appointmentDate é obrigatório',
    }),
    notes: Joi.string().max(500).optional().messages({
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