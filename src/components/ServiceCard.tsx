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
      className={`bg-card rounded-card shadow-card border p-5 transition-colors ${
        onSelect ? "cursor-pointer hover:border-primary" : ""
      } ${selected ? "border-primary ring-1 ring-primary" : "border-borderColor"}`}
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
    </div>
  );
}