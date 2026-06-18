const pool = require('../database/barber_sync');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../middleware/asyncHandler');

const userController = {
    register: asyncHandler(async (req, res) => {
        const { firstName, lastName, email, password, isBarber } = req.validatedData || req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = "INSERT INTO users(first_name, last_name, email, password, is_barber) VALUES($1, $2, $3, $4, $5) RETURNING *";
        const values = [firstName, lastName, email, hashedPassword, isBarber];

        await pool.query(query, values);
        res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
    }),

    login: asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        const query = "SELECT * FROM users WHERE email = $1";
        const values = [email];

        const result = await pool.query(query, values);
        if (result.rows.length === 0) {
            const error = new Error("Senha ou login não encontrados.");
            error.status = 404;
            throw error;
        }

        const user = result.rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if (!passwordMatch) {
            const error = new Error("Senha ou login não encontrados.");
            error.status = 401;
            throw error;
        }

        const token = jwt.sign(
            { userId: user.id, isBarber: user.is_barber },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            token,
            user: {
                id: user.id,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                isBarber: user.is_barber,
            }
        });
    })
};

module.exports = userController;
