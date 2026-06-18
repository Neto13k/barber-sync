/**
 * Middleware para validar requisições usando Joi schemas.
 * Se a validação falhar, retorna 400 com detalhes dos erros.
 */
const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true,
            convert: true, // Converte tipos automaticamente
        });

        if (error) {
            const errors = error.details.map(detail => ({
                field: detail.path.join('.'),
                message: detail.message,
                type: detail.type,
            }));
            
            return res.status(400).json({ 
                message: 'Validação falhou',
                errors,
            });
        }

        req.validatedData = value;
        next();
    };
};

module.exports = validateRequest;