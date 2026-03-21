const express = require ('express');
const router = express.Router()
const pool = require('../database/barber_sync')
const cors = require('cors')

router.use(cors())

router.get('/', (req, res) => {
    res.send('Lista de usuários');
});

router.post('/', (req, res) => {
    res.send('Usuário criado');
});

module.exports = router;