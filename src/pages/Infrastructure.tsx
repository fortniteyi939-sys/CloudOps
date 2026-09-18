import { useState } from "react";
import { Globe, CheckCircle2, MapPin, Server, Activity, Plus, Trash2, Search, X } from "lucide-react";
import StatCard from "@/components/StatCard";

interface AwsRegionData {
  id: string;
  code: string;
  name: string;
  location: string;
  x: number; // Porcentaje X en el mapa (0 - 100)
  y: number; // Porcentaje Y en el mapa (0 - 100)
  status: "Operativo" | "Mantenimiento" | "Degradado";
  services: string[];
}

const initialRegions: AwsRegionData[] = [
  {
    id: "1",
    code: "us-east-1",
    name: "US East (N. Virginia)",
    location: "Virginia, EE. UU.",
    x: 27,
    y: 38,
    status: "Operativo",
    services: ["EC2", "S3", "RDS", "Lambda", "DynamoDB", "CloudFront"],
  },
  {
    id: "2",
    code: "us-west-2",
    name: "US West (Oregon)",
    location: "Oregon, EE. UU.",
    x: 18,
    y: 32,
    status: "Operativo",
    services: ["EC2", "S3", "RDS", "Lambda", "ECS"],
  },
  {
    id: "3",
    code: "sa-east-1",
    name: "South America (São Paulo)",
    location: "São Paulo, Brasil",
    x: 35,
    y: 68,
    status: "Operativo",
    services: ["EC2", "S3", "RDS", "EBS"],
  },
  {
    id: "4",
    code: "eu-west-1",
    name: "Europe (Ireland)",
    location: "Dublín, Irlanda",
    x: 47,
    y: 28,
    status: "Operativo",
    services: ["EC2", "S3", "RDS", "Lambda", "API Gateway"],
  },
  {
    id: "5",
    code: "eu-central-1",
    name: "Europe (Frankfurt)",
    location: "Fráncfort, Alemania",
    x: 52,
    y: 30,
    status: "Operativo",
    services: ["EC2", "S3", "RDS", "EKS", "DynamoDB"],
  },
  {
    id: "6",
    code: "ap-northeast-1",
    name: "Asia Pacific (Tokyo)",
    location: "Tokio, Japón",
    x: 84,
    y: 38,
    status: "Operativo",
    services: ["EC2", "S3", "RDS", "Lambda", "EKS", "CloudFront"],
  },
  {
    id: "7",
    code: "ap-southeast-1",
    name: "Asia Pacific (Singapore)",
    location: "Singapur",
    x: 76,
    y: 56,
    status: "Operativo",
    services: ["EC2", "S3", "RDS", "ECS"],
  },
  {
    id: "8",
    code: "ap-southeast-2",
    name: "Asia Pacific (Sydney)",
    location: "Sídney, Australia",
    x: 87,
    y: 76,
    status: "Operativo",
    services: ["EC2", "S3", "RDS", "Lambda"],
  },
];

export default function Infrastructure() {
  const [regions, setRegions] = useState<AwsRegionData[]>(initialRegions);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegionId, setSelectedRegionId] = useState<string>(initialRegions[0].id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Formulario para nueva región
  const [newRegion, setNewRegion] = useState({
    code: "",
    name: "",
    location: "",
    x: 50,
    y: 50,
    status: "Operativo" as const,
    services: "EC2, S3, RDS",
  });

  // Filtrado de regiones por búsqueda
  const filteredRegions = regions.filter(
    (reg) =>
      reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Región actualmente seleccionada para detalle/mapa
  const selectedRegion = regions.find((r) => r.id === selectedRegionId) || regions[0];

  const handleAddRegion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRegion.code || !newRegion.name) return;

    const createdRegion: AwsRegionData = {
      id: Date.now().toString(),
      code: newRegion.code,
      name: newRegion.name,
      location: newRegion.location || "Ubicación Global",
      x: Number(newRegion.x),
      y: Number(newRegion.y),
      status: newRegion.status,
      services: newRegion.services.split(",").map((s) => s.trim()).filter(Boolean),
    };

    setRegions([...regions, createdRegion]);
    setSelectedRegionId(createdRegion.id);
    setIsModalOpen(false);
    setNewRegion({
      code: "",
      name: "",
      location: "",
      x: 50,
      y: 50,
      status: "Operativo",
      services: "EC2, S3, RDS",
    });
  };

  const handleDeleteRegion = (id: string) => {
    if (regions.length === 1) return;
    const updated = regions.filter((r) => r.id !== id);
    setRegions(updated);
    if (selectedRegionId === id) {
      setSelectedRegionId(updated[0].id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Infraestructura Global de AWS
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Gestión dinámica de regiones, buscador, representación en mapa y detalle de servicios.
        </p>
      </div>

      {/* Tarjetas de Resumen */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          title="Regiones Activas"
          value={regions.length}
          description="Nodos de monitoreo configurados"
          icon={Globe}
        />
        <StatCard
          title="Región En Foco"
          value={selectedRegion?.code || "N/A"}
          description={selectedRegion?.name || ""}
          icon={MapPin}
        />
        <StatCard
          title="Estado Operativo"
          value="100% Operativo"
          description="Monitoreo en tiempo real"
          icon={Activity}
        />
      </div>

      {/* Barra de Herramientas: Búsqueda y Botón Agregar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Filtrar región por nombre, código o país..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Agregar Región
        </button>
      </div>

      {/* Mapa Mundial Interactivo */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Globe className="w-5 h-5 text-blue-600" />
          Mapa de Nodos de Monitoreo
        </h2>

        <div className="relative w-full aspect-[2/1] bg-slate-900 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
          <svg className="w-full h-full text-slate-700 fill-current opacity-60" viewBox="0 0 1000 500">
            <defs>
              <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="1000" height="500" fill="url(#grid)" />
            <path d="M 100,80 Q 200,60 300,90 Q 380,130 320,220 Q 220,240 140,180 Z" />
            <path d="M 280,260 Q 370,250 390,340 Q 360,450 290,440 Q 260,350 280,260 Z" />
            <path d="M 460,80 Q 560,70 580,150 Q 500,180 450,140 Z" />
            <path d="M 450,190 Q 580,180 590,290 Q 540,390 470,360 Q 430,270 450,190 Z" />
            <path d="M 590,70 Q 850,50 920,160 Q 880,260 740,250 Q 600,200 590,70 Z" />
            <path d="M 780,320 Q 900,310 910,410 Q 820,430 780,320 Z" />
          </svg>

          {filteredRegions.map((reg) => {
            const isSelected = selectedRegion?.id === reg.id;
            return (
              <button
                key={reg.id}
                onClick={() => setSelectedRegionId(reg.id)}
                style={{ left: `${reg.x}%`, top: `${reg.y}%` }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group focus:outline-none z-10"
              >
                <span
                  className={`relative block w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                    isSelected
                      ? "bg-blue-500 border-white ring-4 ring-blue-500/40 scale-125"
                      : "bg-emerald-500 border-slate-900 group-hover:scale-125"
                  }`}
                />
                <span className="absolute left-1/2 -translate-x-1/2 top-5 px-2 py-0.5 text-[10px] font-semibold text-white bg-slate-950/90 rounded border border-slate-700 whitespace-nowrap shadow-md">
                  {reg.code}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lista Detallada de Todas las Regiones con Acción para Eliminar */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden space-y-4 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Todas las Regiones Monitoreadas ({filteredRegions.length})
        </h2>

        <div className="space-y-4">
          {filteredRegions.map((reg) => {
            const isSelected = selectedRegion?.id === reg.id;
            return (
              <div
                key={reg.id}
                onClick={() => setSelectedRegionId(reg.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? "border-blue-500 bg-blue-50/20 dark:bg-blue-950/20 shadow-sm"
                    : "border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 dark:border-gray-700/60 pb-3 gap-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <div>
                      <h3 className="text-base font-bold text-gray-900 dark:text-white">
                        {reg.name}
                      </h3>
                      <p className="text-xs text-gray-400 font-mono">{reg.code}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Estado: {reg.status}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteRegion(reg.id);
                      }}
                      disabled={regions.length === 1}
                      className="p-1.5 text-gray-400 hover:text-red-500 disabled:opacity-30 rounded-lg transition-colors"
                      title="Eliminar región"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3">
                  <div>
                    <span className="text-[11px] uppercase font-semibold text-gray-400 block mb-1">
                      Ubicación Física
                    </span>
                    <div className="flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-gray-200">
                      <Globe className="w-3.5 h-3.5 text-blue-500" />
                      {reg.location}
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] uppercase font-semibold text-gray-400 block mb-1">
                      Servicios Desplegados
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {reg.services.map((service) => (
                        <span
                          key={service}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-100 dark:border-blue-800"
                        >
                          <Server className="w-3 h-3 text-blue-500" />
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal para Agregar Nueva Región */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Agregar Región de Monitoreo
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddRegion} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Código (ej: us-central-1)
                </label>
                <input
                  type="text"
                  required
                  value={newRegion.code}
                  onChange={(e) => setNewRegion({ ...newRegion, code: e.target.value })}
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-sm text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nombre de la Región
                </label>
                <input
                  type="text"
                  required
                  value={newRegion.name}
                  onChange={(e) => setNewRegion({ ...newRegion, name: e.target.value })}
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-sm text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Ubicación Física
                </label>
                <input
                  type="text"
                  value={newRegion.location}
                  onChange={(e) => setNewRegion({ ...newRegion, location: e.target.value })}
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-sm text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Servicios (separados por coma)
                </label>
                <input
                  type="text"
                  value={newRegion.services}
                  onChange={(e) => setNewRegion({ ...newRegion, services: e.target.value })}
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-sm text-gray-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                  Guardar Región
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}