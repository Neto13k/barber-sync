/**
 * Middleware de tratamento global de erros.
 * Deve ser o ÚLTIMO middleware registrado no server.js
 */
const errorHandler = (err, req, res, next) => {
    console.error('Erro:', err);

    // Erro de validação do Joi
    if (err.isJoi) {
        const errors = err.details.map(detail => ({
            field: detail.path.join('.'),
            message: detail.message
        }));
        return res.status(400).json({
            message: 'Erro de validação',
            errors
        });
    }

    // Erro de banco de dados - Email duplicado
    if (err.code === '23505') {
        return res.status(409).json({
            message: 'Este recurso já existe (violação de constraint única)'
        });
    }

    // Erro de banco de dados - Foreign key
    if (err.code === '23503') {
        return res.status(400).json({
            message: 'Referência inválida a outro recurso'
        });
    }

    // Erro genérico
    res.status(err.status || 500).json({
        message: err.message || 'Erro interno do servidor',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

module.exports = errorHandler;