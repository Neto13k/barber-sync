const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('./app');

jest.mock('../database/barber_sync', () => ({
    query: jest.fn(),
}));

const pool = require('../database/barber_sync');

const tokenCliente = jwt.sign(
    { userId: 1, isBarber: false },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
);

const tokenBarbeiro = jwt.sign(
    { userId: 99, isBarber: true },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
);

const dataFutura = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
const dataPassada = new Date(Date.now() - 86400000).toISOString();

/**
Limpa os mocks antes de cada teste.
*/
beforeEach(() => {
    jest.clearAllMocks();
});

/**
Testes para a rota GET /appointments/services.
*/
describe('GET /appointments/services', () => {

    test('deve retornar a lista de serviços sem precisar de token', async () => {
        pool.query.mockResolvedValue({
            rows: [
                { id: 1, title: 'Corte na máquina', price: '10.00' },
                { id: 2, title: 'Barba', price: '15.00' },
            ]
        });

        const res = await request(app).get('/appointments/services');
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(2);
    });

});

/**
Testes para a rota POST /appointments.
*/
describe('POST /appointments', () => {

    test('deve retornar 401 sem token', async () => {
        const res = await request(app)
            .post('/appointments')
            .send({ serviceId: 1, appointmentDate: dataFutura });
        expect(res.status).toBe(401);
    });

    test('deve retornar 400 para data no passado', async () => {
        const res = await request(app)
            .post('/appointments')
            .set('Authorization', `Bearer ${tokenCliente}`)
            .send({ serviceId: 1, appointmentDate: dataPassada });
        expect(res.status).toBe(400);
        expect(res.body.message).toMatch(/data ou hora passada/i);
    });

    test('deve retornar 409 quando o horário já está reservado', async () => {
        pool.query.mockResolvedValue({ rows: [{ id: 99 }] });

        const res = await request(app)
            .post('/appointments')
            .set('Authorization', `Bearer ${tokenCliente}`)
            .send({ serviceId: 1, appointmentDate: dataFutura });
        expect(res.status).toBe(409);
        expect(res.body.message).toMatch(/horário já está reservado/i);
    });

    test('deve criar o agendamento com sucesso e retornar 201', async () => {
        pool.query
            .mockResolvedValueOnce({ rows: [] })
            .mockResolvedValueOnce({
                rows: [{
                    id: 10,
                    client_id: 1,
                    service_id: 1,
                    appointment_date: dataFutura,
                    status: 'pending',
                }]
            });

        const res = await request(app)
            .post('/appointments')
            .set('Authorization', `Bearer ${tokenCliente}`)
            .send({ serviceId: 1, appointmentDate: dataFutura, notes: 'Prefiro tesoura' });

        expect(res.status).toBe(201);
        expect(res.body.appointments).toHaveProperty('id', 10);
    });

});

/**
Testes para a rota GET /appointments.
*/
describe('GET /appointments', () => {

    test('deve retornar 401 sem token', async () => {
        const res = await request(app).get('/appointments');
        expect(res.status).toBe(401);
    });

    test('deve retornar os agendamentos do cliente logado', async () => {
        pool.query.mockResolvedValue({
            rows: [
                { id: 1, client_id: 1, service_title: 'Barba', status: 'pending' },
                { id: 2, client_id: 1, service_title: 'Corte', status: 'confirmed' },
            ]
        });

        const res = await request(app)
            .get('/appointments')
            .set('Authorization', `Bearer ${tokenCliente}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(2);
    });

});

/**
Testes para a rota PUT /appointments/:id.
*/
describe('PUT /appointments/:id', () => {

    test('deve retornar 403 se um cliente tentar atualizar o status', async () => {
        const res = await request(app)
            .put('/appointments/1')
            .set('Authorization', `Bearer ${tokenCliente}`)
            .send({ status: 'confirmed' });
        expect(res.status).toBe(403);
    });

    test('barbeiro deve conseguir confirmar um agendamento', async () => {
        pool.query.mockResolvedValue({ rowCount: 1, rows: [{ id: 1, status: 'confirmed' }] });

        const res = await request(app)
            .put('/appointments/1')
            .set('Authorization', `Bearer ${tokenBarbeiro}`)
            .send({ status: 'confirmed' });
        expect(res.status).toBe(200);
    });

    test('deve retornar 404 se o agendamento não existir', async () => {
        pool.query.mockResolvedValue({ rowCount: 0, rows: [] });

        const res = await request(app)
            .put('/appointments/9999')
            .set('Authorization', `Bearer ${tokenBarbeiro}`)
            .send({ status: 'confirmed' });
        expect(res.status).toBe(404);
    });

});

/**
Testes para a rota DELETE /appointments/:id.
*/
describe('DELETE /appointments/:id', () => {

    test('deve retornar 401 sem token', async () => {
        const res = await request(app).delete('/appointments/1');
        expect(res.status).toBe(401);
    });

    test('cliente deve conseguir cancelar seu próprio agendamento', async () => {
        pool.query.mockResolvedValue({ rowCount: 1, rows: [{ id: 1 }] });

        const res = await request(app)
            .delete('/appointments/1')
            .set('Authorization', `Bearer ${tokenCliente}`);

        expect(res.status).toBe(200);
        expect(res.body.message).toMatch(/cancelado/i);
    });

    test('deve retornar 404 ao tentar cancelar agendamento de outro cliente', async () => {
        pool.query.mockResolvedValue({ rowCount: 0, rows: [] });

        const res = await request(app)
            .delete('/appointments/99')
            .set('Authorization', `Bearer ${tokenCliente}`);

        expect(res.status).toBe(404);
    });

});
