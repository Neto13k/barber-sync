/**
Cria uma instância do app Express para testes, com rotas e middlewares.
*/
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('../routes/user.routes');
const appointmentRoutes = require('../routes/appointment.routes');
const errorHandler = require('../middleware/errorHandler');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/users', userRoutes);
app.use('/appointments', appointmentRoutes);
app.use(errorHandler);

module.exports = app;
