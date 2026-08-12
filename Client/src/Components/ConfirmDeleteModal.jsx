import { AlertTriangle } from "lucide-react";

export function ConfirmDeleteModal({ isOpen, onClose, onConfirm, itemName }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-[#161c2a] w-full max-w-100 rounded-xl shadow-2xl border border-[#252f45] font-['Inter'] p-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#ef4444]/10 flex items-center justify-center text-[#ef4444]">
            <AlertTriangle size={24} strokeWidth={2.5} />
          </div>

          <div>
            <h2 className="text-white text-lg font-bold">Excluir registro?</h2>
            <p className="text-[#7a88a4] text-sm mt-2">
              Tem certeza que deseja excluir{" "}
              <strong className="text-white">{itemName}</strong>? Esta ação é
              permanente e não poderá ser desfeita.
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-8 w-full">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 text-sm font-semibold text-[#e2e8f4] bg-transparent border border-[#252f45] rounded-lg hover:bg-[#1a2540] transition-colors"
          >
            Cancelar
          </button>

          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 py-2.5 text-sm font-semibold text-white bg-[#ef4444] hover:bg-[#dc2626] rounded-lg transition-colors"
          >
            Sim, excluir
          </button>
        </div>
      </div>
    </div>
  );
}
