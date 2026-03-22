import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";   
import { api } from "../services/api";

export function Login() {
  const navigate = useNavigate();         
  const { register, handleSubmit, formState: {errors} } = useForm();

  const onSubmit = async (data: any) => {
      try {
        const response = await api.post("/users/login", data);
        
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          console.log("Login realizado com sucesso!");
          navigate("/");
        }
      } catch (error) {
        console.error("Dados não encontrados", error);
      }
    };

  return (
    <div>
      <p>Informe seus dados </p>

      <form onSubmit={handleSubmit(onSubmit)}>

        <input
          type="email"
          placeholder="Digite seu e-mail"
          {...register("email", { required: "Email é obrigatório" })}
        />

        {errors.email && <p>Preencha todos os campos</p>}

        <br></br><br></br>

        <input
          type="password"
          placeholder="Digite sua senha"
          {...register("password", { required: "password é obrigatório" })}
        />

        {errors.password && <p>Preencha todos os campos</p>}

        <br></br><br></br>

        <button type="submit">Enviar</button>

      </form>

      <br></br>

      <p>
        Não tem login? <Link to="/register">Cadastre-se aqui.</Link>
      </p>

    </div>
  );
}