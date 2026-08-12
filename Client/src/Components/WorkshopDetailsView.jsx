import { ArrowLeft, Calendar } from "lucide-react";

export function WorkshopDetailsView({ workshop, onBack }) {
  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return parts[0][0].toUpperCase();
  };

  const colaboradores = [
    { id: 1, nome: "Ana Paula Ribeiro" },
    { id: 3, nome: "Fernanda Costa" },
    { id: 5, nome: "Larissa Mendes" },
    { id: 7, nome: "Beatriz Souza" },
  ];

  return (
    <div className="w-full animate-in fade-in slide-in-from-right-4 duration-300 pb-8 font-['Inter']">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#4d8aff] hover:text-[#5c6dff] font-medium text-sm mb-6 transition-colors"
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
              {workshop.nome}
            </h1>
            <div className="flex items-center gap-2 text-[#7a88a4] text-sm">
              <Calendar size={16} />
              {workshop.data}
            </div>
          </div>

          <div>
            <h3 className="text-[#7a88a4] text-xs font-semibold uppercase tracking-wider mb-2">
              Descrição
            </h3>
            <p className="text-[#e2e8f4] text-sm leading-relaxed">
              {workshop.descricao}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-auto pt-4">
            <div className="bg-[#1a2540] rounded-xl p-5 border border-[#252f45]/50">
              <span className="block text-[#7a88a4] text-xs font-medium mb-1">
                Presentes
              </span>
              <span className="block text-white text-2xl font-bold">4</span>
            </div>
            <div className="bg-[#1a2540] rounded-xl p-5 border border-[#252f45]/50">
              <span className="block text-[#7a88a4] text-xs font-medium mb-1">
                Taxa de presença
              </span>
              <span className="block text-white text-2xl font-bold">50%</span>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-100 bg-[#161c2a] border border-[#252f45] rounded-xl p-6 flex flex-col shadow-sm">
          <h2 className="text-white text-base font-bold mb-6">
            Colaboradores Presentes{" "}
            <span className="text-[#7a88a4] font-normal">
              ({colaboradores.length})
            </span>
          </h2>

          <div className="flex flex-col">
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
        </div>
      </div>
    </div>
  );
}
