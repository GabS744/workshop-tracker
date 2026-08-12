import { Users, Calendar, TrendingUp } from "lucide-react";

import { StatCard } from "../Components/StatCard";
import { TopContributorsChart } from "../Components/TopContributorsChart";
import { WorkshopsDistributionChart } from "../Components/WorkshopsDistributionChart";
import { RecentWorkshopsTable } from "../Components/RecentWorkshopsTable";

export function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 w-full pb-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total de Colaboradores"
          value="8"
          icon={Users}
          linkTo="/colaboradores"
        />

        <StatCard
          title="Total de Workshops"
          value="5"
          icon={Calendar}
          linkTo="/workshops"
        />

        <StatCard
          title="Taxa Média de Participação"
          value="70%"
          icon={TrendingUp}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopContributorsChart />
        <WorkshopsDistributionChart />
      </div>

      <div className="w-full">
        <RecentWorkshopsTable />
      </div>
    </div>
  );
}
