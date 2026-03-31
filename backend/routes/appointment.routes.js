const express = require('express');
const router = express.Router();
const pool = require('../database/barber_sync');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

//Middleware de autenticação
function authMiddleware(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({message: 'Token não fornecido!'})
    }

    jwt.verify(token, secretKey, (err, decoded)=>{
        if (err){
            return res.status(403).json({message: 'Token Inválido'});
        }
        req.user = decoded;
        next();
    });
}
// Rota para buscar os serviços disponíveis
router.get('/services', async (req, res) => {
    try {
        const query = 'SELECT * FROM services  ORDER BY title ASC';
        const result = await pool.query(query);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar os serviços' });
    }
});

// Rota para criar um novo agendamento
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { serviceId, appointmentDate, notes } = req.body;
        const clientId = req.user.userId;

        // 1. Validar se a data é retroativa
        const selectedDate = new Date(appointmentDate);
        const now = new Date();

        if (selectedDate < now) {
            return res.status(400).json({ message: "Não é possível agendar para uma data ou hora passada." });
        }

        // 2. Verificar conflitos de horário (Double Booking)
        // Vamos considerar um intervalo de 30 minutos entre agendamentos por padrão, ou buscar a duração do serviço
        const conflictCheckQuery = `
            SELECT * FROM appointments 
            WHERE appointment_date = $1 
            AND status != 'cancelled'
        `;
        const conflictResult = await pool.query(conflictCheckQuery, [appointmentDate]);

        if (conflictResult.rows.length > 0) {
            return res.status(409).json({ message: "Este horário já está reservado. Por favor, escolha outro." });
        }

        const query = `
            INSERT INTO appointments (client_id, service_id, appointment_date, notes, status) 
            VALUES ($1, $2, $3, $4, 'pending') 
            RETURNING *
        `;
        const values = [clientId, serviceId, appointmentDate, notes];

        const result = await pool.query(query, values);
        res.status(201).json({
            message: "Agendamento realizado com sucesso!!",
            appointments: result.rows[0]
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao realizar agendamento" })
    }
});

//Rota para listar os agendamentos 
router.get('/', authMiddleware, async (req,res) =>{
    try{
        const userId = req.user.userId;  // Faz um JOIN com a tabela de serviços para trazer o título do serviço
        const query = ` 
        SELECT a.*, s.title as service_title, s.price as service_price 
           FROM appointments a
            LEFT JOIN services s ON a.service_id = s.id
            WHERE a.client_id = $1 
            ORDER BY a.appointment_date ASC
        `;
        const result = await pool.query(query, [userId]);

        res.status(200).json(result.rows);
    }catch (error){
        console.error(error);
        res.status(500).json({message: "Erro ao buscar agendamentos"})
    }
});

// Rota para o barbeiro ver todos os agendamentos
router.get('/all', authMiddleware, async (req, res) => {
    try {
        if (!req.user.isBarber) {
            return res.status(403).json({ message: "Acesso negado. Apenas barbeiros podem acessar todos os agendamentos." });
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
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar todos os agendamentos" });
    }
});

// Rota para atualizar o status do agendamento (concluir/cancelar)
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!req.user.isBarber) {
            return res.status(403).json({ message: "Acesso negado. Apenas barbeiros podem atualizar o status." });
        }

        const query = "UPDATE appointments SET status = $1 WHERE id = $2 RETURNING *";
        const result = await pool.query(query, [status, id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Agendamento não encontrado" });
        }

        res.status(200).json({ message: `Agendamento ${status} com sucesso!` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao atualizar status do agendamento" });
    }
});

//Rota para cancelar agendamento (pelo cliente)
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const clientId = req.user.userId;

        const query = "DELETE FROM appointments WHERE id = $1 AND client_id = $2 RETURNING *";
        const result = await pool.query(query, [id, clientId]);

        if(result.rowCount === 0){
            return res.status(404).json ({message:"Agendamento não encontrado"})
        }

        res.status(200).json({ message: "Agendamento cancelado com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao cancelar agendamento" });
    }
});

module.exports = router;