import type { Route } from "./+types/register";
import { RegisterUser } from "../../Components/register";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Cadastro | BarberSync" }];
}

export default function RegisterPage() {
  return <RegisterUser />;
}
