const express = require('express');
const axios = require('axios')
const app = express();
const userRoutes = require('../routes/user.routes')

app.use('/users', userRoutes);

app.get('/api/cadastro', (req, res) => {
    console.log('Server funcionando');
    res.json({ message: 'Server funcionando' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});