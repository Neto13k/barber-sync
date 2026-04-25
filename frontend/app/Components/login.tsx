import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";   
import { api } from "../services/api";
import { useState } from "react";

/**
Componente de formulário de login.
*/
export function Login() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  /**
  Função chamada ao submeter o formulário de login.
  */
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
    <div className="auth-container">
      <div className="auth-card">
        <h1>Bem-vindo</h1>
        <p>Acesse sua conta para agendar</p>

        {loginError && <div className="error-alert">{loginError}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <div className="form-group">
            <label>E-mail</label>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              {...register("email", { required: "E-mail é obrigatório" })}
            />
            {errors.email && <p className="error-message">{String(errors.email.message)}</p>}
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              {...register("password", { required: "Senha é obrigatória" })}
            />
            {errors.password && <p className="error-message">{String(errors.password.message)}</p>}
          </div>

          <button type="submit" className="btn-submit" disabled={isLoading}>
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Não tem login? <Link to="/register">Cadastre-se aqui.</Link>
          </p>
          <p style={{ marginTop: '1rem' }}>
            <Link to="/" style={{ fontSize: '1.2rem', opacity: 0.7 }}>Voltar para a Home</Link>
          </p>
        </div>
      </div>
    </div>
  );
}