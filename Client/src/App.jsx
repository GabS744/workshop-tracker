import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DefaultLayout } from "./Components/DefaultLayout";
import { DashboardPage } from "./Pages/DashboardPage";
import { ContributorPage } from "./Pages/ContributorsPage";
import { WorkshopsPage } from "./Pages/WorkshopsPage";
import { LoginPage } from "./Pages/LoginPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route path="/dashboard" element={<DefaultLayout />}>
          <Route index element={<DashboardPage />} />
          <Route element={<ContributorPage />} path="colaboradores" />
          <Route element={<WorkshopsPage />} path="workshops" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
