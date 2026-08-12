import { Plus } from "lucide-react";

export function PrimaryButton({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-[#5c6dff] hover:bg-[#4a5ce8] text-white text-sm font-semibold px-4 py-2.5 rounded-lg flex items-center gap-2 transition-colors duration-200 font-['Inter'] shadow-sm cursor-pointer"
    >
      <Plus size={18} strokeWidth={2.5} />
      {text}
    </button>
  );
}
