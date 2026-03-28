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
    <div>
      <header>
        <h1>BarberSync</h1>
        <nav>
          <Link to="/login">Login</Link> | <Link to="/register">Cadastre-se</Link>
        </nav>
      </header>

      <main>
        <section>
          <h2>Nossos Serviços</h2>
          <div className="services-container">
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

        <section>
          <h3>Gostou de algum serviço?</h3>
          <p>
            Para realizar um agendamento, você precisa estar logado.
            <br />
            <Link to="/login">Já tem login?</Link> ou <Link to="/register">Cadastre-se aqui.</Link>
          </p>
        </section>
      </main>

      <footer>
        <p>&copy; 2026 BarberSync - O seu estilo em sincronia.</p>
      </footer>
    </div>
  );
}
