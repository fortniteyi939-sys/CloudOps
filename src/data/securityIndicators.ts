import type { SecurityIndicator } from "@/types/cloud";

export const securityIndicators: SecurityIndicator[] = [
  {
    id: "sec-1",
    label: "Modelo de responsabilidad compartida",
    category: "Responsabilidad compartida",
    level: "success",
    description: "AWS protege la infraestructura; el cliente protege sus datos y configuración.",
  },
  {
    id: "sec-2",
    label: "Autenticación multifactor (MFA)",
    category: "IAM",
    level: "warning",
    description: "Activada solo para el usuario raíz, pendiente para otros roles.",
  },
  {
    id: "sec-3",
    label: "Principio de menor privilegio",
    category: "IAM",
    level: "success",
    description: "Los roles IAM están limitados a los permisos strictly necesarios.",
  },
  {
    id: "sec-4",
    label: "Protección de la cuenta raíz",
    category: "Protección de cuentas",
    level: "danger",
    description: "La cuenta raíz no tiene alertas de facturación configuradas.",
  },
  {
    id: "sec-5",
    label: "Cifrado de datos en reposo",
    category: "Protección de datos",
    level: "success",
    description: "Los buckets S3 y las bases RDS usan cifrado por defecto.",
  },
  {
    id: "sec-6",
    label: "Cifrado de datos en tránsito",
    category: "Protección de datos",
    level: "success",
    description: "Todo el tráfico entre CloudFront y el origen usa HTTPS.",
  },
  {
    id: "sec-7",
    label: "Cumplimiento normativo",
    category: "Cumplimiento",
    level: "warning",
    description: "Pendiente de revisión para cumplimiento con estándares regionales.",
  },
];