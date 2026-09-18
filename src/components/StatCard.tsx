import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
}

export function StatCard({ title, value, description, icon: Icon }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-start gap-4">
      <div className="p-3 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-lg shrink-0">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        {/* Asegúrate de renderizar el título */}
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{title}</p>
        
        {/* Valor principal */}
        <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
        
        {/* Asegúrate de renderizar la descripción */}
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{description}</p>
      </div>
    </div>
  );
}

export default StatCard;