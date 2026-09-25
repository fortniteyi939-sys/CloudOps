import {
  Server,
  Globe,
  DollarSign,
  Calendar,
  ShieldCheck,
  Layers,
  Activity,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  TrendingUp,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  CartesianGrid,
} from "recharts";

// Datos para la Tendencia de Costos
const costTrendData = [
  { month: "Ene", cost: 120 },
  { month: "Feb", cost: 138 },
  { month: "Mar", cost: 135 },
  { month: "Abr", cost: 160 },
  { month: "May", cost: 178 },
  { month: "Jun", cost: 193.16 },
];

// Datos para el Gráfico de Barras de Uso de Servicios
const serviceUsageData = [
  { service: "EC2", usage: 42, count: "3 instancias", color: "#2563EB" },
  { service: "S3", usage: 25, count: "1.2 TB", color: "#16A34A" },
  { service: "RDS", usage: 18, count: "1 DB Multi-AZ", color: "#F59E0B" },
  { service: "Lambda", usage: 10, count: "12 funciones", color: "#64748B" },
  { service: "DynamoDB", usage: 5, count: "2 tablas", color: "#DC2626" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Fila 1 de Tarjetas Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Servicios en Uso */}
        <div className="bg-card p-5 rounded-card border border-cardBorder/30 shadow-elevated flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-lg text-primary">
            <Server className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-medium text-textSecondary block">
              Servicios en Uso
            </span>
            <span className="text-2xl font-bold text-textPrimary">5</span>
            <span className="text-xs text-textSecondary block mt-0.5">Seleccionados en la propuesta</span>
          </div>
        </div>

        {/* Región Principal */}
        <div className="bg-card p-5 rounded-card border border-cardBorder/30 shadow-elevated flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-lg text-primary">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-medium text-textSecondary block">
              Región Principal
            </span>
            <span className="text-lg font-bold text-textPrimary">Norte de Virginia</span>
            <span className="text-xs text-textSecondary block mt-0.5">us-east-1</span>
          </div>
        </div>

        {/* Costo Mensual Estimado */}
        <div className="bg-card p-5 rounded-card border border-cardBorder/30 shadow-elevated flex items-center gap-4">
          <div className="p-3 bg-cost/10 rounded-lg text-cost">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-medium text-textSecondary block">
              Costo Mensual Estimado
            </span>
            <span className="text-2xl font-bold text-textPrimary">$193.16</span>
            <span className="text-xs text-textSecondary block mt-0.5">Calculado sobre 730h/mes</span>
          </div>
        </div>

        {/* Costo Anual Estimado */}
        <div className="bg-card p-5 rounded-card border border-cardBorder/30 shadow-elevated flex items-center gap-4">
          <div className="p-3 bg-cost/10 rounded-lg text-cost">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-medium text-textSecondary block">
              Costo Anual Estimado
            </span>
            <span className="text-2xl font-bold text-textPrimary">$2,317.90</span>
            <span className="text-xs text-textSecondary block mt-0.5">Proyección a 12 meses</span>
          </div>
        </div>
      </div>

      {/* Fila 2 de Tarjetas Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Estado de Seguridad */}
        <div className="bg-card p-5 rounded-card border border-cardBorder/30 shadow-elevated flex items-center gap-4">
          <div className="p-3 bg-security/10 rounded-lg text-security">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-medium text-textSecondary block">
              Estado de Seguridad
            </span>
            <span className="text-2xl font-bold text-textPrimary">57%</span>
            <span className="text-xs text-textSecondary block mt-0.5">Nivel de cumplimiento general</span>
          </div>
        </div>

        {/* Recursos Cloud */}
        <div className="bg-card p-5 rounded-card border border-cardBorder/30 shadow-elevated flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-lg text-primary">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-medium text-textSecondary block">
              Recursos Cloud
            </span>
            <span className="text-2xl font-bold text-textPrimary">7</span>
            <span className="text-xs text-textSecondary block mt-0.5">Componentes en el catálogo</span>
          </div>
        </div>

        {/* Estado de la Arquitectura */}
        <div className="bg-card p-5 rounded-card border border-cardBorder/30 shadow-elevated flex items-center gap-4">
          <div className="p-3 bg-security/10 rounded-lg text-security">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-medium text-textSecondary block">
              Estado de la Arquitectura
            </span>
            <span className="text-xl font-bold text-security">Operativo</span>
            <span className="text-xs text-textSecondary block mt-0.5">Evaluación de disponibilidad</span>
          </div>
        </div>
      </div>

      {/* Gráficos Principales: Tendencia de Costos + Estado de Seguridad */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tendencia de Costos (Ocupa 2 columnas) */}
        <div className="lg:col-span-2 bg-card p-6 rounded-card border border-cardBorder/30 shadow-elevated space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-textPrimary flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Tendencia de Costos (USD)
              </h2>
              <p className="text-xs text-textSecondary">
                Evolución del gasto mensual proyectado de la infraestructura.
              </p>
            </div>
            <span className="px-2.5 py-1 text-xs font-semibold text-security bg-security/10 rounded-full border border-security/20">
              +9.2% este mes
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={costTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="costGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1E293B15" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} className="text-xs" />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  unit="$"
                  className="text-xs"
                  domain={[0, 200]}
                />
                <Tooltip
                 formatter={(value) => [`$${value}`, "Costo Proyectado"]}
                 contentStyle={{
                 backgroundColor: "#FFFFFF",
                borderRadius: "8px",
                 border: "1px solid #E2E8F0",
                 color: "#1E293B",
                 fontSize: "12px",
                 boxShadow: "0 4px 6px -1px rgba(15, 23, 42, 0.1)",
                 }}
                 itemStyle={{ color: "#1E293B" }}
                labelStyle={{ color: "#1E293B", fontWeight: "bold" }}
/>
                <Area
                  type="monotone"
                  dataKey="cost"
                  stroke="#2563EB"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#costGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Desglose de Estado de Seguridad */}
        <div className="bg-card p-6 rounded-card border border-cardBorder/30 shadow-elevated space-y-4">
          <div>
            <h2 className="text-base font-bold text-textPrimary flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-security" />
              Estado de Seguridad
            </h2>
            <p className="text-xs text-textSecondary">
              Desglose de controles según su nivel de cumplimiento.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between p-3 bg-security/10 border border-security/20 rounded-lg">
              <span className="flex items-center gap-2 text-sm font-medium text-security">
                <CheckCircle2 className="w-4 h-4 text-security" />
                Correcto
              </span>
              <span className="text-sm font-bold text-security">4</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-cost/10 border border-cost/20 rounded-lg">
              <span className="flex items-center gap-2 text-sm font-medium text-cost">
                <AlertTriangle className="w-4 h-4 text-cost" />
                Requiere revisión
              </span>
              <span className="text-sm font-bold text-cost">2</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-alert/10 border border-alert/20 rounded-lg">
              <span className="flex items-center gap-2 text-sm font-medium text-alert">
                <XCircle className="w-4 h-4 text-alert" />
                Problema
              </span>
              <span className="text-sm font-bold text-alert">1</span>
            </div>
          </div>
        </div>
      </div>

      {/* NUEVO: Gráfico de Barras de Uso de Servicios */}
      <div className="bg-card p-6 rounded-card border border-cardBorder/30 shadow-elevated space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-textPrimary flex items-center gap-2">
              <Server className="w-5 h-5 text-primary" />
              Uso y Consumo por Servicio AWS
            </h2>
            <p className="text-xs text-textSecondary">
              Distribución porcentual del uso de cómputo, almacenamiento y base de datos.
            </p>
          </div>
          <span className="text-xs text-textSecondary">Total: 100% de la carga de trabajo</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
          {/* Gráfico de Barras */}
          <div className="lg:col-span-2 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={serviceUsageData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1E293B15" />
                <XAxis dataKey="service" tickLine={false} axisLine={false} className="text-xs" />
                <YAxis tickLine={false} axisLine={false} unit="%" className="text-xs" domain={[0, 50]} />
                <Tooltip
  formatter={(value) => [`${value}%`, "Uso estimado"]}
  contentStyle={{
    backgroundColor: "#FFFFFF",
    borderRadius: "8px",
    border: "1px solid #E2E8F0",
    color: "#1E293B",
    fontSize: "12px",
    boxShadow: "0 4px 6px -1px rgba(15, 23, 42, 0.1)",
  }}
  itemStyle={{ color: "#1E293B" }}
  labelStyle={{ color: "#1E293B", fontWeight: "bold" }}
/>
                <Bar dataKey="usage" radius={[6, 6, 0, 0]}>
                  {serviceUsageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Leyenda y Detalles */}
          <div className="space-y-3 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-borderColor pt-4 lg:pt-0 lg:pl-6">
            {serviceUsageData.map((item) => (
              <div key={item.service} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-semibold text-textPrimary">
                    {item.service}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-textPrimary block">
                    {item.usage}%
                  </span>
                  <span className="text-[10px] text-textSecondary">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}