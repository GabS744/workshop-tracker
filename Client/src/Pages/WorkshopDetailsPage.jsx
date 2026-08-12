import { Navigate, useNavigate, useParams } from "react-router-dom";

import { WorkshopDetailsView } from "../Components/WorkshopDetailsView";

export function WorkshopDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const workshop = id ? { id: Number(id) } : null;

  if (!workshop?.id) {
    return <Navigate to="/workshops" replace />;
  }

  return (
    <WorkshopDetailsView
      workshop={workshop}
      onBack={() => navigate("/workshops")}
    />
  );
}
