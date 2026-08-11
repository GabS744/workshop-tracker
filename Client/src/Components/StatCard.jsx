import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function StatCard({ title, value, icon: Icon, linkTo }) {
  return (
    <div className="bg-[#161c2a] rounded-xl p-6 flex items-center justify-between font-['Inter'] shadow-sm w-full">
      
      <div className="flex items-center gap-5">
 
        <div className="w-12 h-12 bg-[#1a2540] rounded-xl flex items-center justify-center text-[#4d8aff] shrink-0">
          <Icon size={24} strokeWidth={2.5} />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-[#7a88a4]">
            {title}
          </span>
          <span className="text-3xl font-bold text-[#e2e8f4]">
            {value}
          </span>
        </div>
      </div>

      {linkTo && (
        <Link
          to={linkTo}
          className="bg-[#1a2540] hover:bg-[#d4e0ff] text-[#4d8aff] hover:text-[#1a2540] text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors duration-200"
        >
          Ver lista
          <ArrowRight size={14} strokeWidth={2.5} />
        </Link>
      )}
    </div>
  );
}