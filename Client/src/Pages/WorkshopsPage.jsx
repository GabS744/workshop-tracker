import { useState } from "react";

import { ListView } from "../Components/ListView";
import { WorkshopModal } from "../Components/WorkshopModal";
import { ConfirmDeleteModal } from "../Components/ConfirmDeleteModal";
import { WorkshopDetailsView } from "../Components/WorkshopDetailsView";

export function WorkshopsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editWorkshop, setEditWorkshop] = useState(null);
  const [itemParaDeletar, setItemParaDeletar] = useState(null);

  const [viewWorkshop, setViewWorkshop] = useState(null);

  const workshopsData = [
    {
      id: 5,
      nome: "Testes Automatizados com xUnit",
      data: "13/03/2025",
      descricao:
        "Cultura de testes no time: unitários, integração e E2E com xUnit, Moq e Testcontainers.",
      participantes: "4/8",
    },
    {
      id: 4,
      nome: "Segurança em APIs REST",
      data: "12/12/2024",
      descricao:
        "JWT, OAuth2, rate limiting e OWASP Top 10: construindo APIs indestrutíveis.",
      participantes: "8/8",
    },
    {
      id: 3,
      nome: "React 19 e Server Components",
      data: "12/09/2024",
      descricao:
        "As principais novidades do React 19, com foco em performance e Server Components.",
      participantes: "5/8",
    },
    {
      id: 2,
      nome: "Introdução ao Docker",
      data: "13/06/2024",
      descricao:
        "Containers na prática: do conceito ao deploy. Como padronizar ambientes.",
      participantes: "5/8",
    },
    {
      id: 1,
      nome: "Clean Code com C#",
      data: "14/03/2024",
      descricao:
        "Boas práticas de código limpo aplicadas ao ecossistema .NET com foco em legibilidade.",
      participantes: "6/8",
    },
  ];

  const colaboradoresDisponiveis = [
    { id: 1, nome: "Ana Paula Ribeiro" },
    { id: 2, nome: "Carlos Eduardo Silva" },
    { id: 3, nome: "Fernanda Costa" },
    { id: 4, nome: "João Victor Almeida" },
    { id: 5, nome: "Larissa Mendes" },
    { id: 7, nome: "Beatriz Souza" },
  ];

  const handleOpenNovo = () => {
    setEditWorkshop(null);
    setIsModalOpen(true);
  };

  const handleOpenEditar = (workshop) => {
    setEditWorkshop(workshop);
    setIsModalOpen(true);
  };

  const handleSalvar = (dados) => {
    console.log("Salvando Workshop:", dados);
  };

  const handleConfirmarExclusao = () => {
    console.log(`Deletando Workshop ID ${itemParaDeletar?.id}...`);
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
      <ListView
        variant="workshops"
        data={workshopsData}
        onAddClick={handleOpenNovo}
        onEditClick={handleOpenEditar}
        onDeleteClick={(ws) => setItemParaDeletar(ws)}
        onViewClick={(ws) => setViewWorkshop(ws)}
      />

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
