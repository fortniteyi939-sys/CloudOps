import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
}

export function StatCard({ title, value, description, icon: Icon }: StatCardProps) {
  return (
    <div className="bg-card p-5 rounded-card border border-cardBorder/30 shadow-elevated flex items-start gap-4">
      <div className="p-3 bg-primary/10 text-primary rounded-lg shrink-0">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        {/* Asegúrate de renderizar el título */}
        <p className="text-caption font-medium text-textSecondary">{title}</p>

        {/* Valor principal */}
        <p className="text-xl font-bold text-textPrimary mt-1">{value}</p>

        {/* Asegúrate de renderizar la descripción */}
        <p className="text-caption text-textSecondary mt-1">{description}</p>
      </div>
    </div>
  );
}

export default StatCard;
