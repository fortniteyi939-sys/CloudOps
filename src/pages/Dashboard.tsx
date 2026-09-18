import { 
  Server, 
  Globe, 
  DollarSign, 
  ShieldCheck, 
  Layers, 
  Activity 
} from "lucide-react";
import  StatCard  from "@/components/StatCard";
import { dashboardSummary } from "@/data/dashboardSummary";

export default function Dashboard() {
  const {
    servicesInUse,
    selectedRegion,
    monthlyCost,
    annualCost,
    securityScore,
    cloudResources,
    architectureStatus,
  } = dashboardSummary;

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Panel de Control - Resumen Cloud
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Vista general del estado de la arquitectura, costos estimados y métricas clave.
        </p>
      </div>

      {/* Grid de Métricas Principales */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Servicios en Uso"
          value={servicesInUse}
          description="Seleccionados en la propuesta activa"
          icon={Server}
        />
        <StatCard
          title="Región Principal"
          value={selectedRegion}
          description="Ubicación primaria de despliegue"
          icon={Globe}
        />
        <StatCard
          title="Costo Mensual Estimado"
          value={`$${monthlyCost.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
          description={`Anualizado: ~$${annualCost.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
          icon={DollarSign}
        />
        <StatCard
          title="Puntaje de Seguridad"
          value={`${securityScore}%`}
          description="Cumplimiento de mejores prácticas"
          icon={ShieldCheck}
        />
      </div>

      {/* Grid Secundario */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatCard
          title="Recursos Activos"
          value={cloudResources}
          description="Servidores y servicios operativos en el catálogo"
          icon={Layers}
        />
        <StatCard
          title="Estado de la Arquitectura"
          value={architectureStatus === "active" ? "Operativo" : "En Revisión"}
          description="Evaluación general de disponibilidad"
          icon={Activity}
        />
      </div>
    </div>
  );
}
