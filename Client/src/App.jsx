import { Routes, Route } from "react-router-dom";

import { DashboardPage } from "./Pages/DashboardPage";
import { ContributorsPage } from "./Pages/ContributorsPage";
import { WorkshopsPage } from "./Pages/WorkshopsPage";
import { DefaultLayout } from "./Components/DefaultLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />} />
      <Route index element={<DashboardPage />} />
      <Route path="/contributors" element={<ContributorsPage />} />
      <Route path="/workshops" element={<WorkshopsPage />} />
    </Routes>
  );
}

export default App;
