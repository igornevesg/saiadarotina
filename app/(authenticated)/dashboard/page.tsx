import { getDashboard } from "@/features/relationship/dashboard/application/providers/dashboardProvider";
import { DashboardPage } from "@/features/relationship/dashboard/ui/dashboardPage/dashboardPage";

export default function DashboardPageRoute() {
  const dashboard = getDashboard();

  return <DashboardPage presentation={dashboard} />;
}