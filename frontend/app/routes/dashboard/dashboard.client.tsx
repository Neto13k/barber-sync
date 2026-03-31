import { DashboardClient } from "../../Components/dashboardClient";
import { ProtectedRoute } from "../../Components/protectedRoute";

export default function DashboardClientRoute() {
  return (
    <ProtectedRoute requiredRole="client">
      <DashboardClient />
    </ProtectedRoute>
  );
}
