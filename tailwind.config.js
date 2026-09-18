/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
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
        card: "0 1px 3px 0 rgba(15, 23, 42, 0.06), 0 1px 2px -1px rgba(15, 23, 42, 0.06)",
      },
    },
  },
  plugins: [],
};
