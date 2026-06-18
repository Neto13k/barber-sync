const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const appointmentController = require('../controllers/appointmentController');
const validateRequest = require('../middleware/validateRequest');
const { createAppointmentSchema, updateAppointmentSchema } = require('../validators/appointmentValidator');

router.get('/services', appointmentController.listServices);

router.post('/', authMiddleware, validateRequest(createAppointmentSchema), appointmentController.create);

router.get('/', authMiddleware, appointmentController.listClientAppointments);

router.get('/all', authMiddleware, appointmentController.listAllAppointments);

router.put('/:id', authMiddleware, validateRequest(updateAppointmentSchema), appointmentController.update);

router.delete('/:id', authMiddleware, appointmentController.cancel);

module.exports = router;