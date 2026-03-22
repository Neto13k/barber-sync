const express = require ('express');
const router = express.Router()
const pool = require('../database/barber_sync')


router.get('/', (req, res) => {
    res.send('Lista de usuários');
});

router.post('/', async (req, res) => {
    try {
    const { firstName, lastName, email, password} = req.body;
    const query = "INSERT INTO users (firstName, lastName, email, password) VALUES($1, $2, $3, $4) RETURNING *";
    const values = [firstName, lastName, email, password];

    const result = await pool.query(query, values);
    res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

module.exports = router;