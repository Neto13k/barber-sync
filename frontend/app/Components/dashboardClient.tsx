import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function DashboardClient() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div>
      <h1>Painel do Cliente</h1>
      <p>Bem-vindo, {user.firstName}!</p>
      <button onClick={handleLogout}>Sair</button>
      <section>
        <h3>Meus Agendamentos</h3>
        <p>Você ainda não possui agendamentos.</p>
      </section>
    </div>
  );
}
