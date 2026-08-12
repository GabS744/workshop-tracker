import { Search, Filter, Eye, Edit, Trash2 } from "lucide-react";
import { PrimaryButton } from "./PrimaryButton";
import { useState } from "react";

export function ListView({
  variant,
  data,
  searchValue = "",
  onSearchChange,
  searchLoading = false,
  filterValues = {},
  onFilterChange,
  onAddClick,
  onEditClick,
  onDeleteClick,
  onViewClick,
}) {
  const isContributors = variant === "Contributors";

  const [showFilters, setShowFilters] = useState(false);

  const title = isContributors ? "Colaboradores" : "Workshops";

  const subtitle = `${data.length} cadastrados`;

  const buttonText = isContributors ? "Novo Colaborador" : "Novo Workshop";

  const searchPlaceholder = isContributors
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
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="w-full bg-[#161c2a] border border-[#252f45] text-white text-sm rounded-lg focus:ring-[#4d8aff] focus:border-[#4d8aff] block pl-10 p-2.5 outline-none transition-colors"
          />
        </div>

        {!isContributors && (
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-lg transition-colors cursor-pointer ${
              showFilters
                ? "bg-[#1a2540] border border-[#5c6dff] text-[#5c6dff]"
                : "bg-[#161c2a] border border-[#252f45] text-[#7a88a4] hover:bg-[#1a2540] hover:text-white"
            }`}
          >
            <Filter size={16} />
            Filtros
          </button>
        )}
      </div>

      {isContributors && searchLoading && (
        <p className="text-[#7a88a4] text-xs mb-4">
          Pesquisando colaboradores...
        </p>
      )}

      {!isContributors && showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 animate-in fade-in slide-in-from-top-2 duration-200">
          <div>
            <label className="block text-[#7a88a4] text-xs font-medium mb-1.5">
              Data de (início)
            </label>

            <input
              type="date"
              value={filterValues.dataInicio ?? ""}
              onChange={(e) => onFilterChange?.("dataInicio", e.target.value)}
              className="w-full bg-[#161c2a] border border-[#252f45] text-[#7a88a4] text-sm rounded-lg focus:ring-1 focus:ring-[#5c6dff] focus:border-[#5c6dff] block p-2.5 outline-none transition-all [&::-webkit-calendar-picker-indicator]:invert-[0.6]"
            />
          </div>

          <div>
            <label className="block text-[#7a88a4] text-xs font-medium mb-1.5">
              Data até (fim)
            </label>

            <input
              type="date"
              value={filterValues.dataFim ?? ""}
              onChange={(e) => onFilterChange?.("dataFim", e.target.value)}
              className="w-full bg-[#161c2a] border border-[#252f45] text-[#7a88a4] text-sm rounded-lg focus:ring-1 focus:ring-[#5c6dff] focus:border-[#5c6dff] block p-2.5 outline-none transition-all [&::-webkit-calendar-picker-indicator]:invert-[0.6]"
            />
          </div>

          <div>
            <label className="block text-[#7a88a4] text-xs font-medium mb-1.5">
              Mín. participantes
            </label>

            <input
              type="number"
              placeholder="Ex: 3"
              value={filterValues.minParticipantes ?? ""}
              onChange={(e) => onFilterChange?.("minParticipantes", e.target.value)}
              className="w-full bg-[#161c2a] border border-[#252f45] text-white text-sm rounded-lg focus:ring-1 focus:ring-[#5c6dff] focus:border-[#5c6dff] block p-2.5 outline-none transition-all placeholder-[#7a88a4]"
            />
          </div>

          <div>
            <label className="block text-[#7a88a4] text-xs font-medium mb-1.5">
              Máx. participantes
            </label>

            <input
              type="number"
              placeholder="Ex: 8"
              value={filterValues.maxParticipantes ?? ""}
              onChange={(e) => onFilterChange?.("maxParticipantes", e.target.value)}
              className="w-full bg-[#161c2a] border border-[#252f45] text-white text-sm rounded-lg focus:ring-1 focus:ring-[#5c6dff] focus:border-[#5c6dff] block p-2.5 outline-none transition-all placeholder-[#7a88a4]"
            />
          </div>
        </div>
      )}

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

                {isContributors ? (
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
                  <td className="py-4 px-6 text-[#7a88a4] text-sm">
                    #{item.id}
                  </td>

                  <td
                    className={`py-4 px-6 text-sm font-medium ${
                      isContributors ? "text-white" : "text-[#4d8aff]"
                    }`}
                  >
                    {item.nome}
                  </td>

                  {isContributors ? (
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
                      <button
                        onClick={() => onViewClick(item)}
                        className="flex items-center gap-1.5 bg-[#1a2540] hover:bg-[#d4e0ff] text-[#4d8aff] hover:text-[#1a2540] px-2.5 py-1.5 rounded-lg transition-colors text-xs font-semibold cursor-pointer"
                      >
                        <Eye size={16} strokeWidth={2} />

                        {isContributors && "Detalhes"}
                      </button>

                      <button
                        onClick={() => onEditClick(item)}
                        className="bg-transparent border border-[#252f45] hover:border-[#4d8aff] text-[#7a88a4] hover:text-[#4d8aff] p-1.5 rounded-lg transition-colors cursor-pointer"
                      >
                        <Edit size={16} strokeWidth={2} />
                      </button>

                      <button
                        onClick={() => onDeleteClick(item)}
                        className="bg-transparent border border-[#252f45] hover:border-[#ef4444] hover:bg-[#ef4444]/10 text-[#ef4444] p-1.5 rounded-lg transition-colors cursor-pointer"
                      >
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
