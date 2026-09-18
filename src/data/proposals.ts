import type { CloudProposal } from "@/types/cloud";

export const initialProposals: CloudProposal[] = [
  {
    id: "prop-1",
    solutionName: "Portal de Ventas B2B",
    applicationType: "Web",
    description: "Plataforma web para gestión de pedidos entre distribuidores.",
    region: "us-east-1",
    estimatedUsers: 5000,
    availabilityLevel: "Alta (99.95%)",
    selectedServices: ["ec2", "s3", "rds", "route53"],
    migrationGoal: "Escalabilidad",
    createdAt: new Date().toISOString(),
  },
];