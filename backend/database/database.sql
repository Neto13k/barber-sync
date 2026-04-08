-- BarberSync - Schema do Banco de Dados
-- Banco: PostgreSQL
-- Descrição: Script de criação das tabelas e inserção dos serviços iniciais
-- Obs: As colunas firstName e lastName foram criadas sem snake_case
-- intencionalmente para manter compatibilidade com o código atual.

-- Tabela de Usuários
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100),
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_barber BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Serviços
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    duration_minutes INTEGER DEFAULT 30, -- Estimativa de tempo do serviço
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Agendamentos
CREATE TABLE IF NOT EXISTS appointments (
    id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    service_id INTEGER REFERENCES services(id) ON DELETE SET NULL,
    appointment_date TIMESTAMP NOT NULL,
    notes TEXT,
    status VARCHAR(20) DEFAULT 'pending', -- pending, confirmed, cancelled, completed
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserção de Serviços Iniciais (Baseado no seu servicesData)
INSERT INTO services (title, description, price) VALUES
('Corte na máquina', 'Serviço rápido e preciso com máquina profissional.', 10.00),
('Corte na tesoura', 'Acabamento artesanal com tesoura, ideal para estilos clássicos.', 20.00),
('Corte na máquina e tesoura', 'Combinação de máquina e tesoura para visual personalizado.', 15.00),
('Sobrancelha', 'Modelagem e acabamento das sobrancelhas.', 5.00),
('Barba', 'Aparar, desenhar e hidratar para uma barba impecável.', 15.00),
('Barba, cabelo e bigode', 'Pacote completo para barba, cabelo e bigode.', 30.00),
('Barba, cabelo, bigode e sobrancelha', 'Pacote completo incluindo sobrancelha.', 35.00);
