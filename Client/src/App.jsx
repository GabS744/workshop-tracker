import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DefaultLayout } from "./Components/DefaultLayout";
import { DashboardPage } from "./Pages/DashboardPage";
import { ContributorPage } from "./Pages/ContributorsPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="/colaboradores" element={<ContributorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
