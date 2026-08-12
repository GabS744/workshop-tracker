import { Search, Filter, Eye, Edit, Trash2 } from "lucide-react";
import { PrimaryButton } from "./PrimaryButton";

export function ListView({ variant, data, onAddClick }) {
  const isColaboradores = variant === "colaboradores";

  const title = isColaboradores ? "Colaboradores" : "Workshops";
  const subtitle = `${data.length} cadastrados`;
  const buttonText = isColaboradores ? "Novo Colaborador" : "Novo Workshop";
  const searchPlaceholder = isColaboradores
    ? "Pesquisar colaborador..."
    : "Pesquisar workshop...";

  return (
    <div className="w-full font-['Inter']">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-white text-2xl font-bold">{title}</h1>
          <p className="text-[#7a88a4] text-sm mt-1">{subtitle}</p>
        </div>
        <PrimaryButton text={buttonText} onClick={onAddClick} />
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-75">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-[#7a88a4]" />
          </div>
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="w-full bg-[#161c2a] border border-[#252f45] text-white text-sm rounded-lg focus:ring-[#4d8aff] focus:border-[#4d8aff] block pl-10 p-2.5 outline-none transition-colors"
          />
        </div>

        {!isColaboradores && (
          <button className="flex items-center gap-2 bg-[#161c2a] border border-[#252f45] hover:bg-[#1a2540] text-[#7a88a4] hover:text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors">
            <Filter size={16} />
            Filtros
          </button>
        )}
      </div>

      <div className="bg-[#161c2a] border border-[#252f45] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#1a2540]/50 border-b border-[#252f45]">
              <tr>
                <th className="py-4 px-6 text-[#7a88a4] text-xs font-semibold uppercase w-20">
                  ID
                </th>
                <th className="py-4 px-6 text-[#7a88a4] text-xs font-semibold uppercase">
                  Nome
                </th>

                {isColaboradores ? (
                  <th className="py-4 px-6 text-[#7a88a4] text-xs font-semibold uppercase w-37.5">
                    Workshops
                  </th>
                ) : (
                  <>
                    <th className="py-4 px-6 text-[#7a88a4] text-xs font-semibold uppercase w-37.5">
                      Data
                    </th>
                    <th className="py-4 px-6 text-[#7a88a4] text-xs font-semibold uppercase">
                      Descrição
                    </th>
                    <th className="py-4 px-6 text-[#7a88a4] text-xs font-semibold uppercase w-37.5">
                      Participantes
                    </th>
                  </>
                )}

                <th className="py-4 px-6 text-right text-[#7a88a4] text-xs font-semibold uppercase w-50">
                  Ações
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-[#252f45] last:border-0 hover:bg-[#1a2540]/30 transition-colors"
                >
                  {/* ID */}
                  <td className="py-4 px-6 text-[#7a88a4] text-sm">
                    #{item.id}
                  </td>

                  <td
                    className={`py-4 px-6 text-sm font-medium ${isColaboradores ? "text-white" : "text-[#4d8aff]"}`}
                  >
                    {item.nome}
                  </td>

                  {isColaboradores ? (
                    <td className="py-4 px-6">
                      <span className="bg-[#1a2540] text-[#4d8aff] text-xs font-medium px-3 py-1 rounded-full">
                        {item.workshops} workshops
                      </span>
                    </td>
                  ) : (
                    <>
                      <td className="py-4 px-6 text-[#7a88a4] text-sm">
                        {item.data}
                      </td>
                      <td className="py-4 px-6 text-[#7a88a4] text-sm truncate max-w-50">
                        {item.descricao}
                      </td>
                      <td className="py-4 px-6">
                        <span className="bg-[#1a2540] text-[#4d8aff] text-xs font-medium px-3 py-1 rounded-full">
                          {item.participantes}
                        </span>
                      </td>
                    </>
                  )}

                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <button className="flex items-center gap-1.5 bg-[#1a2540] hover:bg-[#d4e0ff] text-[#4d8aff] hover:text-[#1a2540] px-2.5 py-1.5 rounded-lg transition-colors text-xs font-semibold">
                        <Eye size={16} strokeWidth={2} />
                        {isColaboradores && "Detalhes"}
                      </button>

                      <button className="bg-transparent border border-[#252f45] hover:border-[#4d8aff] text-[#7a88a4] hover:text-[#4d8aff] p-1.5 rounded-lg transition-colors">
                        <Edit size={16} strokeWidth={2} />
                      </button>

                      <button className="bg-transparent border border-[#252f45] hover:border-[#ef4444] hover:bg-[#ef4444]/10 text-[#ef4444] p-1.5 rounded-lg transition-colors">
                        <Trash2 size={16} strokeWidth={2} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
