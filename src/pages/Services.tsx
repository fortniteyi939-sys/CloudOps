import { useMemo, useState } from "react";
import { Search, Server, CheckCircle2, Layers } from "lucide-react";
import StatCard from "@/components/StatCard";
import ServiceCard from "@/components/ServiceCard";
import { awsServices } from "@/data/awsServices";
import type { AWSCategory } from "@/types/cloud";

export default function Services() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<AWSCategory | "Todas">("Todas");

  const categories = useMemo(
    () => Array.from(new Set(awsServices.map((s) => s.category))) as AWSCategory[],
    []
  );

  const activeCount = awsServices.filter((s) => s.status === "active").length;

  const filteredServices = awsServices.filter((service) => {
    const matchesCategory = activeCategory === "Todas" || service.category === activeCategory;
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Resumen */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          title="Servicios en el Catálogo"
          value={awsServices.length}
          description="Servicios AWS disponibles"
          icon={Server}
        />
        <StatCard
          title="En Uso Activo"
          value={activeCount}
          description="Servicios con estado activo"
          icon={CheckCircle2}
        />
        <StatCard
          title="Categorías"
          value={categories.length}
          description="Áreas funcionales cubiertas"
          icon={Layers}
        />
      </div>

      {/* Buscador y filtro por categoría */}
      <div className="bg-card rounded-card shadow-elevated border border-cardBorder/30 p-4 space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-textSecondary" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar servicio por nombre o descripción..."
            className="w-full pl-9 pr-3 py-2 text-body rounded-md border border-borderColor focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory("Todas")}
            className={`px-3 py-1.5 rounded-full text-caption font-medium border transition-colors ${
              activeCategory === "Todas"
                ? "bg-primary text-white border-primary"
                : "border-borderColor text-textSecondary hover:border-primary/60"
            }`}
          >
            Todas
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-1.5 rounded-full text-caption font-medium border transition-colors ${
                activeCategory === category
                  ? "bg-primary text-white border-primary"
                  : "border-borderColor text-textSecondary hover:border-primary/60"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Catálogo */}
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      ) : (
        <div className="text-center text-body text-textSecondary py-10">
          No se encontraron servicios que coincidan con la búsqueda.
        </div>
      )}
    </div>
  );
}
