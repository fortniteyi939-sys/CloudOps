import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  DollarSign,
  Globe,
  ShieldCheck,
  Network,
  Server,
  Cloud,
} from "lucide-react";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/planning", label: "Planificación Cloud", icon: ClipboardList },
  { path: "/costs", label: "Costos", icon: DollarSign },
  { path: "/infrastructure", label: "Infraestructura Global", icon: Globe },
  { path: "/security", label: "Seguridad", icon: ShieldCheck },
  { path: "/network", label: "Arquitectura de Red", icon: Network },
  { path: "/services", label: "Servicios AWS", icon: Server },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-sidebar text-white flex flex-col shrink-0">
      <div className="flex items-center gap-2 px-5 py-5 border-b border-white/10">
        <Cloud className="text-primary-light" size={22} />
        <span className="text-subtitle text-white">CloudOps</span>
      </div>

      <nav className="flex-1 flex flex-col gap-1 p-3">
        {navItems.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-md text-body transition-colors ${
                isActive
                  ? "bg-primary text-white"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-5 py-4 border-t border-white/10 text-caption text-slate-400">
        Cloud Foundations · Semanas 5–6
      </div>
    </aside>
  );
}