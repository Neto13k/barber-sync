const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido!' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token Inválido' });
        }
        req.user = user;
        next();
    });
}

function criarMocks(headers = {}) {
    const req = { headers };
    const res = {
        statusCode: null,
        body: null,
        status(code) { this.statusCode = code; return this; },
        json(data) { this.body = data; return this; },
    };
    const next = jest.fn();
    return { req, res, next };
}

describe('authMiddleware', () => {

    test('deve retornar 401 quando nenhum token é enviado', () => {
        const { req, res, next } = criarMocks();
        authMiddleware(req, res, next);
        expect(res.statusCode).toBe(401);
        expect(res.body.message).toBe('Token não fornecido!');
        expect(next).not.toHaveBeenCalled();
    });

    test('deve retornar 403 quando o token é inválido', () => {
        const { req, res, next } = criarMocks({
            authorization: 'Bearer token_completamente_invalido'
        });
        authMiddleware(req, res, next);
        expect(res.statusCode).toBe(403);
        expect(res.body.message).toBe('Token Inválido');
        expect(next).not.toHaveBeenCalled();
    });

    test('deve retornar 403 quando o token está expirado', () => {
        const tokenExpirado = jwt.sign(
            { userId: 1, isBarber: false },
            process.env.JWT_SECRET,
            { expiresIn: 0 }
        );
        const { req, res, next } = criarMocks({
            authorization: `Bearer ${tokenExpirado}`
        });
        authMiddleware(req, res, next);
        expect(res.statusCode).toBe(403);
        expect(next).not.toHaveBeenCalled();
    });

    test('deve chamar next() e popular req.user com token válido', () => {
        const payload = { userId: 42, isBarber: false };
        const tokenValido = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        const { req, res, next } = criarMocks({
            authorization: `Bearer ${tokenValido}`
        });
        authMiddleware(req, res, next);
        expect(next).toHaveBeenCalledTimes(1);
        expect(req.user.userId).toBe(42);
        expect(req.user.isBarber).toBe(false);
    });

    test('deve chamar next() para token de barbeiro', () => {
        const tokenBarbeiro = jwt.sign(
            { userId: 7, isBarber: true },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        const { req, res, next } = criarMocks({
            authorization: `Bearer ${tokenBarbeiro}`
        });
        authMiddleware(req, res, next);
        expect(next).toHaveBeenCalledTimes(1);
        expect(req.user.isBarber).toBe(true);
    });

});
