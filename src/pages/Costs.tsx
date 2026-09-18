import { useState } from "react";
import { DollarSign, TrendingUp, Calculator, Plus, Trash2, BarChart3, PieChart as PieIcon } from "lucide-react";
import StatCard from "@/components/StatCard";
import { awsServices } from "@/data/awsServices";
import { costRates } from "@/data/costRates";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface CostCalculatorItem {
  id: string;
  serviceId: string;
  quantity: number;
  hours: number;
}

const COLORS = ["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd", "#a855f7", "#ec4899"];

export default function Costs() {
  const [items, setItems] = useState<CostCalculatorItem[]>([
    { id: "1", serviceId: "ec2", quantity: 2, hours: 730 },
    { id: "2", serviceId: "rds", quantity: 1, hours: 730 },
    { id: "3", serviceId: "s3", quantity: 5, hours: 730 },
  ]);

  const handleAddItem = () => {
    const defaultService = awsServices[0]?.id || "ec2";
    setItems([
      ...items,
      { id: Date.now().toString(), serviceId: defaultService, quantity: 1, hours: 730 },
    ]);
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleUpdateItem = (id: string, field: keyof CostCalculatorItem, value: any) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  const calculatedItems = items.map((item) => {
    const service = awsServices.find((s) => s.id === item.serviceId);
    const hourlyRate = costRates[item.serviceId] ?? 0.05;
    const estimatedUnitCost = hourlyRate * item.hours;
    const monthlyCost = estimatedUnitCost * item.quantity;
    const annualCost = monthlyCost * 12;

    return {
      ...item,
      serviceName: service?.name ?? item.serviceId,
      hourlyRate,
      estimatedUnitCost,
      monthlyCost,
      annualCost,
    };
  });

  const totalMonthly = calculatedItems.reduce((acc, curr) => acc + curr.monthlyCost, 0);
  const totalAnnual = totalMonthly * 12;

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Gestión de Costos y Estimación Simulada
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Simulador de tarifas e infraestructura AWS con cálculo en tiempo real.
        </p>
      </div>

      {/* Tarjetas de Resumen Global */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          title="Costo Mensual Estimado"
          value={`$${totalMonthly.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          description="Suma total simulada"
          icon={DollarSign}
        />
        <StatCard
          title="Costo Anual Estimado"
          value={`$${totalAnnual.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          description="Proyección a 12 meses"
          icon={TrendingUp}
        />
        <StatCard
          title="Recursos Simulados"
          value={items.reduce((acc, i) => acc + Number(i.quantity || 0), 0)}
          description="Instancias y servicios activos"
          icon={BarChart3}
        />
      </div>

      {/* Gráfico de Distribución de Costos */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <PieIcon className="w-5 h-5 text-blue-600" />
          Distribución de Costos Simulados por Servicio (USD/mes)
        </h2>
        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={calculatedItems}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="serviceName" stroke="#888888" fontSize={12} />
              <YAxis stroke="#888888" fontSize={12} unit="$" />
              <Tooltip formatter={(value: number) => [`$${value.toFixed(2)} USD`, "Costo Mensual"]} />
              <Bar dataKey="monthlyCost" radius={[6, 6, 0, 0]}>
                {calculatedItems.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Calculadora Interactiva de Estimación */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Estimación de Costos Simulada
            </h2>
          </div>
          <button
            onClick={handleAddItem}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Agregar Servicio
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
            <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs uppercase text-gray-500 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">Selección del Servicio</th>
                <th className="px-6 py-3 text-center">Cantidad</th>
                <th className="px-6 py-3 text-center">Horas Estimadas</th>
                <th className="px-6 py-3 text-right">Costo Estimado (Unitario)</th>
                <th className="px-6 py-3 text-right">Costo Mensual</th>
                <th className="px-6 py-3 text-right">Costo Anual</th>
                <th className="px-6 py-3 text-center">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {calculatedItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30">
                  <td className="px-6 py-4">
                    <select
                      value={item.serviceId}
                      onChange={(e) => handleUpdateItem(item.id, "serviceId", e.target.value)}
                      className="w-full max-w-xs bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                    >
                      {awsServices.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.name} ({service.category})
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleUpdateItem(item.id, "quantity", Math.max(1, parseInt(e.target.value) || 1))
                      }
                      className="w-20 text-center bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <input
                      type="number"
                      min="1"
                      max="730"
                      value={item.hours}
                      onChange={(e) =>
                        handleUpdateItem(item.id, "hours", Math.max(1, parseInt(e.target.value) || 1))
                      }
                      className="w-24 text-center bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-gray-700 dark:text-gray-300">
                    ${item.estimatedUnitCost.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-blue-600 dark:text-blue-400">
                    ${item.monthlyCost.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-gray-900 dark:text-white">
                    ${item.annualCost.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      disabled={items.length === 1}
                      className="p-1.5 text-gray-400 hover:text-red-500 disabled:opacity-30 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}