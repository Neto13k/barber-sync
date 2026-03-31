import { DashboardBarber } from "../../Components/dashboardbarber";
import { ProtectedRoute } from "../../Components/protectedRoute";

export default function DashboardBarberRoute() {
  return (
    <ProtectedRoute requiredRole="barber">
      <DashboardBarber />
    </ProtectedRoute>
  );
}
