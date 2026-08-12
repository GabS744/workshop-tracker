import { useState } from "react";
import { X } from "lucide-react";

export function ColaboradorModal({
  isOpen,
  onClose,
  onSave,
  colaborador = null,
}) {
  if (!isOpen) return null;

  return (
    <ColaboradorModalContent
      key={`${colaborador?.id ?? "novo"}-${isOpen}`}
      onClose={onClose}
      onSave={onSave}
      colaborador={colaborador}
    />
  );
}

function ColaboradorModalContent({
  onClose,
  onSave,
  colaborador,
}) {
  const [nome, setNome] = useState(colaborador?.nome ?? "");

  const isEditing = !!colaborador;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nome.trim()) return;

    onSave({
      id: isEditing ? colaborador.id : undefined,
      nome: nome.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-[#161c2a] w-full max-w-120 rounded-xl shadow-2xl border border-[#252f45] font-['Inter'] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between p-5 border-b border-[#252f45]">
          <h2 className="text-white text-lg font-bold">
            {isEditing ? "Editar Colaborador" : "Novo Colaborador"}
          </h2>

          <button
            onClick={onClose}
            className="text-[#7a88a4] hover:text-white transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col">
          
          <div className="p-5">
            <label className="block text-[#e2e8f4] text-sm font-medium mb-2">
              Nome
            </label>

            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome completo"
              autoFocus
              className="w-full bg-transparent border border-[#252f45] text-white text-sm rounded-lg focus:ring-1 focus:ring-[#5c6dff] focus:border-[#5c6dff] block p-3 outline-none transition-all placeholder-[#7a88a4]"
            />
          </div>

          <div className="p-5 pt-0 flex justify-end gap-3 mt-4">
            
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