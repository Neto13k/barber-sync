import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("/", "routes/home/index.tsx"),
  route("/login", "routes/login/indexlogin.tsx"),
] satisfies RouteConfig;