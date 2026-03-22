const express = require ('express');
const router = express.Router()
const pool = require('../database/barber_sync')
const bcrypt = require('bcrypt');

const secretKey = "Senha"

function authMiddleware(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({message: 'Token não fornecido!'})
    }

    jwt.verify(token, secretKey, (err, user)=>{
        if (err){
            return res.status(403).json({message: 'Token Inválido'});
        }
        req.user = user;
        next();
    });
}

router.get('/', (req, res) => {
    res.send('Lista de usuários');
});

router.post('/', async (req, res) => {
    try {
    const { firstName, lastName, email, password, isBarber} = req.body;
    const hashedSenha = await bcrypt.hash(password, 10)
    const query = "INSERT INTO users (firstName, lastName, email, password, is_barber) VALUES($1, $2, $3, $4, $5) RETURNING *";
    const values = [firstName, lastName, email, hashedSenha, isBarber];
    const result = await pool.query(query, values);
    res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const {email, password } = req.body;
    const query = "SELECT * FROM users WHERE email = $1";
    const values = [email];

    const result = await pool.query(query, values);
    if(result.rows.length === 0){
        return res.status(404).json({message: 'Usuário não encontrado'});
    }

    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if(!passwordMatch){
        return res.status(401).json({message: 'Senha incorreta'});
    }

    const token = jwt.sign({userId: user.id}, secretKey, {expiresIn: '1h'});
    res.status(200).json({token});  
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});





module.exports = router;