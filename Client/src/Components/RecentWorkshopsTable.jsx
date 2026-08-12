import { Link } from "react-router-dom";
import { ArrowRight, Eye } from "lucide-react";

export function RecentWorkshopsTable() {
  const workshops = [
    {
      id: 1,
      name: "Testes Automatizados com xUnit",
      date: "13/03/2025",
      participants: 4,
    },
    {
      id: 2,
      name: "Segurança em APIs REST",
      date: "12/12/2024",
      participants: 8,
    },
    {
      id: 3,
      name: "React 19 e Server Components",
      date: "12/09/2024",
      participants: 5,
    },
    {
      id: 4,
      name: "Introdução ao Docker",
      date: "13/06/2024",
      participants: 5,
    },
    { id: 5, name: "Clean Code com C#", date: "14/03/2024", participants: 6 },
  ];

  return (
    <div className="bg-[#161c2a] rounded-xl p-6 w-full font-['Inter'] shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-base font-semibold">
          Workshops Recentes
        </h2>

        <Link
          to="/workshops"
          className="text-[#7a88a4] hover:text-white text-sm font-medium flex items-center gap-1 transition-colors duration-200"
        >
          Ver todos
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#252f45]">
              <th className="pb-4 text-[#7a88a4] text-xs font-semibold uppercase tracking-wider w-[40%]">
                Nome
              </th>
              <th className="pb-4 text-[#7a88a4] text-xs font-semibold uppercase tracking-wider w-[20%]">
                Data
              </th>
              <th className="pb-4 text-[#7a88a4] text-xs font-semibold uppercase tracking-wider w-[20%]">
                Participantes
              </th>
              <th className="pb-4 text-[#7a88a4] text-xs font-semibold uppercase tracking-wider w-[20%] text-right"></th>
            </tr>
          </thead>
          <tbody>
            {workshops.map((workshop) => (
              <tr
                key={workshop.id}
                className="border-b border-[#252f45] last:border-0 hover:bg-[#1a2540]/30 transition-colors duration-200"
              >
                {/* Nome */}
                <td className="py-4 text-white text-sm font-medium">
                  {workshop.name}
                </td>

                {/* Data */}
                <td className="py-4 text-[#7a88a4] text-sm">{workshop.date}</td>

                <td className="py-4">
                  <span className="bg-[#1a2540] text-[#4d8aff] text-xs font-medium px-2.5 py-1 rounded-full">
                    {workshop.participants} presentes
                  </span>
                </td>

                <td className="py-4 text-right">
                  <Link
                    to={`/workshops/${workshop.id}`}
                    className="inline-flex items-center gap-1.5 bg-[#1a2540] hover:bg-[#d4e0ff] text-[#4d8aff] hover:text-[#1a2540] text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors duration-200"
                  >
                    <Eye size={14} strokeWidth={2.5} />
                    Ver detalhes
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
