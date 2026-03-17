import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: process.env.GITHUB_PAGES === "true" ? "/try-moonjab-com/" : "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "moonjab-logo.png"],
      manifest: {
        name: "MoonJab — Construye la carrera que mereces",
        short_name: "MoonJab",
        description: "Plataforma de empleabilidad con IA. Mejora tu CV, practica entrevistas y encuentra oportunidades alineadas a tu perfil.",
        theme_color: "#10b981",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait",
        start_url: "./",
        scope: "./",
        icons: [
          {
            src: "./moonjab-logo.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "./moonjab-logo.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ],
        categories: ["productivity", "education", "business"],
        screenshots: [],
        shortcuts: [
          {
            name: "Practicar Entrevista",
            short_name: "Entrevistas",
            description: "Inicia una sesión de práctica de entrevista",
            url: "./dashboard/interviews",
            icons: [{ src: "./moonjab-logo.png", sizes: "192x192" }]
          },
          {
            name: "Crear CV",
            short_name: "CV",
            description: "Crea o edita tu CV profesional",
            url: "./dashboard/cv",
            icons: [{ src: "./moonjab-logo.png", sizes: "192x192" }]
          },
          {
            name: "Oportunidades",
            short_name: "Jobs",
            description: "Explora oportunidades de trabajo",
            url: "./dashboard/opportunities",
            icons: [{ src: "./moonjab-logo.png", sizes: "192x192" }]
          }
        ]
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
        navigateFallbackDenylist: [/^\/~oauth/],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "gstatic-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
