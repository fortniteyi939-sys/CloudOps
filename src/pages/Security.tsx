import { ShieldCheck, CheckCircle2, AlertTriangle, XCircle, Percent } from "lucide-react";
import StatCard from "@/components/StatCard";
import SecurityCard from "@/components/SecurityCard";
import { securityIndicators } from "@/data/securityIndicators";
import type { SecurityIndicator } from "@/types/cloud";

// Orden fijo de las 5 categorías del modelo de seguridad de AWS
const categories: SecurityIndicator["category"][] = [
  "Responsabilidad compartida",
  "IAM",
  "Protección de cuentas",
  "Protección de datos",
  "Cumplimiento",
];

export default function Security() {
  const successCount = securityIndicators.filter((i) => i.level === "success").length;
  const warningCount = securityIndicators.filter((i) => i.level === "warning").length;
  const dangerCount = securityIndicators.filter((i) => i.level === "danger").length;
  const score = Math.round((successCount / securityIndicators.length) * 100);

  return (
    <div className="space-y-8">
      {/* Resumen */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Nivel de Cumplimiento"
          value={`${score}%`}
          description="Indicadores en estado correcto"
          icon={Percent}
        />
        <StatCard
          title="Correcto"
          value={successCount}
          description="Controles bien configurados"
          icon={CheckCircle2}
        />
        <StatCard
          title="Requiere revisión"
          value={warningCount}
          description="Controles parcialmente aplicados"
          icon={AlertTriangle}
        />
        <StatCard
          title="Problema"
          value={dangerCount}
          description="Controles sin aplicar"
          icon={XCircle}
        />
      </div>

      {/* Indicadores agrupados por categoría */}
      {categories.map((category) => {
        const items = securityIndicators.filter((i) => i.category === category);
        if (items.length === 0) return null;

        return (
          <div key={category} className="space-y-3">
            <h2 className="text-subtitle text-textPrimary flex items-center gap-2">
              <ShieldCheck size={18} className="text-primary" />
              {category}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((indicator) => (
                <SecurityCard key={indicator.id} indicator={indicator} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
