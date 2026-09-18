import type { ServiceStatus, IndicatorLevel } from "@/types/cloud";

interface StatusBadgeProps {
  status: ServiceStatus | IndicatorLevel;
  label?: string;
}

const statusStyles: Record<string, string> = {
  active: "bg-security/10 text-security",
  success: "bg-security/10 text-security",
  warning: "bg-cost/10 text-cost",
  inactive: "bg-alert/10 text-alert",
  danger: "bg-alert/10 text-alert",
};

const statusLabels: Record<string, string> = {
  active: "Activo",
  success: "Correcto",
  warning: "Requiere revisión",
  inactive: "Inactivo",
  danger: "Problema",
};

export default function StatusBadge({ status, label }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-caption font-medium ${statusStyles[status]}`}
    >
      {label ?? statusLabels[status]}
    </span>
  );
}