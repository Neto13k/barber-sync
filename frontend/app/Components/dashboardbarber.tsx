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

  const fetchAppointments = async () => {
    try {
      const response = await api.get("/appointments/all");  
      setAppointments(response.data);
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
    }
  };

  const handleStatusUpdate = async (id: number, status: "completed" | "cancelled") => {
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

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <header>
        <h1> Painel do Barbeiro</h1>
        <p>Bem-vindo, {user?.firstName}!</p>
        <button onClick={handleLogout}>Logout</button>
      </header>

      <main>
        <section>
          <h2>Todos os Agendamentos</h2>
          {appointments.length === 0 ? (
            <p>Não há agendamentos no momento.</p>
          ) : (
            <ul>
              {appointments.map((apt) => (
                <li key={apt.id}>
                  <p><strong>Cliente:</strong> {apt.client_name} ({apt.client_email})</p>
                  <p><strong>Serviço:</strong> {apt.service_title} - {new Date(apt.appointment_date).toLocaleString()} <br />
                  status: {apt.status.toLocaleLowerCase()} | Valor: {apt.service_price}</p>
                  {apt.notes && (
                    <>
                    <br />
                    <em>Observações: {apt.notes} </em>
                    </>
                  )}

                  {apt.status === "pending" && (
                    <div>
                      <button 
                        onClick={() => handleStatusUpdate(apt.id, "completed")}
                        disabled={isUpdating === apt.id}
                      >
                        {isUpdating === apt.id ? "..." : "Concluir"}
                      </button>
                      <button 
                        onClick={() => handleStatusUpdate(apt.id, "cancelled")}
                        disabled={isUpdating === apt.id}
                      >
                        {isUpdating === apt.id ? "..." : "Cancelar"}
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
          </section>
      </main>
      </div>
  );  
}

export default DashboardBarber;