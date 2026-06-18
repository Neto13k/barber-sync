const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validateRequest = require('../middleware/validateRequest');
const { registerSchema, loginSchema } = require('../validators/userValidator');

router.get('/', (req, res) => {
    res.send('Lista de usuários');
});

router.post('/register', validateRequest(registerSchema), userController.register);

router.post('/login', validateRequest(loginSchema), userController.login);

module.exports = router;