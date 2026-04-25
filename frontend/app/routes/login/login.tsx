import type { Route } from "./+types/login";
import { Login as LoginComponent } from "../../Components/login";

/**
Define o título da página para a rota de login.
*/
export function meta({}: Route.MetaArgs) {
  return [{ title: "Login | BarberSync" }];
}

/**
Rota para a página de login.
*/
export default function LoginPage() {
  return <LoginComponent />;
}
