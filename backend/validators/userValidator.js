const Joi = require('joi');

const userValidator = {
    register: (data) => {
        const schema = Joi.object({
            firstName: Joi.string().min(2).max(100).required(),
            lastName: Joi.string().min(2).max(100).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
            isBarber: Joi.boolean().require