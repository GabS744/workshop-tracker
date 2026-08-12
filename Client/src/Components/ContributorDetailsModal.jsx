import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { api } from "../Services/Api"; // 👈 Importe a api

export function ContributorDetailsModal({ isOpen, onClose, contributor }) {
  const [workshopsParticipados, setWorkshopsParticipados] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && contributor) {
      buscarWorkshops();
    } else {
      setWorkshopsParticipados([]);
    }
  }, [isOpen, contributor]);

  const buscarWorkshops = async () => {
    try {
      setLoading(true);
      // Chama a rota que estava na sua documentação do Swagger
      const response = await api.get(
        `/api/contributors/${contributor.id}/workshops`,
      );
      setWorkshopsParticipados(response.data);
    } catch (error) {
      console.error("Erro ao buscar detalhes:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !contributor) return null;

  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

  const contributorName =
    contributor.nome ||
    contributor.fullName ||
    `${contributor.firstName || ""} ${contributor.lastName || ""}`.trim();

  const totalWorkshops =
    contributor.workshops ??
    contributor.totalWorkshops ??
    workshopsParticipados.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-[#161c2a] w-full max-w-125 rounded-xl shadow-2xl border border-[#252f45] font-['Inter'] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-5 border-b border-[#252f45]">
          <h2 className="text-white text-lg font-bold">
            Detalhes do colaborador
          </h2>
          <button
            onClick={onClose}
            className="text-[#7a88a4] hover:text-white transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#252f45]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#1a2540] text-[#5c6dff] flex items-center justify-center text-sm font-bold tracking-wider">
                {getInitials(contributorName)}
              </div>

              <div>
                <h3 className="text-white text-base font-bold">
                  {contributorName}
                </h3>
                <span className="text-[#7a88a4] text-sm">
                  #{contributor.id}
                </span>
              </div>
            </div>

            <div className="text-right flex flex-col items-end">
              <span className="text-[#5c6dff] text-2xl font-bold leading-none mb-1">
                {totalWorkshops}
              </span>
              <span className="text-[#7a88a4] text-xs">workshops</span>
            </div>
          </div>

          <div>
            <h4 className="text-[#7a88a4] text-xs font-semibold uppercase tracking-wider mb-4">
              Workshops Participados
            </h4>

            {loading ? (
              <p className="text-[#7a88a4] text-sm text-center">
                Buscando histórico...
              </p>
            ) : workshopsParticipados.length === 0 ? (
              <p className="text-[#7a88a4] text-sm text-center bg-[#1a2540]/30 p-4 rounded-lg border border-[#252f45]">
                Nenhuma participação registrada.
              </p>
            ) : (
              <div className="flex flex-col gap-3 max-h-62.5 overflow-y-auto pr-2 custom-scrollbar">
                {workshopsParticipados.map((ws) => (
                  <div
                    key={ws.id}
                    className="bg-[#1a2540]/60 rounded-lg p-3.5 flex items-start gap-3 border border-[#252f45]/50 hover:bg-[#1a2540] transition-colors"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#5c6dff] mt-2 shrink-0"></div>
                    <div>
                      <p className="text-[#e2e8f4] text-sm font-medium mb-0.5">
                        {ws.name || ws.title || ws.nome}
                      </p>
                      <p className="text-[#7a88a4] text-xs">
                        {ws.date || ws.data}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="p-5 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-semibold text-white bg-[#5c6dff] hover:bg-[#4a5ce8] rounded-lg transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
