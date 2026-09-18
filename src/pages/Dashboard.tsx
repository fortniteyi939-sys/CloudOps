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
  { service: "EC2", usage: 42, count: "3 instancias", color: "#2563eb" },
  { service: "S3", usage: 25, count: "1.2 TB", color: "#10b981" },
  { service: "RDS", usage: 18, count: "1 DB Multi-AZ", color: "#f59e0b" },
  { service: "Lambda", usage: 10, count: "12 funciones", color: "#8b5cf6" },
  { service: "DynamoDB", usage: 5, count: "2 tablas", color: "#ec4899" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Panel de Control - Resumen Cloud
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Vista general del estado de la arquitectura, costos estimados, métricas clave y consumo por servicio.
        </p>
      </div>

      {/* Fila 1 de Tarjetas Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Servicios en Uso */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
            <Server className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 block">
              Servicios en Uso
            </span>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">5</span>
            <span className="text-xs text-gray-400 block mt-0.5">Seleccionados en la propuesta</span>
          </div>
        </div>

        {/* Región Principal */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 block">
              Región Principal
            </span>
            <span className="text-lg font-bold text-gray-900 dark:text-white">Norte de Virginia</span>
            <span className="text-xs text-gray-400 block mt-0.5">us-east-1</span>
          </div>
        </div>

        {/* Costo Mensual Estimado */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 block">
              Costo Mensual Estimado
            </span>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">$193.16</span>
            <span className="text-xs text-gray-400 block mt-0.5">Calculado sobre 730h/mes</span>
          </div>
        </div>

        {/* Costo Anual Estimado */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 block">
              Costo Anual Estimado
            </span>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">$2,317.90</span>
            <span className="text-xs text-gray-400 block mt-0.5">Proyección a 12 meses</span>
          </div>
        </div>
      </div>

      {/* Fila 2 de Tarjetas Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Estado de Seguridad */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-teal-50 dark:bg-teal-900/30 rounded-lg text-teal-600 dark:text-teal-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 block">
              Estado de Seguridad
            </span>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">57%</span>
            <span className="text-xs text-gray-400 block mt-0.5">Nivel de cumplimiento general</span>
          </div>
        </div>

        {/* Recursos Cloud */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-400">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 block">
              Recursos Cloud
            </span>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">7</span>
            <span className="text-xs text-gray-400 block mt-0.5">Componentes en el catálogo</span>
          </div>
        </div>

        {/* Estado de la Arquitectura */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-sky-50 dark:bg-sky-900/30 rounded-lg text-sky-600 dark:text-sky-400">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 block">
              Estado de la Arquitectura
            </span>
            <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">Operativo</span>
            <span className="text-xs text-gray-400 block mt-0.5">Evaluación de disponibilidad</span>
          </div>
        </div>
      </div>

      {/* Gráficos Principales: Tendencia de Costos + Estado de Seguridad */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tendencia de Costos (Ocupa 2 columnas) */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Tendencia de Costos (USD)
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Evolución del gasto mensual proyectado de la infraestructura.
              </p>
            </div>
            <span className="px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full border border-emerald-200 dark:border-emerald-800">
              +9.2% este mes
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={costTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="costGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#33415515" />
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
                 backgroundColor: "#ffffff",
                borderRadius: "8px",
                 border: "1px solid #000000",
                 color: "#000000",
                 fontSize: "12px",
                 boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                 }}
                 itemStyle={{ color: "#000000" }}
                labelStyle={{ color: "#000000", fontWeight: "bold" }}
/>
                <Area
                  type="monotone"
                  dataKey="cost"
                  stroke="#2563eb"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#costGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Desglose de Estado de Seguridad */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
          <div>
            <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              Estado de Seguridad
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Desglose de controles según su nivel de cumplimiento.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between p-3 bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-800/40 rounded-lg">
              <span className="flex items-center gap-2 text-sm font-medium text-emerald-800 dark:text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Correcto
              </span>
              <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400">4</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-800/40 rounded-lg">
              <span className="flex items-center gap-2 text-sm font-medium text-amber-800 dark:text-amber-300">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Requiere revisión
              </span>
              <span className="text-sm font-bold text-amber-700 dark:text-amber-400">2</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-rose-50/60 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-800/40 rounded-lg">
              <span className="flex items-center gap-2 text-sm font-medium text-rose-800 dark:text-rose-300">
                <XCircle className="w-4 h-4 text-rose-600" />
                Problema
              </span>
              <span className="text-sm font-bold text-rose-700 dark:text-rose-400">1</span>
            </div>
          </div>
        </div>
      </div>

      {/* NUEVO: Gráfico de Barras de Uso de Servicios */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Server className="w-5 h-5 text-blue-600" />
              Uso y Consumo por Servicio AWS
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Distribución porcentual del uso de cómputo, almacenamiento y base de datos.
            </p>
          </div>
          <span className="text-xs text-gray-400">Total: 100% de la carga de trabajo</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
          {/* Gráfico de Barras */}
          <div className="lg:col-span-2 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={serviceUsageData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#33415515" />
                <XAxis dataKey="service" tickLine={false} axisLine={false} className="text-xs" />
                <YAxis tickLine={false} axisLine={false} unit="%" className="text-xs" domain={[0, 50]} />
                <Tooltip
  formatter={(value) => [`${value}%`, "Uso estimado"]}
  contentStyle={{
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    border: "1px solid #000000",
    color: "#000000",
    fontSize: "12px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  }}
  itemStyle={{ color: "#000000" }}
  labelStyle={{ color: "#000000", fontWeight: "bold" }}
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
          <div className="space-y-3 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-gray-100 dark:border-gray-700 pt-4 lg:pt-0 lg:pl-6">
            {serviceUsageData.map((item) => (
              <div key={item.service} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {item.service}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-gray-900 dark:text-white block">
                    {item.usage}%
                  </span>
                  <span className="text-[10px] text-gray-400">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}