import type { Region } from "@/types/cloud";
import { MapPin } from "lucide-react";
import StatusBadge from "./StatusBadge";

interface RegionCardProps {
  region: Region;
  selected?: boolean;
  onSelect?: (region: Region) => void;
}

export default function RegionCard({ region, selected, onSelect }: RegionCardProps) {
  return (
    <div
      onClick={() => onSelect?.(region)}
      className={`bg-card rounded-card shadow-elevated border p-5 transition-colors ${
        onSelect ? "cursor-pointer hover:border-primary" : ""
      } ${selected ? "border-primary ring-1 ring-primary" : "border-cardBorder/30"}`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-primary" />
          <p className="text-caption text-textSecondary font-mono">{region.code}</p>
        </div>
        <StatusBadge status={region.status} />
      </div>
      <h3 className="text-body font-semibold text-textPrimary">{region.name}</h3>
      <p className="text-caption text-textSecondary mt-1">{region.location}</p>
      <div className="flex flex-wrap gap-1.5 mt-3">
        {region.deployedServices.map((service) => (
          <span
            key={service}
            className="px-2 py-0.5 rounded text-[11px] font-medium bg-primary/10 text-primary"
          >
            {service}
          </span>
        ))}
      </div>
    </div>
  );
}
