import type { SecurityIndicator } from "@/types/cloud";
import StatusBadge from "./StatusBadge";

interface SecurityCardProps {
  indicator: SecurityIndicator;
}

export default function SecurityCard({ indicator }: SecurityCardProps) {
  return (
    <div className="bg-card rounded-card shadow-elevated border border-cardBorder/30 p-5">
      <div className="flex items-start justify-between mb-2">
        <p className="text-caption text-textSecondary">{indicator.category}</p>
        <StatusBadge status={indicator.level} />
      </div>
      <h3 className="text-body font-semibold text-textPrimary">{indicator.label}</h3>
      <p className="text-caption text-textSecondary mt-2">{indicator.description}</p>
    </div>
  );
}