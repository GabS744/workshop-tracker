import { useEffect, useState } from "react";
import { ArrowLeft, Calendar } from "lucide-react";
import { api } from "../Services/Api";

export function WorkshopDetailsView({ workshop, onBack }) {
  const [colaboradores, setColaboradores] = useState([]);
  const [workshopDetalhado, setWorkshopDetalhado] = useState(workshop);
  const [totalColaboradores, setTotalColaboradores] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscarDetalhes = async () => {
      try {
        setLoading(true);

        const [workshopResponse, colaboradoresResponse] = await Promise.all([
          api.get(`/api/workshops/${workshop.id}`),
          api.get("/api/contributors"),
        ]);

        const lista = workshopResponse.data.contributors ?? [];

        setWorkshopDetalhado(workshopResponse.data);
        setTotalColaboradores(colaboradoresResponse.data.length);
        setColaboradores(
          lista.map((c) => ({
            id: c.id,
            nome: c.fullName || `${c.firstName} ${c.lastName}`,
          })),
        );
      } catch (error) {
        console.error("Erro ao buscar detalhes do workshop:", error);
      } finally {
        setLoading(false);
      }
    };

    buscarDetalhes();
  }, [workshop.id]);

  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return parts[0][0].toUpperCase();
  };

  const formatDate = (value) => {
    if (!value) return "";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return String(value).split("T")[0] || "";
    }

    return date.toLocaleDateString("pt-BR");
  };

  const nomeWorkshop = workshopDetalhado?.name || workshop.nome;
  const dataWorkshop = formatDate(workshopDetalhado?.date || workshop.data);
  const descricaoWorkshop =
    workshopDetalhado?.description || workshop.descricao;
  const totalParticipantes =
    workshopDetalhado?.totalParticipants ?? colaboradores.length;
  const taxaPresenca =
    totalColaboradores > 0
      ? Math.round((totalParticipantes / totalColaboradores) * 100)
      : 0;

  return (
    <div className="w-full animate-in fade-in slide-in-from-right-4 duration-300 pb-8 font-['Inter']">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#4d8aff] hover:text-[#5c6dff] font-medium text-sm mb-6 transition-colors cursor-pointer"
      >
        <ArrowLeft size={16} />
        Voltar
      </button>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 bg-[#161c2a] border border-[#252f45] rounded-xl p-8 flex flex-col gap-8 shadow-sm">
          <div>
            <span className="inline-block bg-[#1a2540] text-[#7a88a4] text-xs font-semibold px-2.5 py-1 rounded mb-4">
              #{workshop.id}
            </span>
            <h1 className="text-white text-3xl font-bold mb-3 tracking-tight">
              {nomeWorkshop}
            </h1>
            <div className="flex items-center gap-2 text-[#7a88a4] text-sm">
              <Calendar size={16} />
              {dataWorkshop}
            </div>
          </div>

          <div>
            <h3 className="text-[#7a88a4] text-xs font-semibold uppercase tracking-wider mb-2">
              Descrição
            </h3>
            <p className="text-[#e2e8f4] text-sm leading-relaxed">
              {descricaoWorkshop}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-auto pt-4">
            <div className="bg-[#1a2540] rounded-xl p-5 border border-[#252f45]/50">
              <span className="block text-[#7a88a4] text-xs font-medium mb-1">
                Presentes
              </span>
              <span className="block text-white text-2xl font-bold">
                {loading ? "-" : totalParticipantes}
              </span>
            </div>
            <div className="bg-[#1a2540] rounded-xl p-5 border border-[#252f45]/50">
              <span className="block text-[#7a88a4] text-xs font-medium mb-1">
                Taxa de presença
              </span>
              <span className="block text-white text-2xl font-bold">
                {loading ? "-" : `${taxaPresenca}%`}
              </span>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-100 bg-[#161c2a] border border-[#252f45] rounded-xl p-6 flex flex-col shadow-sm">
          <h2 className="text-white text-base font-bold mb-6">
            Colaboradores Presentes{" "}
            <span className="text-[#7a88a4] font-normal">
              ({loading ? "..." : colaboradores.length})
            </span>
          </h2>

          <div className="flex flex-col">
            {loading ? (
              <p className="text-[#7a88a4] text-sm text-center py-4">
                Buscando presenças...
              </p>
            ) : colaboradores.length === 0 ? (
              <p className="text-[#7a88a4] text-sm text-center py-4 bg-[#1a2540]/30 rounded-lg border border-[#252f45]">
                Nenhum colaborador registrado.
              </p>
            ) : (
              <div className="flex flex-col max-h-100 overflow-y-auto pr-2 custom-scrollbar">
                {colaboradores.map((colab) => (
                  <div
                    key={colab.id}
                    className="flex items-center gap-4 py-3.5 border-b border-[#252f45] last:border-0 hover:bg-[#1a2540]/30 transition-colors px-2 rounded-lg -mx-2"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#1a2540] text-[#5c6dff] flex items-center justify-center text-xs font-bold tracking-wider shrink-0">
                      {getInitials(colab.nome)}
                    </div>
                    <div>
                      <p className="text-[#e2e8f4] text-sm font-medium">
                        {colab.nome}
                      </p>
                      <p className="text-[#7a88a4] text-xs">#{colab.id}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
