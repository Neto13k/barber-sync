import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("home", "routes/home/home.tsx"),
  route("login", "routes/login/login.tsx"),
  route("register", "routes/register/register.tsx"),
  route("dashboard/client", "routes/dashboard/dashboard.client.tsx"),
  route("dashboard/barber", "routes/dashboard/dashboard.barber.tsx"),
] satisfies RouteConfig;
