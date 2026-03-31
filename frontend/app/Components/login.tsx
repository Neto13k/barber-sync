import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";   
import { api } from "../services/api";
import { useState } from "react";

export function Login() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setLoginError(null);
    try {
      const response = await api.post("/users/login", data);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        console.log("Login realizado com sucesso!");

        // Redirecionamento de acordo com o tipo de usuário
        if(response.data.user.isBarber) {
          navigate("/dashboard/barber");
        } else {
          navigate("/dashboard/client"); 
        }
      }
    } catch (error: any) {
      const message = error.response?.data?.message || "E-mail ou senha incorretos. Tente novamente.";
      setLoginError(message);
      console.error("Erro no login:", message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <p>Informe seus dados </p>

      {loginError && <p>{loginError}</p>}

      <form onSubmit={handleSubmit(onSubmit)}>

        <input
          type="email"
          placeholder="Digite seu e-mail"
          {...register("email", { required: "E-mail é obrigatório" })}
        />

        {errors.email && <p>{String(errors.email.message)}</p>}

        <br></br><br></br>

        <input
          type="password"
          placeholder="Digite sua senha"
          {...register("password", { required: "Senha é obrigatória" })}
        />

        {errors.password && <p>{String(errors.password.message)}</p>}

        <br></br><br></br>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Enviando..." : "Enviar"}
        </button>

      </form>

      <br></br>

      <p>
        Não tem login? <Link to="/register">Cadastre-se aqui.</Link>
      </p>

    </div>
  );
}