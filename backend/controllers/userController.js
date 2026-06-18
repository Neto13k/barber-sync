const pool = require('../database/barber_sync');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {
    register: async (req, res) => {
        try {
            const { firstName, lastName, email, password, isBarber } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);

            const query = "INSERT INTO users(first_name, last_name, email, password, is_barber) VALUES($1, $2, $3, $4, $5) RETURNING *";
            const values = [firstName, lastName, email, hashedPassword, isBarber];

            const result = await pool.query(query, values);
            res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
        } catch (error) {
            if (error.code === '23505') {
                return res.status(409).json({ message: "Este e-mail já está cadastrado." });
            }
            console.error(error);
            res.status(500).json({ message: "Erro interno do servidor" });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const query = "SELECT * FROM users WHERE email = $1";
            const values = [email];

            const result = await pool.query(query, values);
            if (result.rows.length === 0) {
                return res.status(404).json({ message: "Senha ou login não encontrados." });
            }

            const user = result.rows[0];
            const passwordMatch = await bcrypt.compare(password, user.password);
            
            if (!passwordMatch) {
                return res.status(401).json({ message: "Senha ou login não encontrados." });
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
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro interno do servidor" });
        }
    }
};

module.exports = userController;
