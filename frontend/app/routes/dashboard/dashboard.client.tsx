import { DashboardClient } from "../../Components/dashboardClient";
import { ProtectedRoute } from "../../Components/protectedRoute";

/**
Rota protegida para o dashboard do cliente.
*/
export default function DashboardClientRoute() {
  return (
    <ProtectedRoute requiredRole="client">
      <DashboardClient />
    </ProtectedRoute>
  );
}
