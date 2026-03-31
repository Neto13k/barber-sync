import { Navigate } from "react-router";

interface ProtectedRouteProps {
  requiredRole?: "barber" | "client";
  children: React.ReactNode;
}

export function ProtectedRoute({ requiredRole, children }: ProtectedRouteProps) {
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  // 1. Verificar se existe token e usuário
  if (!token || !storedUser) {
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(storedUser);

  // 2. Verificar se o papel (role) é exigido e compatível
  if (requiredRole === "barber" && !user.isBarber) {
    return <Navigate to="/dashboard/client" replace />;
  }

  if (requiredRole === "client" && user.isBarber) {
    return <Navigate to="/dashboard/barber" replace />;
  }

  // 3. Se estiver tudo OK, renderiza os filhos (o componente protegido)
  return <>{children}</>;
}
