import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Semantic colors - reference CSS variables for theme switching
        background: "var(--background)",
        "surface-1": "var(--surface-1)",
        "surface-2": "var(--surface-2)",
        "surface-3": "var(--surface-3)",
        "surface-hover": "var(--surface-hover)",
        sidebar: "var(--sidebar)",
        border: "var(--border)",
        "border-soft": "var(--border-soft)",

        // Text colors
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",

        // Brand colors (static, don't change with theme)
        "purple-1": "var(--purple-1)",
        "purple-2": "var(--purple-2)",
        "brand-yellow": "var(--brand-yellow)",
        "brand-green": "var(--brand-green)",
        "brand-orange": "var(--brand-orange)",
        "brand-red": "var(--brand-red)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        "glow-white": "0 0 40px rgba(255, 255, 255, 0.1)",
        "glow-purple": "0 0 60px rgba(122, 51, 246, 0.15)",
      },
      animation: {
        orbit: "orbit 40s linear infinite",
        "orbit-reverse": "orbit 40s linear infinite reverse",
        float: "float 6s ease-in-out infinite",
        "fade-in": "fadeIn 0.7s ease-out forwards",
        "slide-up": "slideUp 0.7s ease-out forwards",
        "draw-line": "drawLine 1s ease-out forwards",
      },
      keyframes: {
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(var(--orbit-radius)) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(var(--orbit-radius)) rotate(-360deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-8px) rotate(2deg)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(25px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        drawLine: {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
