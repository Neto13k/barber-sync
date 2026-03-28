import type { Route } from "./+types/home";
import { Home as HomeComponent } from "../../Components/home";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Home | BarberSync" }];
}

export default function Home() {
  return <HomeComponent />;
}
