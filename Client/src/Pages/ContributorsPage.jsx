import { useEffect, useState } from "react";
import { api } from "../Services/Api";
import { ListView } from "../Components/ListView";
import { ContributorModal } from "../Components/ContributorModal";
import { ContributorDetailsModal } from "../Components/ContributorDetailsModal";
import { ConfirmDeleteModal } from "../Components/ConfirmDeleteModal";

export function ContributorsPage() {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [editingContributor, setEditingContributor] = useState(null);
  const [selectedContributor, setSelectedContributor] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  const fetchContributors = async (query = "") => {
    const endpoint = query.trim()
      ? `/api/contributors/search?name=${encodeURIComponent(query.trim())}`
      : "/api/contributors";

    const response = await api.get(endpoint);
    setContributors(response.data);
  };

  useEffect(() => {
    const carregarColaboradores = async () => {
      try {
        await fetchContributors();
      } catch (error) {
        console.error("Erro ao carregar colaboradores:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarColaboradores();
  }, []);

  useEffect(() => {
    const delay = setTimeout(async () => {
      if (loading) return;

      try {
        setSearchLoading(true);
        await fetchContributors(searchTerm);
      } catch (error) {
        console.error("Erro ao pesquisar colaboradores:", error);
      } finally {
        setSearchLoading(false);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [searchTerm, loading]);

  const handleOpenNovo = () => {
    setEditingContributor(null);
    setIsModalOpen(true);
  };

  const handleOpenEditar = (contributor) => {
    setEditingContributor(contributor);
    setIsModalOpen(true);
  };

  const handleOpenDetalhes = async (contributor) => {
    setSelectedContributor(contributor);
    setIsDetailsOpen(true);
  };

  const handleOpenDeletar = (contributor) => {
    setItemToDelete(contributor);
    setIsDeleteOpen(true);
  };

  const handleSalvar = async (dados) => {
    try {
      const nomeCompleto = dados.nome.trim().split(/\s+/);

      const firstName = nomeCompleto.shift() || "";
      const lastName = nomeCompleto.join(" ");

      const payload = {
        firstName,
        lastName,
      };

      if (dados.id) {
        const response = await api.put(
          `/api/contributors/${dados.id}`,
          payload,
        );
        setContributors((prev) =>
          prev.map((contributor) =>
            contributor.id === dados.id ? response.data : contributor,
          ),
        );
      } else {
        const response = await api.post("/api/contributors", payload);

        setContributors((prev) => [...prev, response.data]);
      }

      setIsModalOpen(false);
      setEditingContributor(null);

      await fetchContributors(searchTerm);
    } catch (error) {
      console.error("Erro ao salvar colaborador:", error);
    }
  };

  const handleConfirmarDelecao = async () => {
    if (!itemToDelete) return;

    try {
      await api.delete(`/api/contributors/${itemToDelete.id}`);

      setContributors((prev) =>
        prev.filter((contributor) => contributor.id !== itemToDelete.id),
      );

      await fetchContributors(searchTerm);

      setIsDeleteOpen(false);
      setItemToDelete(null);
    } catch (error) {
      console.error("Erro ao excluir colaborador:", error);
    }
  };

  const dadosFormatados = contributors.map((contributor) => ({
    ...contributor,
    nome:
      contributor.fullName ||
      `${contributor.firstName || ""} ${contributor.lastName || ""}`.trim(),
    workshops: contributor.totalWorkshops ?? 0,
  }));

  return (
    <div className="w-full">
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <span className="text-[#7a88a4] text-sm animate-pulse">
            Carregando colaboradores...
          </span>
        </div>
      ) : (
        <ListView
          variant="Contributors"
          data={dadosFormatados}
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          searchLoading={searchLoading}
          onAddClick={handleOpenNovo}
          onEditClick={handleOpenEditar}
          onDeleteClick={handleOpenDeletar}
          onViewClick={handleOpenDetalhes}
        />
      )}

      <ContributorModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingContributor(null);
        }}
        onSave={handleSalvar}
        contributor={
          editingContributor
            ? {
                ...editingContributor,
                nome:
                  editingContributor.fullName ||
                  `${editingContributor.firstName || ""} ${
                    editingContributor.lastName || ""
                  }`.trim(),
              }
            : null
        }
      />

      <ContributorDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false);
          setSelectedContributor(null);
        }}
        contributor={selectedContributor}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setItemToDelete(null);
        }}
        onConfirm={handleConfirmarDelecao}
        itemName={itemToDelete?.nome}
      />
    </div>
  );
}
