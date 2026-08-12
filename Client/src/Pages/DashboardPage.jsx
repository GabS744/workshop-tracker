import { useState, useEffect } from "react";
import { Users, Presentation, Percent } from "lucide-react";
import { api } from "../Services/Api";

// Importe os seus componentes (ajuste os caminhos se precisar)
import { StatCard } from "../Components/StatCard";
import { TopContributorsChart } from "../Components/TopContributorsChart";
import { WorkshopsDistributionChart } from "../Components/WorkshopsDistributionChart";

export function DashboardPage() {
  const [loading, setLoading] = useState(true);

  // Estados para armazenar os dados calculados
  const [stats, setStats] = useState({
    totalColaboradores: 0,
    totalWorkshops: 0,
    taxaMediaParticipacao: 0,
  });
  const [topContributors, setTopContributors] = useState([]);
  const [workshopDist, setWorkshopDist] = useState({ data: [], total: 0 });

  useEffect(() => {
    async function carregarDashboard() {
      try {
        setLoading(true);

        // Fazemos as duas requisições ao mesmo tempo
        const [colabRes, workRes] = await Promise.all([
          api.get("/api/contributors"),
          api.get("/api/workshops"),
        ]);

        const colaboradores = colabRes.data;
        const workshops = workRes.data;

        // 1. CARDS DE ESTATÍSTICAS
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

        // 2. DADOS DO GRÁFICO DE BARRAS (Top 5 Colaboradores)
        const top5Colab = [...colaboradores]
          // Ordena do maior número de workshops para o menor
          .sort((a, b) => (b.totalWorkshops || 0) - (a.totalWorkshops || 0))
          .slice(0, 5) // Pega só os 5 primeiros
          .map((c) => ({
            // Pega só o primeiro nome para não quebrar o gráfico
            name: c.fullName ? c.fullName.split(" ")[0] : c.firstName,
            workshops: c.totalWorkshops || 0,
          }));

        setTopContributors(top5Colab);

        // 3. DADOS DO GRÁFICO DE PIZZA (Distribuição)
        let totalParticipantesGrafico = 0;

        // Mapeia os workshops e calcula o total de participantes globais
        // ATENÇÃO: Ajuste a propriedade 'participantesCount' para o nome correto que vem da sua API
        const formatandoWorkshops = workshops.map((w) => {
          const participantes = w.totalParticipants || 0;
          totalParticipantesGrafico += participantes;
          return {
            name: w.name || w.nome || w.title,
            value: participantes,
          };
        });

        // Calcula a porcentagem e pega os 5 maiores para o gráfico
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
      {/* Cabeçalho */}
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
          {/* Seção 1: Cards */}
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

          {/* Seção 2: Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TopContributorsChart data={topContributors} />
            <WorkshopsDistributionChart
              data={workshopDist.data}
              total={workshopDist.total}
            />
          </div>
        </>
      )}
    </div>
  );
}
