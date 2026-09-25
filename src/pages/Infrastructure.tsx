import { useState } from "react";
import { Globe, CheckCircle2, MapPin, Server, Activity, Plus, Trash2, Search, X } from "lucide-react";
import { ComposableMap, Geographies, Geography, Marker, Line } from "react-simple-maps";
import StatCard from "@/components/StatCard";

// Topojson público (Natural Earth, dominio público) con las fronteras de
// todos los países, servido vía CDN por el paquete "world-atlas".
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface AwsRegionData {
  id: string;
  code: string;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  status: "Operativo" | "Mantenimiento" | "Degradado";
  services: string[];
}

const initialRegions: AwsRegionData[] = [
  {
    id: "1",
    code: "us-east-1",
    name: "US East (N. Virginia)",
    location: "Virginia, EE. UU.",
    latitude: 38.13,
    longitude: -78.45,
    status: "Operativo",
    services: ["EC2", "S3", "RDS", "Lambda", "DynamoDB", "CloudFront"],
  },
  {
    id: "2",
    code: "us-west-2",
    name: "US West (Oregon)",
    location: "Oregon, EE. UU.",
    latitude: 45.84,
    longitude: -119.7,
    status: "Operativo",
    services: ["EC2", "S3", "RDS", "Lambda", "ECS"],
  },
  {
    id: "3",
    code: "sa-east-1",
    name: "South America (São Paulo)",
    location: "São Paulo, Brasil",
    latitude: -23.55,
    longitude: -46.63,
    status: "Operativo",
    services: ["EC2", "S3", "RDS", "EBS"],
  },
  {
    id: "4",
    code: "eu-west-1",
    name: "Europe (Ireland)",
    location: "Dublín, Irlanda",
    latitude: 53.41,
    longitude: -8.24,
    status: "Operativo",
    services: ["EC2", "S3", "RDS", "Lambda", "API Gateway"],
  },
  {
    id: "5",
    code: "eu-central-1",
    name: "Europe (Frankfurt)",
    location: "Fráncfort, Alemania",
    latitude: 50.11,
    longitude: 8.68,
    status: "Operativo",
    services: ["EC2", "S3", "RDS", "EKS", "DynamoDB"],
  },
  {
    id: "6",
    code: "ap-northeast-1",
    name: "Asia Pacific (Tokyo)",
    location: "Tokio, Japón",
    latitude: 35.68,
    longitude: 139.69,
    status: "Operativo",
    services: ["EC2", "S3", "RDS", "Lambda", "EKS", "CloudFront"],
  },
  {
    id: "7",
    code: "ap-southeast-1",
    name: "Asia Pacific (Singapore)",
    location: "Singapur",
    latitude: 1.35,
    longitude: 103.82,
    status: "Operativo",
    services: ["EC2", "S3", "RDS", "ECS"],
  },
  {
    id: "8",
    code: "ap-southeast-2",
    name: "Asia Pacific (Sydney)",
    location: "Sídney, Australia",
    latitude: -33.87,
    longitude: 151.21,
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
    latitude: 0,
    longitude: 0,
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
      latitude: Number(newRegion.latitude),
      longitude: Number(newRegion.longitude),
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
      latitude: 0,
      longitude: 0,
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
    <div className="flex flex-col gap-6 lg:h-full lg:min-h-0">
      {/* Tarjetas de Resumen */}
      <div className="shrink-0 grid grid-cols-1 gap-4 sm:grid-cols-3">
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

      {/* Mapa (izquierda) + Buscador/Lista de regiones (derecha). En desktop
          (lg) esta fila queda acotada a la altura restante de la página
          (lg:flex-1 lg:min-h-0) para que la página NUNCA scrollee: el mapa
          crece/decrece con esa altura (aspect-auto + flex-1) y la card de
          regiones, al tener una altura fija, hace su propio scroll interno
          (overflow-y-auto en la lista) en vez de empujar el resto del layout
          hacia abajo. En mobile las columnas se apilan y cada una toma su
          alto natural. */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:flex-1 lg:min-h-0 lg:items-stretch">
        {/* Mapa Mundial Interactivo: aspect-ratio fija en mobile (compacto),
            pero en desktop se estira (flex-1) para igualar la altura de la
            card de regiones de al lado. */}
        <div className="lg:col-span-2 bg-card p-6 rounded-card border border-cardBorder/30 shadow-elevated flex flex-col gap-4 lg:h-full lg:min-h-0">
          <h2 className="shrink-0 text-lg font-semibold text-textPrimary flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            Mapa de Nodos de Monitoreo
          </h2>

          <div className="relative w-full aspect-[2/1] lg:aspect-auto lg:flex-1 lg:min-h-0 rounded-card overflow-hidden border border-slate-800 bg-[radial-gradient(ellipse_at_30%_35%,#1D4ED8_0%,#0F172A_55%,#020617_100%)]">
            <ComposableMap
              projectionConfig={{ scale: 148, center: [10, 12] }}
              style={{ width: "100%", height: "100%" }}
            >
              {/* Países reales (fronteras de Natural Earth) con relleno azul y
                  ligero resplandor, para imitar el estilo del mapa de referencia */}
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#3B82F6"
                      fillOpacity={0.55}
                      stroke="#93C5FD"
                      strokeOpacity={0.5}
                      strokeWidth={0.4}
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none", fillOpacity: 0.75 },
                        pressed: { outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>

              {/* Líneas de conexión entre regiones filtradas */}
              {filteredRegions.slice(1).map((reg, i) => (
                <Line
                  key={reg.id}
                  from={[filteredRegions[i].longitude, filteredRegions[i].latitude]}
                  to={[reg.longitude, reg.latitude]}
                  stroke="#3B82F6"
                  strokeWidth={1.2}
                  strokeOpacity={0.5}
                  strokeDasharray="4 4"
                />
              ))}

              {/* Pines de las regiones */}
              {filteredRegions.map((reg) => {
                const isSelected = selectedRegion?.id === reg.id;
                return (
                  <Marker
                    key={reg.id}
                    coordinates={[reg.longitude, reg.latitude]}
                    onClick={() => setSelectedRegionId(reg.id)}
                    style={{ default: { cursor: "pointer" } }}
                  >
                    <circle
                      r={isSelected ? 7 : 5.5}
                      fill={isSelected ? "#2563EB" : "#16A34A"}
                      stroke={isSelected ? "#FFFFFF" : "#0F172A"}
                      strokeWidth={2}
                    />
                    <text
                      textAnchor="middle"
                      y={-12}
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        fill: "#FFFFFF",
                        paintOrder: "stroke",
                        stroke: "#020617",
                        strokeWidth: 3,
                      }}
                    >
                      {reg.code}
                    </text>
                  </Marker>
                );
              })}
            </ComposableMap>
          </div>
        </div>

        {/* Columna derecha: una sola card (búsqueda + botón fijos arriba, lista con
            scroll interno abajo), estirada (items-stretch) a la misma altura que
            la tarjeta del mapa. Así nunca hay que desplazar la página completa. */}
        <div className="lg:col-span-1 bg-card rounded-card border border-cardBorder/30 shadow-elevated overflow-hidden flex flex-col lg:h-full lg:min-h-0">
          {/* Encabezado fijo: título + búsqueda + botón agregar */}
          <div className="shrink-0 flex flex-col gap-3 p-4 border-b border-borderColor">
            <h2 className="text-lg font-semibold text-textPrimary">
              Todas las Regiones Monitoreadas
            </h2>

            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-textSecondary" />
              <input
                type="text"
                placeholder="Filtrar región por nombre, código o país..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-background border border-borderColor rounded-lg text-sm text-textPrimary focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              Agregar Región
            </button>
          </div>

          {/* Lista Detallada de Todas las Regiones con Acción para Eliminar.
              Ocupa el espacio restante de la card (flex-1 + min-h-0) y hace scroll
              interno en vez de estirar la página más abajo del mapa. */}
          <div className="flex-1 min-h-0 overflow-y-auto p-4">
            <div className="space-y-4">
              {filteredRegions.map((reg) => {
            const isSelected = selectedRegion?.id === reg.id;
            return (
              <div
                key={reg.id}
                onClick={() => setSelectedRegionId(reg.id)}
                className={`p-4 rounded-card border transition-all cursor-pointer ${
                  isSelected
                    ? "border-primary bg-primary/10 shadow-elevated"
                    : "border-borderColor bg-card hover:border-borderColor"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-borderColor pb-3 gap-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div>
                      <h3 className="text-base font-bold text-textPrimary">
                        {reg.name}
                      </h3>
                      <p className="text-xs text-textSecondary font-mono">{reg.code}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-security/10 text-security border border-security/20">
                      <CheckCircle2 className="w-3.5 h-3.5 text-security" />
                      Estado: {reg.status}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteRegion(reg.id);
                      }}
                      disabled={regions.length === 1}
                      className="p-1.5 text-textSecondary hover:text-alert disabled:opacity-30 rounded-lg transition-colors"
                      title="Eliminar región"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3">
                  <div>
                    <span className="text-[11px] uppercase font-semibold text-textSecondary block mb-1">
                      Ubicación Física
                    </span>
                    <div className="flex items-center gap-2 text-xs font-medium text-textPrimary">
                      <Globe className="w-3.5 h-3.5 text-primary" />
                      {reg.location}
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] uppercase font-semibold text-textSecondary block mb-1">
                      Servicios Desplegados
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {reg.services.map((service) => (
                        <span
                          key={service}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-primary/10 text-primary border border-primary/20"
                        >
                          <Server className="w-3 h-3 text-primary" />
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
        </div>
      </div>

      {/* Modal para Agregar Nueva Región */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-card rounded-card max-w-md w-full p-6 space-y-4 shadow-xl border border-cardBorder/30">
            <div className="flex items-center justify-between border-b border-borderColor pb-3">
              <h3 className="text-lg font-semibold text-textPrimary">
                Agregar Región de Monitoreo
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-textSecondary hover:text-textSecondary">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddRegion} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-textPrimary mb-1">
                  Código (ej: us-central-1)
                </label>
                <input
                  type="text"
                  required
                  value={newRegion.code}
                  onChange={(e) => setNewRegion({ ...newRegion, code: e.target.value })}
                  className="w-full bg-background border border-borderColor rounded-lg p-2 text-sm text-textPrimary"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-textPrimary mb-1">
                  Nombre de la Región
                </label>
                <input
                  type="text"
                  required
                  value={newRegion.name}
                  onChange={(e) => setNewRegion({ ...newRegion, name: e.target.value })}
                  className="w-full bg-background border border-borderColor rounded-lg p-2 text-sm text-textPrimary"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-textPrimary mb-1">
                  Ubicación Física
                </label>
                <input
                  type="text"
                  value={newRegion.location}
                  onChange={(e) => setNewRegion({ ...newRegion, location: e.target.value })}
                  className="w-full bg-background border border-borderColor rounded-lg p-2 text-sm text-textPrimary"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-textPrimary mb-1">
                  Servicios (separados por coma)
                </label>
                <input
                  type="text"
                  value={newRegion.services}
                  onChange={(e) => setNewRegion({ ...newRegion, services: e.target.value })}
                  className="w-full bg-background border border-borderColor rounded-lg p-2 text-sm text-textPrimary"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-borderColor">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-textSecondary bg-background hover:bg-borderColor rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-medium text-white bg-primary hover:bg-primary-dark rounded-lg"
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