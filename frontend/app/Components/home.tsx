import { Link } from "react-router";

interface ServiceCardProps {
  title: string;
  description: string;
  price: string;
}

const servicesData = [
  { id: 1, title: "Corte na máquina", description: "Serviço rápido e preciso com máquina profissional.", price: "R$10" },
  { id: 2, title: "Corte na tesoura", description: "Acabamento artesanal com tesoura, ideal para estilos clássicos.", price: "R$20" },
  { id: 3, title: "Corte na máquina e tesoura", description: "Combinação de máquina e tesoura para visual personalizado.", price: "R$15" },
  { id: 4, title: "Sobrancelha", description: "Modelagem e acabamento das sobrancelhas.", price: "R$5" },
  { id: 5, title: "Barba", description: "Aparar, desenhar e hidratar para uma barba impecável.", price: "R$15" },
  { id: 6, title: "Barba, cabelo e bigode", description: "Pacote completo para barba, cabelo e bigode.", price: "R$30" },
  { id: 7, title: "Barba, cabelo, bigode e sobrancelha", description: "Pacote completo incluindo sobrancelha.", price: "R$35" },
];

const ServiceCard = ({ title, description, price }: ServiceCardProps) => (
  <div className="service-card">
    <h3>{title}</h3>
    <p>{description}</p>
    <p className="price">{price}</p>
  </div>
);

export function Home() {
  return (
    <div className="home-page">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            Barber<span>Sync</span>
          </div>
          <nav className="nav">
            <ul>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Cadastre-se</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">
              Estilo & Precisão
              <span>O seu visual em sincronia com a sua personalidade</span>
            </h1>
            <p className="hero-text">
              Na BarberSync, transformamos cada corte em uma experiência única de cuidado e sofisticação.
            </p>
            <Link to="/register" className="btn-cta">Agendar Agora</Link>
          </div>
        </section>

        <section className="section container">
          <h2 style={{ textAlign: 'center', fontSize: '3.5rem', marginBottom: '4rem' }}>Nossos Serviços</h2>
          <div className="services-grid">
            {servicesData.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                price={service.price}
              />
            ))}
          </div>
        </section>

        <section className="section container" style={{ textAlign: 'center', backgroundColor: '#fff', borderRadius: '8px', padding: '6rem' }}>
          <h3 style={{ fontSize: '2.8rem', color: '#1A1A1A' }}>Gostou de algum serviço?</h3>
          <p style={{ fontSize: '1.8rem', margin: '2rem 0' }}>
            Para realizar um agendamento, você precisa estar logado.
          </p>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
            <Link to="/login" className="btn-cta" style={{ fontSize: '1.4rem', padding: '1rem 2rem' }}>Fazer Login</Link>
            <Link to="/register" className="btn-cta" style={{ fontSize: '1.4rem', padding: '1rem 2rem', backgroundColor: 'transparent', border: '1px solid #D4AF37', color: '#D4AF37' }}>Criar Conta</Link>
          </div>
        </section>
      </main>

      <footer style={{ backgroundColor: '#1A1A1A', color: '#fff', padding: '4rem 0', textAlign: 'center' }}>
        <p style={{ fontSize: '1.4rem', opacity: 0.7 }}>&copy; 2026 BarberSync - O seu estilo em sincronia.</p>
      </footer>
    </div>
  );
}

export { servicesData };