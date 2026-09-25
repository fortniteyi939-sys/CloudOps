import { Outlet} from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

// Layout de altura fija (h-screen + overflow-hidden): el sidebar, el header y
// cualquier bloque "shrink-0" de una página quedan siempre visibles. Solo el
// <main> hace scroll (overflow-y-auto) cuando el contenido de una página no
// entra completo, en vez de que la página entera (html/body) se desplace.
export default function Layout() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-0">
        <Header />
        <main className="flex-1 min-h-0 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}