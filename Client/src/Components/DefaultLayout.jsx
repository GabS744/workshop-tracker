import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export function DefaultLayout() {
  return (
    <div className="min-h-screen bg-[#0b0f19]">
      <Navbar />

      <main className="px-6 lg:px-46.5 py-8">
        <Outlet />
      </main>
    </div>
  );
}
