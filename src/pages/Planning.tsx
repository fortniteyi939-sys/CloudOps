import { useState } from "react";
import { PlusCircle, CheckCircle, Server } from "lucide-react";
import type { CloudProposal } from "@/types/cloud";
import { awsServices } from "@/data/awsServices";
import { regions } from "@/data/regions";
import { initialProposals } from "@/data/proposals";

export default function Planning() {
  const [proposals, setProposals] = useState<CloudProposal[]>(initialProposals);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Estado del formulario
  const [solutionName, setSolutionName] = useState("");
  const [applicationType, setApplicationType] = useState("Web");
  const [description, setDescription] = useState("");
  const [region, setRegion] = useState("us-east-1");
  const [estimatedUsers, setEstimatedUsers] = useState<number>(1000);
  const [availabilityLevel, setAvailabilityLevel] = useState("Alta (99.95%)");
  const [migrationGoal, setMigrationGoal] = useState("Escalabilidad");
  const [selectedServices, setSelectedServices] = useState<string[]>(["ec2", "s3"]);

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!solutionName.trim()) return;

   const newProposal: CloudProposal = {
  id: `prop-${Date.now()}`,
  solutionName,
  applicationType: applicationType as CloudProposal["applicationType"],
  description,
  region,
  estimatedUsers: Number(estimatedUsers),
  availabilityLevel: availabilityLevel as CloudProposal["availabilityLevel"],
  migrationGoal: migrationGoal as CloudProposal["migrationGoal"],
  selectedServices,
  createdAt: new Date().toISOString(),
   };

    setProposals([newProposal, ...proposals]);
    setFormSubmitted(true);

    setSolutionName("");
    setDescription("");
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Planificación de Arquitectura
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Diseña una nueva propuesta de nube seleccionando la infraestructura y servicios clave.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-blue-600" />
            Nueva Propuesta de Solución
          </h2>

          {formSubmitted && (
            <div className="p-4 bg-green-50 text-green-700 rounded-md flex items-center gap-2 text-sm">
              <CheckCircle className="w-5 h-5" />
              ¡Propuesta registrada con éxito!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Nombre de la Solución
              </label>
              <input
                type="text"
                required
                value={solutionName}
                onChange={(e) => setSolutionName(e.target.value)}
                placeholder="Ej. Sistema de Inventario Global"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Tipo de Aplicación
                </label>
                <select
                  value={applicationType}
                  onChange={(e) => setApplicationType(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="Web">Web</option>
                  <option value="Móvil">Móvil</option>
                  <option value="Microservicios">Microservicios</option>
                  <option value="Batch / ETL">Batch / ETL</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Región Desplegada
                </label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  {regions.map((r) => (
                    <option key={r.id} value={r.code}>
                      {r.name} ({r.code})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Usuarios Estimados
                </label>
                <input
                  type="number"
                  value={estimatedUsers}
                  onChange={(e) => setEstimatedUsers(Number(e.target.value))}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Disponibilidad
                </label>
                <input
                  type="text"
                  value={availabilityLevel}
                  onChange={(e) => setAvailabilityLevel(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Objetivo
                </label>
                <input
                  type="text"
                  value={migrationGoal}
                  onChange={(e) => setMigrationGoal(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Descripción del Proyecto
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Breve resumen de los objetivos de la arquitectura..."
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Servicios Requeridos
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {awsServices.map((service) => {
                  const isSelected = selectedServices.includes(service.id);
                  return (
                    <button
                      type="button"
                      key={service.id}
                      onClick={() => toggleService(service.id)}
                      className={`p-2 text-xs rounded-md border text-left transition-colors flex items-center gap-2 ${
                        isSelected
                          ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                          : "border-gray-200 bg-gray-50 text-gray-600 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                      }`}
                    >
                      <Server className="w-4 h-4 shrink-0" />
                      <span className="truncate">{service.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md text-sm transition-colors"
            >
              Guardar Propuesta
            </button>
          </form>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Propuestas Guardadas
          </h2>
          {proposals.map((prop) => (
            <div
              key={prop.id}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm space-y-2"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                  {prop.solutionName}
                </h3>
                <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded">
                  {prop.applicationType}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                {prop.description}
              </p>
              <div className="text-xs text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-700 flex justify-between">
                <span>Región: {prop.region}</span>
                <span>{prop.selectedServices.length} Servicios</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}