import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useForm, SubmitHandler } from "react-hook-form";
import { servicesData } from "./home";

interface IAppointmentInput {
  service: string;
  appointmentDate: string;
  notes?: string;
}

export function DashboardClient() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAppointmentInput>();

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

  const onSubmit: SubmitHandler<IAppointmentInput> = (data) => {
    console.log("Dados do agendamento:", data);
    alert(`Serviço agendado com sucesso para ${data.appointmentDate}!`);
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
          <p>Você ainda não possui agendamentos.</p>
        </section>

        <section>
          <h2>Agendar Serviço</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="service">Selecione o serviço:</label>
              <br />
              <select 
                id="service" 
                {...register("service", { required: "O serviço é obrigatório" })}
              >
                <option value="">-- Escolha um serviço --</option>
                {servicesData.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.title} - {service.price}
                  </option>
                ))}
              </select>
              {errors.service && <p style={{ color: "red" }}>{errors.service.message}</p>}
            </div>

            <br />

            <div>
              <label htmlFor="appointmentDate">Data e Hora:</label>
              <br />
              <input
                id="appointmentDate"
                type="datetime-local"
                {...register("appointmentDate", { required: "A data e hora são obrigatórias" })}
              />
              {errors.appointmentDate && (
                <p style={{ color: "red" }}>{errors.appointmentDate.message}</p>
              )}
            </div>

            <br />

            <div>
              <label htmlFor="notes">Observações (opcional):</label>
              <br />
              <textarea
                id="notes"
                {...register("notes", { maxLength: { value: 500, message: "Máximo de 500 caracteres" } })}
                placeholder="Ex: Alergia a algum produto, preferência de estilo..."
                rows={4}
                cols={40}
              />
              {errors.notes && <p style={{ color: "red" }}>{errors.notes.message}</p>}
            </div>

            <br />

            <button type="submit">Confirmar Agendamento</button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default DashboardClient;
