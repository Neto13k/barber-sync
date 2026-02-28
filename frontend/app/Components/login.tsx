import { useForm } from "react-hook-form";
import { Link } from "react-router";

export function Login() {
  const { register, handleSubmit, formState: {errors} } = useForm();

  function onSubmit() {
    alert("Dados enviados com sucesso!");
  }

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
          type="text"
          placeholder="Digite sua senha"
          {...register("nome", { required: "Nome é obrigatório" })}
        />

        {errors.email && <p>Preencha todos os campos</p>}

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