import type { DashboardSummary } from "@/types/cloud";
import { awsServices } from "./awsServices";
import { regions } from "./regions";
import { securityIndicators } from "./securityIndicators";
import { initialProposals } from "./proposals";
import { costRates } from "./costRates";

const activeProposal = initialProposals[0];

// Cálculo de costo mensual considerando 730 horas de uso
const monthlyCost = activeProposal.selectedServices.reduce((total, serviceId) => {
  const rate = costRates[serviceId] ?? 0;
  return total + rate * 730;
}, 0);

// Porcentaje de indicadores en estado "success"
const securityScore = Math.round(
  (securityIndicators.filter((s) => s.level === "success").length /
    securityIndicators.length) *
    100
);

export const dashboardSummary: DashboardSummary = {
  servicesInUse: activeProposal.selectedServices.length,
  selectedRegion:
    regions.find((r) => r.code === activeProposal.region)?.name ?? "N/A",
  monthlyCost: Number(monthlyCost.toFixed(2)),
  annualCost: Number((monthlyCost * 12).toFixed(2)),
  securityScore,
  cloudResources: awsServices.filter((s) => s.status === "active").length,
  architectureStatus: "active",
};