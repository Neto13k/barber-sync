import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { api } from "../services/api";

interface IAppointment {
  id: number;
  service_title: string;
  service_price: string;
  appointment_date: string;
  status: string;
  notes: string;
  client_name: string;
  client_email: string;
}

/**
Componente do dashboard para barbeiros gerenciarem agendamentos.
*/
export function DashboardBarber() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [isUpdating, setIsUpdating] = useState<number | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(JSON.parse(storedUser!));
    fetchAppointments();
  }, []);

  /**
  Busca todos os agendamentos do sistema.
  */
  const fetchAppointments = async () => {
    try {
      const response = await api.get("/appointments/all");  
      setAppointments(response.data);
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
    }
  };

  /**
  Atualiza o status de um agendamento específico.
  */
  const handleStatusUpdate = async (id: number, status: "completed" | "cancelled" | "confirmed") => {
    setIsUpdating(id);
    try {
      await api.put(`/appointments/${id}`, { status });
      alert(`Agendamento ${status === "completed" ? "concluído" : "cancelado"} com sucesso!`);
      fetchAppointments();
    } catch (error) {
      console.error("Erro ao atualizar status do agendamento:", error);
      alert("Ocorreu um erro ao atualizar o status do agendamento. Tente novamente.");
    } finally {
      setIsUpdating(null);
    }
  };

  /**
  Faz logout do usuário e redireciona para login.
  */
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            Barber<span>Sync</span>
          </div>
          <div className="welcome-text">
            Painel do Barbeiro | <span>{user?.firstName}</span>
          </div>
          <button onClick={handleLogout} className="btn-logout">Sair</button>
        </div>
      </header>

      <main className="container">
        <div className="dashboard-header" style={{ marginTop: '4rem' }}>
          <h1>Controle de Agendamentos</h1>
        </div>

        <section className="card">
          <h2>Todos os Pedidos</h2>
          {appointments.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '4rem', opacity: 0.6 }}>Não há agendamentos no momento.</p>
          ) : (
            <div className="appointment-list">
              {appointments.map((apt) => (
                <div key={apt.id} className="appointment-item">
                  <div className="appointment-info">
                    <span className="service-title">{apt.service_title}</span>
                    <span className="appointment-date">{new Date(apt.appointment_date).toLocaleString()}</span>
                    <span className="price-tag">R$ {apt.service_price}</span>
                    <div className="client-info">
                      <strong>Cliente:</strong> {apt.client_name} ({apt.client_email})
                    </div>
                    {apt.notes && (
                      <div className="client-info" style={{ marginTop: '0.5rem' }}>
                        <strong>Obs:</strong> {apt.notes}
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem' }}>
                    <span className={`status-badge ${apt.status}`}>
                      {apt.status === 'pending' ? 'Pendente' : 
                       apt.status === 'confirmed' ? 'Aceito' : 
                       apt.status === 'completed' ? 'Concluído' : 'Cancelado'}
                    </span>

                    <div className="appointment-actions">
                      {apt.status === "pending" && (
                        <>
                          <button 
                            onClick={() => handleStatusUpdate(apt.id, "confirmed")}
                            disabled={isUpdating === apt.id}
                            className="btn-action btn-confirm"
                          >
                            {isUpdating === apt.id ? "..." : "Aceitar Pedido"}
                          </button>
                          <button 
                            onClick={() => handleStatusUpdate(apt.id, "cancelled")}
                            disabled={isUpdating === apt.id}
                            className="btn-action btn-cancel"
                          >
                            {isUpdating === apt.id ? "..." : "Recusar"}
                          </button>
                        </>
                      )}

                      {apt.status === "confirmed" && (
                        <button 
                          onClick={() => handleStatusUpdate(apt.id, "completed")}
                          disabled={isUpdating === apt.id}
                          className="btn-action btn-complete"
                        >
                          {isUpdating === apt.id ? "..." : "Marcar como Concluído"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );  
}

export default DashboardBarber;