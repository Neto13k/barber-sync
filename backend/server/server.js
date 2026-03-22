require('dotenv').config();
const express = require('express');
const axios = require('axios')
const app = express();
const cors = require('cors')
const userRoutes = require('../routes/user.routes')

app.use(express.json())
app.use(cors())
app.use('/users', userRoutes);

app.get('/api/cadastro', (req, res) => {
    console.log('Server funcionando');
    res.json({ message: 'Server funcionando' });
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});