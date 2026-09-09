import type { Metadata } from "next";
import { ThemeProvider } from "@/hooks/useTheme";
import { ProgressProvider } from "@/context/ProgressContext";
import dynamic from "next/dynamic";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const CommandPalette = dynamic(
  () => import("@/components/search/CommandPalette").then((m) => ({ default: m.CommandPalette })),
  { ssr: false }
);

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Hirenza — Your Unfair Advantage For Tech Interviews",
    template: "%s | Hirenza",
  },
  description: "Structured DSA, company-wise interview preparation, SQL, system design, cold emails and engineering career resources.",
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
  authors: [{ name: "Yash", url: SITE_URL }],
  creator: "Hirenza",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: "Hirenza — Your Unfair Advantage For Tech Interviews",
    description: "Structured DSA, company-wise interview preparation, SQL, system design, notes and career resources.",
    siteName: "Hirenza",
  },
  twitter: {
    card: "summary",
    title: "Hirenza — Your Unfair Advantage For Tech Interviews",
    description: "Structured DSA, company-wise interview preparation, SQL, system design, notes and career resources.",
  },
  icons: { icon: "/favicon.ico" },
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
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <ProgressProvider>
            {children}
            <CommandPalette />
          </ProgressProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
