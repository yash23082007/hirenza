import type { Metadata } from "next";
import { ThemeProvider } from "@/hooks/useTheme";
import { ProgressProvider } from "@/hooks/useProgress";
import { ClientCommandPalette } from "@/components/search/ClientCommandPalette";
import { AnnouncementBar } from "@/components/navigation/AnnouncementBar";
import { PwaRegistrar } from "@/components/features/PwaRegistrar";
import { SITE_URL } from "@/lib/site";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import "./globals.css";

import { Lexend } from "next/font/google";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "HIRENZA — The Offline-First Prep OS for Power Users",
    template: "%s | HIRENZA",
  },
  description: "Offline-first interview preparation workspace: Curated DSA sheets, company-specific tracks, algorithmic patterns, system design blueprints, and production SQL.",
  keywords: [
    "DSA",
    "LeetCode",
    "Tech Interview",
    "Coding Sheets",
    "System Design",
    "SQL Sheet",
    "Striver A2Z",
    "NeetCode 150",
    "Cold Email Templates",
    "Interview Preparation",
  ],
  authors: [{ name: "Yash Vijay", url: SITE_URL }],
  creator: "HIRENZA",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: "HIRENZA — The Offline-First Prep OS for Power Users",
    description: "Offline-first interview preparation workspace: Curated DSA sheets, company tracks, algorithmic patterns, system design, and production SQL.",
    siteName: "HIRENZA",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "HIRENZA — The Offline-First Prep OS for Power Users",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HIRENZA — The Offline-First Prep OS for Power Users",
    description: "Offline-first interview preparation workspace: Curated DSA sheets, company tracks, algorithmic patterns, and system design.",
    images: ["/og.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#050505" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('hirenza-theme')||(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.className=t;}catch(e){}})()`,
          }}
        />
      </head>
      <body className={`${lexend.className} ${lexend.variable} font-sans antialiased`}>
        <ScrollProgressBar />
        <ThemeProvider>
          <ProgressProvider>
            <AnnouncementBar />
            {children}
            <ClientCommandPalette />
            <PwaRegistrar />
          </ProgressProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
