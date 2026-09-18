import { Outlet, NavLink } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

// NOTA: Este es un layout MÍNIMO para validar la navegación en la Fase 1.
// En la Fase 2 se reemplaza por los componentes reales: Sidebar.tsx y Header.tsx.

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}