import * as Icons from "lucide-react";
import type { AWSService } from "@/types/cloud";
import StatusBadge from "./StatusBadge";

interface ServiceCardProps {
  service: AWSService;
  onSelect?: (service: AWSService) => void;
  selected?: boolean;
}

export default function ServiceCard({ service, onSelect, selected }: ServiceCardProps) {
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[service.icon] ?? Icons.Box;

  return (
    <div
      onClick={() => onSelect?.(service)}
      className={`bg-card rounded-card shadow-elevated border p-5 transition-colors ${
        onSelect ? "cursor-pointer hover:border-primary" : ""
      } ${selected ? "border-primary ring-1 ring-primary" : "border-cardBorder/30"}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
          <Icon size={18} />
        </div>
        <StatusBadge status={service.status} />
      </div>
      <h3 className="text-body font-semibold text-textPrimary">{service.name}</h3>
      <p className="text-caption text-textSecondary mt-1">{service.category}</p>
      <p className="text-body text-textSecondary mt-3">{service.description}</p>
      <div className="mt-3 pt-3 border-t border-borderColor">
        <p className="text-caption font-semibold text-textPrimary">Función principal</p>
        <p className="text-caption text-textSecondary mt-0.5">{service.mainFunction}</p>
      </div>
    </div>
  );
}