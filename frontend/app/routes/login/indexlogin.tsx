import type { Route } from "./+types/index";
import { Login } from "~/Components/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login" },
    { name: "description", content: "Página de login" },
  ];
}

export default function LoginPage() {
  return <Login />;
}