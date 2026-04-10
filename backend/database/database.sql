-- ============================================================
-- BarberSync — Schema Completo (versão corrigida)
-- Banco: PostgreSQL
-- Atualizado em: 2026-04-09
-- ============================================================

-- 1. Limpeza (ordem importa por causa das FKs)
DROP TABLE IF EXISTS appointments CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- 2. Tabela de Usuários
CREATE TABLE users (
    id            SERIAL PRIMARY KEY,
    first_name    VARCHAR(100)  NOT NULL,
    last_name     VARCHAR(100),
    email         VARCHAR(150)  UNIQUE NOT NULL,
    password      VARCHAR(255)  NOT NULL,
    is_barber     BOOLEAN       DEFAULT false,
    created_at    TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabela de Serviços
CREATE TABLE services (
    id               SERIAL PRIMARY KEY,
    title            VARCHAR(100)   NOT NULL,
    description      TEXT,
    price            DECIMAL(10, 2) NOT NULL,
    duration_minutes INTEGER        DEFAULT 30,
    created_at       TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tabela de Agendamentos
CREATE TABLE appointments (
    id               SERIAL PRIMARY KEY,
    client_id        INTEGER     REFERENCES users(id)    ON DELETE CASCADE,
    service_id       INTEGER     REFERENCES services(id) ON DELETE SET NULL,
    appointment_date TIMESTAMP   NOT NULL,
    notes            TEXT,
    status           VARCHAR(20) DEFAULT 'pending'
                                 CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
    created_at       TIMESTAMP   DEFAULT CURRENT_TIMESTAMP
);

-- 5. Índices de performance
CREATE INDEX idx_appointments_client_id       ON appointments(client_id);
CREATE INDEX idx_appointments_appointment_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_status          ON appointments(status);

-- 6. Seed — Serviços iniciais
INSERT INTO services (title, description, price, duration_minutes) VALUES
('Corte na máquina',                       'Serviço rápido e preciso com máquina profissional.',          10.00, 20),
('Corte na tesoura',                       'Acabamento artesanal com tesoura, ideal para estilos clássicos.', 20.00, 40),
('Corte na máquina e tesoura',             'Combinação de máquina e tesoura para visual personalizado.',   15.00, 30),
('Sobrancelha',                            'Modelagem e acabamento das sobrancelhas.',                      5.00, 10),
('Barba',                                  'Aparar, desenhar e hidratar para uma barba impecável.',        15.00, 30),
('Barba, cabelo e bigode',                 'Pacote completo para barba, cabelo e bigode.',                 30.00, 60),
('Barba, cabelo, bigode e sobrancelha',    'Pacote completo incluindo sobrancelha.',                      35.00, 75);
