import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Hirenza — Tech Interview Preparation Platform",
    short_name: "Hirenza",
    description: "Your unfair advantage for tech interviews: curated DSA sheets, company archives, SQL, system design, and revision tracking.",
    start_url: "/preparation",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#050505",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
