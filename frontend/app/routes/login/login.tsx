import type { Route } from "./+types/login";
import { Login as LoginComponent } from "../../Components/login";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Login | BarberSync" }];
}

export default function LoginPage() {
  return <LoginComponent />;
}
