import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useForm, SubmitHandler } from "react-hook-form";
import { api } from "../services/api";

interface IService {
  id: number;
  title: string;
  description: string;
  price: string;
  duration_minutes: number;
}

interface IAppointment {
  id: number;
  service_title: string;
  service_price: string;
  appointment_date: string;
  status: string;
  notes: string;
}

interface IAppointmentInput {
  serviceId: number;
  appointmentDate: string;
  notes?: string;
}

export function DashboardClient() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [services, setServices] = useState<IService[]>([]);
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCancelling, setIsCancelling] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IAppointmentInput>();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(JSON.parse(storedUser!));
    fetchServices();
    fetchAppointments();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await api.get("/appointments/services");
      setServices(response.data);
    } catch (error) {
      console.error("Erro ao buscar serviços:", error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await api.get("/appointments");
      setAppointments(response.data);
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const onSubmit: SubmitHandler<IAppointmentInput> = async (data) => {
    // Validação extra no frontend (embora o backend já valide)
    const selectedDate = new Date(data.appointmentDate);
    const now = new Date();

    if (selectedDate < now) {
      alert("Não é possível agendar para uma data ou hora passada.");
      return;
    }

    setIsLoading(true);
    try {
      await api.post("/appointments", data);
      
      alert("Agendamento realizado com sucesso!");
      reset();
      fetchAppointments();
    } catch (error: any) {
      const message = error.response?.data?.message || "Erro ao realizar agendamento.";
      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = async (id: number) => {
    if (!confirm("Tem certeza que deseja cancelar este agendamento?")) return;

    setIsCancelling(id);
    try {
      await api.delete(`/appointments/${id}`);
      alert("Agendamento cancelado com sucesso!");
      fetchAppointments();
    } catch (error: any) {
      const message = error.response?.data?.message || "Erro ao cancelar agendamento.";
      alert(message);
    } finally {
      setIsCancelling(null);
    }
  };

  if (!user) return <p>Carregando...</p>;

  const minDateTime = new Date().toISOString().slice(0, 16);

  return (
    <div className="dashboard">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            Barber<span>Sync</span>
          </div>
          <div className="welcome-text">
            Bem-vindo, <span>{user.firstName}</span>!
          </div>
          <button onClick={handleLogout} className="btn-logout">Sair</button>
        </div>
      </header>

      <main className="container">
        <div className="dashboard-header" style={{ marginTop: '4rem' }}>
          <h1>Painel do Cliente</h1>
        </div>

        <div className="dashboard-grid">
          <section className="card">
            <h2>Novo Agendamento</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="booking-form">
              <div className="form-group">
                <label htmlFor="serviceId">Selecione o serviço</label>
                <select
                  id="serviceId" 
                  {...register("serviceId", { required: "Seleção de serviço é obrigatória" })}
                >
                  <option value="">-- Escolha um serviço --</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.title} - R$ {service.price}
                    </option>
                  ))}
                </select>
                {errors.serviceId && <p className="error-message">{errors.serviceId.message}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="appointmentDate">Data e Hora</label>
                <input
                  id="appointmentDate"
                  type="datetime-local"
                  min={minDateTime}
                  {...register("appointmentDate", { required: "A data e hora são obrigatórias" })}
                />
                {errors.appointmentDate && (
                  <p className="error-message">{errors.appointmentDate.message}</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="notes">Observações (opcional)</label>
                <textarea
                  id="notes"
                  {...register("notes", { maxLength: { value: 500, message: "Máximo de 500 caracteres" } })}
                  placeholder="Ex: Alergia a algum produto, preferência de estilo..."
                />
                {errors.notes && <p className="error-message">{errors.notes.message}</p>}
              </div>

              <button type="submit" className="btn-submit" disabled={isLoading}>
                {isLoading ? "Processando..." : "Confirmar Agendamento"}
              </button>
            </form>
          </section>

          <section className="card">
            <h2>Meus Agendamentos</h2>
            {appointments.length === 0 ? (
              <p style={{ textAlign: 'center', padding: '2rem', opacity: 0.6 }}>Você ainda não possui agendamentos.</p>
            ) : (
              <div className="appointment-list">
                {appointments.map((apt) => (
                  <div key={apt.id} className="appointment-item">
                    <div className="appointment-info">
                      <span className="service-title">{apt.service_title}</span>
                      <span className="appointment-date">{new Date(apt.appointment_date).toLocaleString()}</span>
                      <span className="price-tag">R$ {apt.service_price}</span>
                      {apt.notes && (
                        <div className="client-info">Obs: {apt.notes}</div>
                      )}
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem' }}>
                      <span className={`status-badge ${apt.status}`}>
                        {apt.status === 'pending' ? 'Pendente' : 
                         apt.status === 'confirmed' ? 'Confirmado' : 
                         apt.status === 'completed' ? 'Concluído' : 'Cancelado'}
                      </span>
                      
                      {apt.status === 'pending' && (
                        <button 
                          onClick={() => handleCancel(apt.id)}
                          disabled={isCancelling === apt.id}
                          className="btn-action btn-cancel"
                        >
                          {isCancelling === apt.id ? "..." : "Cancelar"}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default DashboardClient;