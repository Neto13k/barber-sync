import type { Route } from "./+types/register";
import { RegisterUser } from "../../Components/register";

/**
Define o título da página para a rota de cadastro.
*/
export function meta({}: Route.MetaArgs) {
  return [{ title: "Cadastro | BarberSync" }];
}

/**
Rota para a página de cadastro.
*/
export default function RegisterPage() {
  return <RegisterUser />;
}
