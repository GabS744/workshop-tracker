import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { DefaultLayout } from "./Components/DefaultLayout";
import { DashboardPage } from "./Pages/DashboardPage";
import { ContributorsPage } from "./Pages/ContributorsPage";
import { WorkshopsPage } from "./Pages/WorkshopsPage";
import { WorkshopDetailsPage } from "./Pages/WorkshopDetailsPage";
import { LoginPage } from "./Pages/LoginPage";

function RequireAuth({ children }) {
  const token = localStorage.getItem("@WorkshopTracker:token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function RedirectIfAuthenticated({ children }) {
  const token = localStorage.getItem("@WorkshopTracker:token");

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <RedirectIfAuthenticated>
              <LoginPage />
            </RedirectIfAuthenticated>
          }
        />

        <Route
          path="/"
          element={
            <RequireAuth>
              <DefaultLayout />
            </RequireAuth>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />

          <Route path="colaboradores" element={<ContributorsPage />} />

          <Route path="workshops" element={<WorkshopsPage />} />
          <Route path="workshops/:id" element={<WorkshopDetailsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
