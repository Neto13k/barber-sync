import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { api } from "../services/api";

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
      isBarber: false,
    },
  });

  const onSubmit = async (data: any) => {
    try {
      await api.post("/users", data);
      console.log("Dados enviados com sucesso:", data);
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
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

        <input
          {...register("lastName", { minLength: 2 })}
          placeholder="Sobrenome"
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

        <label>
          <input type="checkbox" {...register("isBarber")} />
          Sou Barbeiro
        </label>

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
