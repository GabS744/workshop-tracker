import { useState, useEffect } from "react";
import { Users, Presentation, Percent } from "lucide-react";
import { api } from "../Services/Api";
import { StatCard } from "../Components/StatCard";
import { TopContributorsChart } from "../Components/TopContributorsChart";
import { WorkshopsDistributionChart } from "../Components/WorkshopsDistributionChart";
import { RecentWorkshopsTable } from "../Components/RecentWorkshopsTable";

export function DashboardPage() {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalColaboradores: 0,
    totalWorkshops: 0,
    taxaMediaParticipacao: 0,
  });
  const [topContributors, setTopContributors] = useState([]);
  const [workshopDist, setWorkshopDist] = useState({ data: [], total: 0 });
  const [recentWorkshops, setRecentWorkshops] = useState([]);

  useEffect(() => {
    async function carregarDashboard() {
      try {
        setLoading(true);

        const [colabRes, workRes] = await Promise.all([
          api.get("/api/contributors"),
          api.get("/api/workshops"),
        ]);

        const colaboradores = colabRes.data;
        const workshops = workRes.data;

        const totalParticipantesGeral = workshops.reduce(
          (acc, workshop) => acc + (workshop.totalParticipants || 0),
          0,
        );

        const taxaMediaParticipacao =
          colaboradores.length > 0 && workshops.length > 0
            ? Math.round(
                (totalParticipantesGeral /
                  (workshops.length * colaboradores.length)) *
                  100,
              )
            : 0;

        setStats({
          totalColaboradores: colaboradores.length,
          totalWorkshops: workshops.length,
          taxaMediaParticipacao,
        });

        const top5Colab = [...colaboradores]
          .sort((a, b) => (b.totalWorkshops || 0) - (a.totalWorkshops || 0))
          .slice(0, 5)
          .map((c) => ({
            name: c.fullName ? c.fullName.split(" ")[0] : c.firstName,
            workshops: c.totalWorkshops || 0,
          }));

        setTopContributors(top5Colab);

        let totalParticipantesGrafico = 0;

        const formatandoWorkshops = workshops.map((w) => {
          const participantes = w.totalParticipants || 0;
          totalParticipantesGrafico += participantes;
          return {
            name: w.name || w.nome || w.title,
            value: participantes,
          };
        });

        const top5Workshops = formatandoWorkshops
          .map((w) => ({
            ...w,
            percentage:
              totalParticipantesGrafico > 0
                ? Math.round((w.value / totalParticipantesGrafico) * 100)
                : 0,
          }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 5);

        setWorkshopDist({
          data: top5Workshops,
          total: totalParticipantesGrafico,
        });

        const recentWorkshopsData = [...workshops]
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 5)
          .map((workshop) => ({
            id: workshop.id,
            name: workshop.name || workshop.nome,
            date: workshop.date,
            participants: workshop.totalParticipants || 0,
          }));

        setRecentWorkshops(recentWorkshopsData);
      } catch (error) {
        console.error("Erro ao carregar os dados da Dashboard:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarDashboard();
  }, []);

  return (
    <div className="w-full animate-in fade-in duration-500 pb-8 font-['Inter'] flex flex-col gap-6">
      <div>
        <h1 className="text-white text-2xl font-bold">Visão Geral</h1>
        <p className="text-[#7a88a4] text-sm mt-1">
          Acompanhe as métricas da sua plataforma
        </p>
      </div>

      {loading ? (
        <div className="text-[#7a88a4] text-sm py-10 animate-pulse">
          Calculando métricas e montando gráficos...
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Total de Colaboradores"
              value={stats.totalColaboradores}
              icon={Users}
              linkTo="/colaboradores"
            />
            <StatCard
              title="Workshops Realizados"
              value={stats.totalWorkshops}
              icon={Presentation}
              linkTo="/workshops"
            />
            <StatCard
              title="Taxa Média de Participação"
              value={`${stats.taxaMediaParticipacao}%`}
              icon={Percent}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TopContributorsChart data={topContributors} />
            <WorkshopsDistributionChart
              data={workshopDist.data}
              total={workshopDist.total}
            />
          </div>

          <RecentWorkshopsTable workshops={recentWorkshops} />
        </>
      )}
    </div>
  );
}
