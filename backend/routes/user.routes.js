const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', (req, res) => {
    res.send('Lista de usuários');
});

router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;
