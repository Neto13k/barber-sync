/**
Configura variáveis de ambiente para os testes, incluindo chave JWT e porta.
*/
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

if (!process.env.JWT_SECRET) {
    process.env.JWT_SECRET = 'test_secret_key_para_testes';
}
process.env.PORT = 3001;
