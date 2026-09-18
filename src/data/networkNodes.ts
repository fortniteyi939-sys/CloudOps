import type { NetworkNode } from "@/types/cloud";

export const networkNodes: NetworkNode[] = [
  {
    id: "internet",
    label: "Internet",
    description: "Usuarios finales accediendo a la aplicación.",
    icon: "Globe",
  },
  {
    id: "route53",
    label: "Route 53",
    description: "Resuelve el dominio hacia la infraestructura.",
    icon: "Route",
  },
  {
    id: "cloudfront",
    label: "CloudFront",
    description: "Distribuye el contenido desde el borde más cercano.",
    icon: "Zap",
  },
  {
    id: "vpc",
    label: "VPC",
    description: "Red privada que aísla los recursos internos.",
    icon: "Network",
  },
  {
    id: "compute",
    label: "EC2 / RDS",
    description: "Servidores de aplicación y base de datos.",
    icon: "Server",
  },
];