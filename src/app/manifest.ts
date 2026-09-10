import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HIRENZA — The Offline-First Tech Interview Prep OS",
    short_name: "HIRENZA",
    description:
      "The offline-first prep OS: curated DSA sheets, company archives, SQL, system design, and revision tracking.",
    start_url: "/preparation",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#050505",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
