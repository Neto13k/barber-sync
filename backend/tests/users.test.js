const request = require('supertest');
const bcrypt = require('bcrypt');
const app = require('./app');

jest.mock('../database/barber_sync', () => ({
    query: jest.fn(),
}));

const pool = require('../database/barber_sync');

/**
Limpa os mocks antes de cada teste.
*/
beforeEach(() => {
    jest.clearAllMocks();
});

/**
Testes para a rota POST /users/register.
*/
describe('POST /users/register', () => {

    test('deve cadastrar um usuário com sucesso e retornar 201', async () => {
        pool.query.mockResolvedValue({
            rows: [{ id: 1, email: 'jose@email.com' }]
        });

        const res = await request(app)
            .post('/users/register')
            .send({
                firstName: 'Jose',
                lastName: 'Neto',
                email: 'jose@email.com',
                password: 'senha123',
                isBarber: false,
            });

        expect(res.status).toBe(201);
        expect(res.body.message).toBe('Usuário cadastrado com sucesso!');
    });

    test('deve retornar 409 quando o e-mail já está cadastrado', async () => {
        const erroDuplicado = new Error('duplicate key');
        erroDuplicado.code = '23505';
        pool.query.mockRejectedValue(erroDuplicado);

        const res = await request(app)
            .post('/users/register')
            .send({
                firstName: 'Jose',
                lastName: 'Neto',
                email: 'email.ja.existe@email.com',
                password: 'senha123',
                isBarber: false,
            });

        expect(res.status).toBe(409);
        expect(res.body.message).toBe('Este e-mail já está cadastrado.');
    });

});

/**
Testes para a rota POST /users/login.
*/
describe('POST /users/login', () => {

    test('deve fazer login com sucesso e retornar um token JWT', async () => {
        const senhaReal = 'senha123';
        const hashReal = await bcrypt.hash(senhaReal, 10);

        pool.query.mockResolvedValue({
            rows: [{
                id: 1,
                first_name: 'Jose',
                last_name: 'Neto',
                email: 'jose@email.com',
                password: hashReal,
                is_barber: false,
            }]
        });

        const res = await request(app)
            .post('/users/login')
            .send({ email: 'jose@email.com', password: senhaReal });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('token');
        expect(res.body.user.firstName).toBe('Jose');
        expect(res.body.user).not.toHaveProperty('password');
    });

    test('deve retornar 404 quando o e-mail não existe', async () => {
        pool.query.mockResolvedValue({ rows: [] });

        const res = await request(app)
            .post('/users/login')
            .send({ email: 'nao.existe@email.com', password: 'qualquer' });

        expect(res.status).toBe(404);
    });

    test('deve retornar 401 quando a senha está errada', async () => {
        const hashReal = await bcrypt.hash('senha_correta', 10);
        pool.query.mockResolvedValue({
            rows: [{
                id: 1,
                first_name: 'Jose',
                email: 'jose@email.com',
                password: hashReal,
                is_barber: false,
            }]
        });

        const res = await request(app)
            .post('/users/login')
            .send({ email: 'jose@email.com', password: 'senha_errada' });

        expect(res.status).toBe(401);
    });

});
