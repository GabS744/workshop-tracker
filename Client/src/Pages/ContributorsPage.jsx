import { useState } from "react";

import { ListView } from "../Components/ListView";
import { ContributorModal } from "../Components/ContributorModal";
import { ConfirmDeleteModal } from "../Components/ConfirmDeleteModal";
import { ContributorDetailsModal } from "../Components/CoontributorDetailsModal";

export function ContributorPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [EditContributor, setEditContributor] = useState(null);
  const [ViewContributor, setViewContributor] = useState(null);
  const [itemParaDeletar, setItemParaDeletar] = useState(null);

  const contributoresData = [
    { id: 1, nome: "Ana Paula Ribeiro", workshops: 4 },
    { id: 2, nome: "Carlos Eduardo Silva", workshops: 3 },
    { id: 3, nome: "Fernanda Costa", workshops: 4 },
    { id: 4, nome: "João Victor Almeida", workshops: 3 },
    { id: 5, nome: "Larissa Mendes", workshops: 4 },
    { id: 6, nome: "Rafael Oliveira", workshops: 3 },
    { id: 7, nome: "Beatriz Souza", workshops: 4 },
    { id: 8, nome: "Thiago Nascimento", workshops: 3 },
  ];

  const handleOpenNovo = () => {
    setEditContributor(null);
    setIsModalOpen(true);
  };

  const handleOpenEditar = (contributor) => {
    setEditContributor(contributor);
    setIsModalOpen(true);
  };

  const handleOpenDeletar = (contributor) => {
    setItemParaDeletar(contributor);
  };

  const handleSalvar = (dados) => {
    console.log("Salvando contributor no Banco de Dados:", dados);
  };

  const handleConfirmarExclusao = () => {
    console.log(
      `Deletando o contributor ID ${itemParaDeletar?.id} da plataforma...`,
    );
  };

  return (
    <div className="w-full animate-in fade-in duration-500 pb-8">
      <ListView
        variant="Contributors"
        data={contributoresData}
        onAddClick={handleOpenNovo}
        onEditClick={handleOpenEditar}
        onDeleteClick={handleOpenDeletar}
        onViewClick={(colab) => setViewContributor(colab)}
      />

      <ContributorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSalvar}
        contributor={EditContributor}
      />

      <ConfirmDeleteModal
        isOpen={itemParaDeletar !== null}
        onClose={() => setItemParaDeletar(null)}
        onConfirm={handleConfirmarExclusao}
        itemName={itemParaDeletar?.nome}
      />

      <ContributorDetailsModal
        isOpen={ViewContributor !== null}
        onClose={() => setViewContributor(null)}
        contributor={ViewContributor}
      />
    </div>
  );
}
