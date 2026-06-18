const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const appointmentController = require('../controllers/appointmentController');

router.get('/services', appointmentController.listServices);
router.post('/', authMiddleware, appointmentController.create);
router.get('/', authMiddleware, appointmentController.listClientAppointments);
router.get('/all', authMiddleware, appointmentController.listAllAppointments);
router.put('/:id', authMiddleware, appointmentController.update);
router.delete('/:id', authMiddleware, appointmentController.cancel);

module.exports = router;
