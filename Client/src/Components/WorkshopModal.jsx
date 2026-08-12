import { useState } from "react";
import { X } from "lucide-react";

export function WorkshopModal({
  isOpen,
  onClose,
  onSave,
  workshop = null,
  colaboradoresDisponiveis = [],
}) {
  if (!isOpen) return null;

  return (
    <WorkshopModalContent
      key={`${workshop?.id ?? "novo"}-${isOpen}`}
      onClose={onClose}
      onSave={onSave}
      workshop={workshop}
      colaboradoresDisponiveis={colaboradoresDisponiveis}
    />
  );
}

function WorkshopModalContent({
  onClose,
  onSave,
  workshop,
  colaboradoresDisponiveis,
}) {
  const [nome, setNome] = useState(workshop?.nome ?? "");
  const [dataRealizacao, setDataRealizacao] = useState(
    workshop?.dataInput ?? "",
  );
  const [descricao, setDescricao] = useState(workshop?.descricao ?? "");
  const [selecionados, setSelecionados] = useState(
    workshop?.colaboradoresIds ?? [],
  );

  const isEditing = !!workshop;

  const toggleColaborador = (id) => {
    setSelecionados((prev) =>
      prev.includes(id)
        ? prev.filter((colabId) => colabId !== id)
        : [...prev, id],
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nome.trim() || !dataRealizacao.trim()) return;

    onSave({
      id: isEditing ? workshop.id : undefined,
      nome: nome.trim(),
      data: dataRealizacao,
      descricao: descricao.trim(),
      colaboradoresIds: selecionados,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-[#161c2a] w-full max-w-125 rounded-xl shadow-2xl border border-[#252f45] font-['Inter'] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200 max-h-[90vh]">
        <div className="flex items-center justify-between p-5 border-b border-[#252f45] shrink-0">
          <h2 className="text-white text-lg font-bold">
            {isEditing ? "Editar Workshop" : "Novo Workshop"}
          </h2>

          <button
            onClick={onClose}
            className="text-[#7a88a4] hover:text-white transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col overflow-y-auto">
          <div className="p-5 flex flex-col gap-4">
            <div>
              <label className="block text-[#e2e8f4] text-sm font-medium mb-2">
                Nome
              </label>

              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Nome do workshop"
                className="w-full bg-transparent border border-[#252f45] text-white text-sm rounded-lg focus:ring-1 focus:ring-[#5c6dff] focus:border-[#5c6dff] block p-3 outline-none transition-all placeholder-[#7a88a4]"
              />
            </div>

            <div>
              <label className="block text-[#e2e8f4] text-sm font-medium mb-2">
                Data de realização
              </label>

              <input
                type="date"
                value={dataRealizacao}
                onChange={(e) => setDataRealizacao(e.target.value)}
                className="w-full bg-transparent border border-[#252f45] text-[#7a88a4] text-sm rounded-lg focus:ring-1 focus:ring-[#5c6dff] focus:border-[#5c6dff] block p-3 outline-none transition-all [&::-webkit-calendar-picker-indicator]:invert-[0.6]"
              />
            </div>

            <div>
              <label className="block text-[#e2e8f4] text-sm font-medium mb-2">
                Descrição
              </label>

              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Descreva o conteúdo do workshop"
                className="w-full h-24 resize-none bg-transparent border border-[#252f45] text-white text-sm rounded-lg focus:ring-1 focus:ring-[#5c6dff] focus:border-[#5c6dff] block p-3 outline-none transition-all placeholder-[#7a88a4]"
              />
            </div>

            <div>
              <label className="block text-[#e2e8f4] text-sm font-medium mb-2">
                Colaboradores presentes{" "}
                <span className="text-[#7a88a4] font-normal">
                  ({selecionados.length} selecionados)
                </span>
              </label>

              <div className="border border-[#252f45] rounded-lg h-37.5 overflow-y-auto">
                {colaboradoresDisponiveis.map((colab) => (
                  <label
                    key={colab.id}
                    className="flex items-center justify-between p-3 border-b border-[#252f45] last:border-0 hover:bg-[#1a2540]/30 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selecionados.includes(colab.id)}
                        onChange={() => toggleColaborador(colab.id)}
                        className="w-4 h-4 rounded bg-transparent border-[#252f45] accent-[#5c6dff] cursor-pointer"
                      />

                      <span className="text-white text-sm">{colab.nome}</span>
                    </div>

                    <span className="text-[#7a88a4] text-xs">#{colab.id}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="p-5 pt-2 flex justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-semibold text-[#e2e8f4] bg-transparent border border-[#252f45] rounded-lg hover:bg-[#1a2540] transition-colors cursor-pointer"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-semibold text-white bg-[#5c6dff] hover:bg-[#4a5ce8] rounded-lg transition-colors cursor-pointer"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
