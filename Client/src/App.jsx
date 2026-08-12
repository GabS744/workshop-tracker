import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { DefaultLayout } from "./Components/DefaultLayout";
import { DashboardPage } from "./Pages/DashboardPage";
import { ContributorsPage } from "./Pages/ContributorsPage";
import { WorkshopsPage } from "./Pages/WorkshopsPage";
import { LoginPage } from "./Pages/LoginPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="dashboard" element={<DashboardPage />} />

          <Route path="colaboradores" element={<ContributorsPage />} />

          <Route path="workshops" element={<WorkshopsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
