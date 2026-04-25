import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { api } from "../services/api";
import { useState } from "react";

/**
Componente de formulário de cadastro de usuário.
*/
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

  /**
  Função chamada ao submeter o formulário de cadastro.
  */
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setRegisterError(null);
    try {
      await api.post("/users/register", data);
      navigate("/login");
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      setRegisterError("Erro ao cadastrar usuário. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Criar Conta</h1>
        <p>Junte-se à nossa barbearia premium</p>

        {registerError && <div className="error-alert">{registerError}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <div className="form-group">
            <label>Nome</label>
            <input
              {...register("firstName", { required: "Nome é obrigatório" })}
              placeholder="Digite seu nome"
            />
            {errors.firstName && <p className="error-message">{errors.firstName.message}</p>}
          </div>

          <div className="form-group">
            <label>Sobrenome</label>
            <input
              {...register("lastName", { minLength: { value: 2, message: "Mínimo de 2 caracteres" } })}
              placeholder="Digite seu sobrenome"
            />
            {errors.lastName && <p className="error-message">{errors.lastName.message}</p>}
          </div>

          <div className="form-group">
            <label>E-mail</label>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              {...register("email", { required: "Email é obrigatório" })}
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              placeholder="Escolha uma senha"
              {...register("password", { required: "Senha é obrigatória" })}
            />
            {errors.password && <p className="error-message">{errors.password.message}</p>}
          </div>
          
          <label className="checkbox-group">
            <input type="checkbox" {...register("isBarber")} />
            Sou Barbeiro
          </label>

          <button type="submit" className="btn-submit" disabled={isLoading}>
            {isLoading ? "Finalizando cadastro..." : "Cadastrar"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Já tem login? <Link to="/login">Realize o login aqui.</Link>
          </p>
          <p style={{ marginTop: '1rem' }}>
            <Link to="/" style={{ fontSize: '1.2rem', opacity: 0.7 }}>Voltar para a Home</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
