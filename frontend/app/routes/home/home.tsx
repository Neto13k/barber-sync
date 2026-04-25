import type { Route } from "./+types/home";
import { Home as HomeComponent } from "../../Components/home";

/**
Define o título da página para a rota home.
*/
export function meta({}: Route.MetaArgs) {
  return [{ title: "Home | BarberSync" }];
}

/**
Rota para a página inicial.
*/
export default function Home() {
  return <HomeComponent />;
}
