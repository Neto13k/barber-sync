/**
Configura e inicia o servidor Express com rotas e middlewares.
*/
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
const userRoutes = require('../routes/user.routes')
const appointmentRoutes = require('../routes/appointment.routes')
const errorHandler = require('../middleware/errorHandler');

app.use(express.json())
app.use(cors())
app.use('/users', userRoutes);
app.use('/appointments', appointmentRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});