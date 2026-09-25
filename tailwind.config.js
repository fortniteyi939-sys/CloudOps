/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  // "class" en vez de la opción por defecto ("media"): así las clases dark:*
  // solo se activan si algún elemento tiene la clase .dark, y no automáticamente
  // según la preferencia de tema del sistema operativo del usuario. Esta app
  // todavía no tiene un selector de tema, así que sin esto el texto se
  // volvía blanco sobre el fondo claro cuando el sistema estaba en modo oscuro.
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Paleta oficial de la práctica (sección 7 del documento)
        background: "#F8FAFC",
        sidebar: "#0F172A",
        primary: {
          DEFAULT: "#2563EB",
          light: "#3B82F6",
          dark: "#1D4ED8",
        },
        security: {
          DEFAULT: "#16A34A",
          light: "#22C55E",
        },
        cost: {
          DEFAULT: "#F59E0B",
          light: "#FBBF24",
        },
        alert: {
          DEFAULT: "#DC2626",
          light: "#EF4444",
        },
        textPrimary: "#1E293B",
        textSecondary: "#64748B",
        borderColor: "#E2E8F0",
        // Borde más marcado para las cards (a partir de textPrimary con opacidad),
        // pedido para que se distingan mejor del fondo. El borderColor original
        // (#E2E8F0) se mantiene para inputs, tablas y demás divisores.
        cardBorder: "#1E293B",
        card: "#FFFFFF",
      },
      fontSize: {
        "title": ["30px", { lineHeight: "1.2", fontWeight: "700" }],
        "subtitle": ["19px", { lineHeight: "1.3", fontWeight: "600" }],
        "body": ["15px", { lineHeight: "1.5", fontWeight: "400" }],
        "caption": ["13px", { lineHeight: "1.4", fontWeight: "400" }],
      },
      borderRadius: {
        card: "14px",
      },
      boxShadow: {
        // Renombrado de "card" a "elevated": Tailwind genera automáticamente una
        // utilidad de color de sombra por cada entrada de theme.colors (incluida
        // "card": "#FFFFFF"), y esa regla ".shadow-card{--tw-shadow-color:#FFFFFF}"
        // colisionaba con esta sombra, dejándola blanca sobre blanco e invisible.
        elevated: "0 1px 3px 0 rgba(15, 23, 42, 0.06), 0 1px 2px -1px rgba(15, 23, 42, 0.06)",
      },
    },
  },
  plugins: [],
};
