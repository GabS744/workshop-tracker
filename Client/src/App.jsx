import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DefaultLayout } from "./Components/DefaultLayout";
import { DashboardPage } from "./Pages/DashboardPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<DashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
