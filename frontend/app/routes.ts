import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("/", "routes/home/home.tsx"),
  route("/login", "routes/login/login.tsx"),
  route("/register", "routes/register/register.tsx"),
] satisfies RouteConfig;
