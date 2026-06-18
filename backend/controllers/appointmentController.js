const pool = require('../database/barber_sync');
const asyncHandler = require('../middleware/asyncHandler');

const appointmentController = {
    listServices: asyncHandler(async (req, res) => {
        const query = 'SELECT * FROM services ORDER BY title ASC';
        const result = await pool.query(query);
        res.status(200).json(result.rows);
    }),

    create: asyncHandler(async (req, res) => {
        const { serviceId, appointmentDate, notes } = req.validatedData || req.body;
        const clientId = req.user.userId;

        const selectedDate = new Date(appointmentDate);
        const now = new Date();

        if (selectedDate < now) {
            const error = new Error("Não é possível agendar para uma data ou hora passada.");
            error.status = 400;
            throw error;
        }

        const conflictCheckQuery = `
            SELECT * FROM appointments 
            WHERE appointment_date = $1 
            AND status != 'cancelled'
        `;
        const conflictResult = await pool.query(conflictCheckQuery, [appointmentDate]);

        if (conflictResult.rows.length > 0) {
            const error = new Error("Este horário já está reservado. Por favor, escolha outro.");
            error.status = 409;
            throw error;
        }

        const query = `
            INSERT INTO appointments (client_id, service_id, appointment_date, notes, status) 
            VALUES ($1, $2, $3, $4, 'pending') 
            RETURNING *
        `;
        const values = [clientId, serviceId, appointmentDate, notes];

        const result = await pool.query(query, values);
        res.status(201).json({
            message: "Agendamento realizado com sucesso!",
            appointments: result.rows[0]
        });
    }),

    listClientAppointments: asyncHandler(async (req, res) => {
        const userId = req.user.userId;
        const query = ` 
            SELECT a.*, s.title as service_title, s.price as service_price 
               FROM appointments a
                LEFT JOIN services s ON a.service_id = s.id
                WHERE a.client_id = $1 
                ORDER BY a.appointment_date ASC
        `;
        const result = await pool.query(query, [userId]);

        res.status(200).json(result.rows);
    }),

    listAllAppointments: asyncHandler(async (req, res) => {
        if (!req.user.isBarber) {
            const error = new Error("Acesso negado. Apenas barbeiros podem acessar todos os agendamentos.");
            error.status = 403;
            throw error;
        }

        const query = `
            SELECT a.*, s.title as service_title, s.price as service_price, u.first_name || ' ' || u.last_name as client_name, u.email as client_email
            FROM appointments a
            LEFT JOIN services s ON a.service_id = s.id
            LEFT JOIN users u ON a.client_id = u.id
            ORDER BY a.appointment_date ASC
        `;
        const result = await pool.query(query);
        res.status(200).json(result.rows);
    }),

    update: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const { status } = req.body;

        if (!req.user.isBarber) {
            const error = new Error("Acesso negado. Apenas barbeiros podem atualizar o status.");
            error.status = 403;
            throw error;
        }

        const query = "UPDATE appointments SET status = $1 WHERE id = $2 RETURNING *";
        const result = await pool.query(query, [status, id]);

        if (result.rowCount === 0) {
            const error = new Error("Agendamento não encontrado");
            error.status = 404;
            throw error;
        }

        res.status(200).json({ message: `Agendamento ${status} com sucesso!` });
    }),

    cancel: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const clientId = req.user.userId;

        const query = "DELETE FROM appointments WHERE id = $1 AND client_id = $2 RETURNING *";
        const result = await pool.query(query, [id, clientId]);

        if(result.rowCount === 0){
            const error = new Error("Agendamento não encontrado");
            error.status = 404;
            throw error;
        }

        res.status(200).json({ message: "Agendamento cancelado com sucesso!" });
    })
};

module.exports = appointmentController;
