import { 
  Server, 
  Globe, 
  DollarSign, 
  Calendar,
  ShieldCheck, 
  Layers, 
  Activity,
  TrendingUp
} from "lucide-react";
import StatCard from "@/components/StatCard";
import { dashboardSummary } from "@/data/dashboardSummary";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Datos de la tendencia de costos mensuales
const costTrends = [
  { month: "Ene", gasto: 120.5 },
  { month: "Feb", gasto: 138.2 },
  { month: "Mar", gasto: 135.0 },
  { month: "Abr", gasto: 158.4 },
  { month: "May", gasto: 175.1 },
  { month: "Jun", gasto: dashboardSummary.monthlyCost },
];

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

      {/* Grid de las 7 Tarjetas Obligatorias */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* 1. Servicios utilizados */}
        <StatCard
          title="Servicios en Uso"
          value={servicesInUse}
          description="Seleccionados en la propuesta activa"
          icon={Server}
        />

        {/* 2. Región seleccionada */}
        <StatCard
          title="Región Principal"
          value={selectedRegion}
          description="Ubicación primaria de despliegue"
          icon={Globe}
        />

        {/* 3. Costo mensual estimado */}
        <StatCard
          title="Costo Mensual Estimado"
          value={`$${monthlyCost.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
          description="Calculado sobre 730h/mes"
          icon={DollarSign}
        />

        {/* 4. Costo anual estimado */}
        <StatCard
          title="Costo Anual Estimado"
          value={`$${annualCost.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
          description="Proyección a 12 meses"
          icon={Calendar}
        />

        {/* 5. Estado de seguridad */}
        <StatCard
          title="Puntaje de Seguridad"
          value={`${securityScore}%`}
          description="Cumplimiento de mejores prácticas"
          icon={ShieldCheck}
        />

        {/* 6. Recursos Cloud */}
        <StatCard
          title="Recursos Activos"
          value={cloudResources}
          description="Servidores y servicios en el catálogo"
          icon={Layers}
        />

        {/* 7. Estado de la arquitectura */}
        <StatCard
          title="Estado de la Arquitectura"
          value={architectureStatus === "active" ? "Operativo" : "En Revisión"}
          description="Evaluación general de disponibilidad"
          icon={Activity}
        />
      </div>

      {/* Sección del Gráfico de Tendencia de Costos */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Tendencia de Costos (USD)
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Evolución del gasto mensual proyectado de la infraestructura.
            </p>
          </div>
          <span className="text-xs font-medium px-2.5 py-1 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full">
            +9.2% este mes
          </span>
        </div>

        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={costTrends}>
              <defs>
                <linearGradient id="colorGasto" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="month" stroke="#888888" fontSize={12} />
              <YAxis stroke="#888888" fontSize={12} unit="$" />
              <Tooltip
                formatter={(value: number) => [`$${value.toFixed(2)} USD`, "Gasto Mensual"]}
              />
              <Area
                type="monotone"
                dataKey="gasto"
                stroke="#2563eb"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorGasto)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}