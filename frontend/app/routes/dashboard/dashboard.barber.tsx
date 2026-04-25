import { DashboardBarber } from "../../Components/dashboardbarber";
import { ProtectedRoute } from "../../Components/protectedRoute";

/**
Rota protegida para o dashboard do barbeiro.
*/
export default function DashboardBarberRoute() {
  return (
    <ProtectedRoute requiredRole="barber">
      <DashboardBarber />
    </ProtectedRoute>
  );
}
