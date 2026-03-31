import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
  index("routes/home/home.tsx"),
  route("home", "routes/home/home.tsx"),
  route("login", "routes/login/login.tsx"),
  route("register", "routes/register/register.tsx"),
  route("dashboard/client", "routes/dashboard/dashboard.client.tsx"),
  route("dashboard/barber", "routes/dashboard/dashboard.barber.tsx"),
] satisfies RouteConfig;
