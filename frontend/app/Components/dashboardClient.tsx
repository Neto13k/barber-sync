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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IAppointmentInput>();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      fetchServices();
      fetchAppointments();
    } else {
      navigate("/login");
    }
  }, [navigate]);

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
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      await api.post("/appointments", data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
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

  if (!user) return <p>Carregando...</p>;

  return (
    <div>
      <header>
        <h1>Painel do Cliente</h1>
        <p>Bem-vindo, {user.firstName}!</p>
        <button onClick={handleLogout}>Sair</button>
      </header>

      <main>
                <section>
          <h2>Meus Agendamentos</h2>
          {appointments.length === 0 ? (
            <p>Você ainda não possui agendamentos.</p>
          ) : (
            <ul>
              {appointments.map((apt) => (
                <li key={apt.id}>
                  <strong>{apt.service_title}</strong> - {new Date(apt.appointment_date).toLocaleString()} <br />
                  Status: {apt.status} | Valor: R$ {apt.service_price}
                  {apt.notes && (
                    <>
                      <br />
                      <em>Observações: {apt.notes}</em>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <h2>Agendar serviço</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="serviceId">Selecione o serviço:</label>
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
              {errors.serviceId && <p>{errors.serviceId.message}</p>}
            </div>

            <div>
              <label htmlFor="appointmentDate">Data e Hora:</label>
              <input
                id="appointmentDate"
                type="datetime-local"
                {...register("appointmentDate", { required: "A data e hora são obrigatórias" })}
              />
              {errors.appointmentDate && (
                <p>{errors.appointmentDate.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="notes">Observações (opcional):</label>
              <textarea
                id="notes"
                {...register("notes", { maxLength: { value: 500, message: "Máximo de 500 caracteres" } })}
                placeholder="Ex: Alergia a algum produto, preferência de estilo..."
                rows={4}
                cols={40}
              />
              {errors.notes && <p>{errors.notes.message}</p>}
            </div>

            <button type="submit" disabled={isLoading}>
              {isLoading ? "Processando..." : "Confirmar Agendamento"}
            </button>
          </form>
        </section>
      </main>
    </div>  
  );
}

export default DashboardClient;