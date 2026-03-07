import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
export function RegisterUser() {
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
    },
  });

  return (
    <div>
      <p>Informe seus dados </p>

      <form onSubmit={handleSubmit(console.log)}>
        <input
          {...register("firstName", { required: "Nome é obrigatório" })}
          placeholder="First name"
        />

        <input
          {...register("lastName", { minLength: 2 })}
          placeholder="Last name"
        />

        <input
          type="email"
          placeholder="Digite seu e-mail"
          {...register("email", { required: "Email é obrigatório" })}
        />

        {errors.email && <p>Preencha todos os campos</p>}

        <br></br>
        <br></br>

        <input
          type="password"
          placeholder="Digite sua senha"
          {...register("password", { required: "password é obrigatório" })}
        />

        {errors.password && <p>Preencha todos os campos</p>}

        <br></br>
        <br></br>

        <button type="submit">Enviar</button>
      </form>

      <br></br>

      <p>
        Já tem login? <Link to="/login">Realize o login aqui.</Link>
      </p>
    </div>
  );
}
