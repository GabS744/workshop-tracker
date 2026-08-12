import { useEffect, useState } from "react";
import { api } from "../Services/Api";

import { ListView } from "../Components/ListView";
import { WorkshopModal } from "../Components/WorkshopModal";
import { ConfirmDeleteModal } from "../Components/ConfirmDeleteModal";
import { WorkshopDetailsView } from "../Components/WorkshopDetailsView";

const defaultFilters = {
  dataInicio: "",
  dataFim: "",
  minParticipantes: "",
  maxParticipantes: "",
};

const formatDateForDisplay = (value) => {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value).split("T")[0] || "";

  return date.toLocaleDateString("pt-BR");
};

const formatDateForInput = (value) => {
  if (!value) return "";
  return String(value).split("T")[0];
};

const buildWorkshopsUrl = (searchTerm, filters) => {
  const params = new URLSearchParams();

  if (searchTerm.trim()) {
    params.set("nome", searchTerm.trim());
  }

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== "" && value !== null && value !== undefined) {
      params.set(key, value);
    }
  });

  const query = params.toString();
  return query ? `/api/workshops/search?${query}` : "/api/workshops";
};

export function WorkshopsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editWorkshop, setEditWorkshop] = useState(null);
  const [itemParaDeletar, setItemParaDeletar] = useState(null);
  const [viewWorkshop, setViewWorkshop] = useState(null);

  const [workshopsData, setWorkshopsData] = useState([]);
  const [colaboradoresDisponiveis, setColaboradoresDisponiveis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValues, setFilterValues] = useState(defaultFilters);

  const loadContributors = async () => {
    const response = await api.get("/api/contributors");

    setColaboradoresDisponiveis(
      response.data.map((c) => ({
        id: c.id,
        nome: c.fullName || `${c.firstName} ${c.lastName}`.trim(),
      })),
    );
  };

  const loadWorkshops = async (query = searchTerm, filters = filterValues) => {
    const response = await api.get(buildWorkshopsUrl(query, filters));

    setWorkshopsData(
      response.data.map((dto) => ({
        id: dto.id,
        nome: dto.name,
        data: formatDateForDisplay(dto.date),
        dataInput: formatDateForInput(dto.date),
        descricao: dto.description,
        participantes: `${dto.totalParticipants ?? 0} presentes`,
        colaboradoresIds: dto.contributors?.map((c) => c.id) ?? [],
        raw: dto,
      })),
    );
  };

  const refreshWorkshops = async (
    query = searchTerm,
    filters = filterValues,
  ) => {
    try {
      setSearchLoading(true);
      await loadWorkshops(query, filters);
    } catch (error) {
      console.error("Erro ao carregar workshops:", error);
    } finally {
      setSearchLoading(false);
    }
  };

  useEffect(() => {
    const carregarInicial = async () => {
      try {
        setLoading(true);
        await Promise.all([
          loadContributors(),
          loadWorkshops("", defaultFilters),
        ]);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    carregarInicial();
  }, []);

  useEffect(() => {
    if (!initialized) return;

    const timeout = setTimeout(() => {
      refreshWorkshops(searchTerm, filterValues);
    }, 300);

    return () => clearTimeout(timeout);
  }, [initialized, searchTerm, filterValues]);

  const handleOpenNovo = () => {
    setEditWorkshop(null);
    setIsModalOpen(true);
  };

  const handleOpenEditar = (workshop) => {
    setEditWorkshop(workshop);
    setIsModalOpen(true);
  };

  const handleSalvar = async (dados) => {
    try {
      const payload = {
        name: dados.nome,
        date: dados.data,
        description: dados.descricao,
        contributorIds: dados.colaboradoresIds ?? [],
      };

      if (dados.id) {
        await api.put(`/api/workshops/${dados.id}`, payload);
      } else {
        await api.post("/api/workshops", payload);
      }

      setIsModalOpen(false);
      setEditWorkshop(null);
      await refreshWorkshops(searchTerm, filterValues);
    } catch (error) {
      console.error("Erro ao salvar Workshop:", error);
      alert("Erro ao salvar o workshop. Verifique os dados.");
    }
  };

  const handleConfirmarExclusao = async () => {
    if (!itemParaDeletar) return;
    try {
      await api.delete(`/api/workshops/${itemParaDeletar.id}`);
      setItemParaDeletar(null);
      await refreshWorkshops(searchTerm, filterValues);
    } catch (error) {
      console.error("Erro ao deletar Workshop:", error);
      alert("Erro ao excluir. Tente novamente.");
    }
  };

  const handleFilterChange = (field, value) => {
    setFilterValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (viewWorkshop) {
    return (
      <WorkshopDetailsView
        workshop={viewWorkshop}
        onBack={() => setViewWorkshop(null)}
      />
    );
  }

  return (
    <div className="w-full animate-in fade-in duration-500 pb-8">
      {loading ? (
        <div className="text-[#7a88a4] text-sm text-center py-10">
          Carregando workshops...
        </div>
      ) : (
        <ListView
          variant="workshops"
          data={workshopsData}
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          searchLoading={searchLoading}
          filterValues={filterValues}
          onFilterChange={handleFilterChange}
          onAddClick={handleOpenNovo}
          onEditClick={handleOpenEditar}
          onDeleteClick={(ws) => setItemParaDeletar(ws)}
          onViewClick={(ws) => setViewWorkshop(ws)}
        />
      )}

      <WorkshopModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSalvar}
        workshop={editWorkshop}
        colaboradoresDisponiveis={colaboradoresDisponiveis}
      />

      <ConfirmDeleteModal
        isOpen={itemParaDeletar !== null}
        onClose={() => setItemParaDeletar(null)}
        onConfirm={handleConfirmarExclusao}
        itemName={itemParaDeletar?.nome}
      />
    </div>
  );
}
