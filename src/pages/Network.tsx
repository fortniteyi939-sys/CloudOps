import { useState } from "react";
import * as Icons from "lucide-react";
import { ArrowRight, Network as NetworkIcon } from "lucide-react";
import { networkNodes } from "@/data/networkNodes";
import type { NetworkNode } from "@/types/cloud";

// Descripción de cada tramo de la arquitectura (qué conecta con qué)
const connectionLabels: Record<string, string> = {
  internet: "Solicitud HTTP(S)",
  route53: "Resolución DNS",
  cloudfront: "Entrega desde el borde (CDN)",
  vpc: "Enrutamiento interno privado",
};

function NodeIcon({ name, className }: { name: string; className?: string }) {
  const Icon =
    (Icons as unknown as Record<string, Icons.LucideIcon>)[name] ?? Icons.Box;
  return <Icon className={className} />;
}

export default function Network() {
  const [selected, setSelected] = useState<NetworkNode>(networkNodes[0]);

  return (
    <div className="space-y-8">
      {/* Diagrama interactivo */}
      <div className="bg-card rounded-card shadow-elevated border border-cardBorder/30 p-6 sm:p-10">
        <div className="flex flex-wrap items-center justify-center gap-y-6 gap-x-0">
          {networkNodes.map((node, index) => {
            const isSelected = selected.id === node.id;
            const isLast = index === networkNodes.length - 1;

            return (
              <div key={node.id} className="flex flex-col sm:flex-row items-center">
                <button
                  onClick={() => setSelected(node)}
                  className={`flex flex-col items-center gap-2 w-28 sm:w-32 p-3 sm:p-4 rounded-card border transition-all ${
                    isSelected
                      ? "border-primary bg-primary/5 ring-1 ring-primary scale-105"
                      : "border-borderColor bg-card hover:border-primary/60"
                  }`}
                >
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center ${
                      isSelected ? "bg-primary text-white" : "bg-primary/10 text-primary"
                    }`}
                  >
                    <NodeIcon name={node.icon} className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className="text-caption font-semibold text-textPrimary text-center">
                    {node.label}
                  </span>
                </button>

                {!isLast && (
                  <div className="flex sm:flex-col items-center justify-center gap-1 py-1 sm:py-0 sm:px-2 text-textSecondary">
                    <ArrowRight className="w-5 h-5 rotate-90 sm:rotate-0 shrink-0" />
                    <span className="text-[9px] uppercase tracking-wide text-center leading-tight hidden md:block max-w-[70px]">
                      {connectionLabels[node.id] ?? ""}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Detalle del nodo seleccionado */}
      <div className="bg-card rounded-card shadow-elevated border border-cardBorder/30 p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <NodeIcon name={selected.icon} className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-subtitle text-textPrimary flex items-center gap-2">
              {selected.label}
            </h2>
            <p className="text-body text-textSecondary mt-1">{selected.description}</p>
          </div>
        </div>
      </div>

      {/* Nota de flujo mínimo */}
      <div className="flex items-center gap-2 text-caption text-textSecondary">
        <NetworkIcon size={14} />
        Flujo mínimo de referencia: Internet → Route 53 → CloudFront → VPC → EC2 / RDS.
      </div>
    </div>
  );
}
