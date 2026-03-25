import { set, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { api } from "../services/api";
import { useState } from "react";

export function RegisterUser() {
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      isBarber: false,
    },
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setRegisterError(null);
    try {
      await api.post("/users", data);
      navigate("/login");
      console.log("Dados enviados com sucesso:", data);
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      setRegisterError("Erro ao registrar usuário. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <p>Informe seus dados </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("firstName", { required: "Nome é obrigatório" })}
          placeholder="Nome"
        />
        {errors.firstName && <p>{errors.firstName.message}</p>}

        <input
          {...register("lastName", { minLength: 2 })}
          placeholder="Sobrenome"
        />
        {errors.lastName && <p>{errors.lastName.message}</p>}

        <input
          type="email"
          placeholder="Digite seu e-mail"
          {...register("email", { required: "Email é obrigatório" })}
        />
        {errors.email && <p>{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Digite sua senha"
          {...register("password", { required: "password é obrigatório" })}
        />
        {errors.password && <p>{errors.password.message}</p>}
        
        <label>
          <input type="checkbox" {...register("isBarber")} />
          Sou Barbeiro
        </label>

        {registerError && <p>{registerError}</p>}

        <br></br>

        <button type="submit" disabled = {isLoading}>
          {isLoading ? "Finalizando cadastro..." : "Enviar"}
        </button>
      </form>

      <br></br>

      <p>
        Já tem login? <Link to="/login">Realize o login aqui.</Link>
      </p>
    </div>
  );
}
