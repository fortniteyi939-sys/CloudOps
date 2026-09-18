import { useLocation } from "react-router-dom";

const titles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/planning": "Planificación Cloud",
  "/costs": "Costos y economía Cloud",
  "/infrastructure": "Infraestructura Global",
  "/security": "Seguridad",
  "/network": "Arquitectura de Red",
  "/services": "Servicios AWS",
};

export default function Header() {
  const location = useLocation();
  const title = titles[location.pathname] ?? "CloudOps Dashboard";

  return (
    <header className="h-16 bg-card border-b border-borderColor flex items-center justify-between px-6 shrink-0">
      <h2 className="text-subtitle text-textPrimary">{title}</h2>
      <div className="flex items-center gap-2 text-caption text-textSecondary">
        <span className="w-2 h-2 rounded-full bg-security"></span>
        Entorno simulado
      </div>
    </header>
  );
}