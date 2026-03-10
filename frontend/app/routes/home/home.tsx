import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Home | BarberSync" }];
}

export default function Home() {
  return <h1>Página de acesso</h1>;
}
