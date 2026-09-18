import type { CostEstimateResult } from "@/types/cloud";
import { DollarSign } from "lucide-react";

interface CostCardProps {
  estimate: CostEstimateResult;
  serviceName: string;
}

export default function CostCard({ estimate, serviceName }: CostCardProps) {
  return (
    <div className="bg-card rounded-card shadow-card border border-borderColor p-5">
      <div className="flex items-center gap-2 mb-3">
        <DollarSign size={16} className="text-cost" />
        <h3 className="text-body font-semibold text-textPrimary">{serviceName}</h3>
      </div>
      <div className="grid grid-cols-3 gap-3 text-center">
        <div>
          <p className="text-caption text-textSecondary">Estimado</p>
          <p className="text-body font-semibold text-textPrimary">${estimate.estimatedCost.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-caption text-textSecondary">Mensual</p>
          <p className="text-body font-semibold text-cost">${estimate.monthlyCost.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-caption text-textSecondary">Anual</p>
          <p className="text-body font-semibold text-textPrimary">${estimate.annualCost.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
