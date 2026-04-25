import { Navigate } from "react-router";

interface ProtectedRouteProps {
  requiredRole?: "barber" | "client";
  children: React.ReactNode;
}

/**
Componente que protege rotas verificando autenticação e papel do usuário.
*/
export function ProtectedRoute({ requiredRole, children }: ProtectedRouteProps) {
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  // Verifica se o usuário está logado
  if (!token || !storedUser) {
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(storedUser);

  // Verifica se o papel do usuário corresponde ao exigido
  if (requiredRole === "barber" && !user.isBarber) {
    return <Navigate to="/dashboard/client" replace />;
  }

  if (requiredRole === "client" && user.isBarber) {
    return <Navigate to="/dashboard/barber" replace />;
  }

  // Se tudo estiver ok, renderiza o conteúdo protegido
  return <>{children}</>;
}
