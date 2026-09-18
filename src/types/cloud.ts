// ============================================================
// Tipos centrales del dominio "CloudOps Dashboard"
// Cada módulo (Planning, Costs, Infrastructure, Security,
// Network, Services) consume estos tipos en vez de redefinirlos.
// ============================================================

export type ServiceStatus = "active" | "warning" | "inactive" | "maintenance";

export type IndicatorLevel = "success" | "warning" | "danger";

// --- Módulo 7: Servicios AWS ---------------------------------
export type AWSCategory =
  | "Cómputo"
  | "Almacenamiento"
  | "Base de datos"
  | "Redes y entrega de contenido"
  | "Seguridad, identidad y cumplimiento";

export interface AWSService {
  id: string;
  name: string; // p.ej. "Amazon EC2"
  category: AWSCategory;
  description: string;
  mainFunction: string;
  status: ServiceStatus;
  icon: string; // nombre del ícono de lucide-react
}

// --- Módulo 4: Infraestructura Global --------------------------
export interface Region {
  id: string;
  code: string; // p.ej. "us-east-1"
  name: string; // p.ej. "Norte de Virginia"
  location: string; // país / ciudad
  latitude: number;
  longitude: number;
  deployedServices: string[]; // nombres de AWSService desplegados
  status: ServiceStatus;
}

// --- Módulo 2: Planificación Cloud -----------------------------
export type ApplicationType =
  | "Web"
  | "Móvil"
  | "E-commerce"
  | "Empresarial (ERP/CRM)"
  | "Analítica de datos"
  | "IoT";

export type AvailabilityLevel = "Estándar (99.9%)" | "Alta (99.95%)" | "Crítica (99.99%)";

export type MigrationGoal =
  | "Reducción de costos"
  | "Escalabilidad"
  | "Modernización"
  | "Continuidad del negocio"
  | "Expansión geográfica";

export interface CloudProposal {
  id: string;
  solutionName: string;
  applicationType: ApplicationType;
  description: string;
  region: string; // Region.code
  estimatedUsers: number;
  availabilityLevel: AvailabilityLevel;
  selectedServices: string[]; // AWSService.id[]
  migrationGoal: MigrationGoal;
  createdAt: string; // ISO date
}

// --- Módulo 3: Costos y economía Cloud --------------------------
export interface CostEstimateInput {
  serviceId: string;
  quantity: number;
  estimatedHours: number;
}

export interface CostEstimateResult extends CostEstimateInput {
  id: string;
  unitCost: number; // costo por hora simulado
  estimatedCost: number; // quantity * hours * unitCost
  monthlyCost: number;
  annualCost: number;
}

// --- Módulo 5: Seguridad -----------------------------------------
export interface SecurityIndicator {
  id: string;
  label: string; // p.ej. "Autenticación multifactor (MFA)"
  category: "Responsabilidad compartida" | "IAM" | "Protección de cuentas" | "Protección de datos" | "Cumplimiento";
  level: IndicatorLevel;
  description: string;
}

// --- Módulo 6: Arquitectura de Red --------------------------------
export interface NetworkNode {
  id: string;
  label: string; // p.ej. "CloudFront"
  description: string;
  icon: string;
}

// --- Módulo 1: Dashboard (resumen agregado) ------------------------
export interface DashboardSummary {
  servicesInUse: number;
  selectedRegion: string;
  monthlyCost: number;
  annualCost: number;
  securityScore: number; // 0-100
  cloudResources: number;
  architectureStatus: ServiceStatus;
}
