import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BCForge - Transforma tu negocio con Business Central",
  description:
    "Consultoría especializada en Microsoft Business Central. Automatización, desarrollo personalizado e integraciones que impulsan tu operación empresarial.",
  keywords: [
    "Business Central",
    "Microsoft Dynamics",
    "ERP",
    "Automatización",
    "Consultoría",
    "Desarrollo personalizado",
    "Integraciones",
  ],
  authors: [{ name: "BCForge" }],
  icons: {
    icon: "/bcforge-logo.png",
  },
  openGraph: {
    title: "BCForge - Transforma tu negocio con Business Central",
    description:
      "Consultoría especializada en Microsoft Business Central. Automatización, desarrollo personalizado e integraciones que impulsan tu operación empresarial.",
    siteName: "BCForge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BCForge - Transforma tu negocio con Business Central",
    description:
      "Consultoría especializada en Microsoft Business Central. Automatización, desarrollo personalizado e integraciones que impulsan tu operación empresarial.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
