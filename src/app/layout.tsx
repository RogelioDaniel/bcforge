import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
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
  title: "BCForge — Business Central: Doble Velocidad, Mitad de Costo",
  description:
    "Consultoría empresarial para Business Central, Power Apps y Power Automate. Nuestro framework con IA reduce tiempos de proyecto en 50%. Solicita tu auditoría gratuita.",
  keywords: [
    "Business Central",
    "Microsoft 365",
    "ERP",
    "Power Automate",
    "Power Apps",
    "Automatización Empresarial",
    "Transformación Digital",
  ],
  authors: [{ name: "BCForge" }],
  icons: {
    icon: "/bcforge-logo.png",
  },
  openGraph: {
    title: "BCForge — Doble Velocidad, Mitad de Costo",
    description:
      "Consultoría empresarial para Business Central, Power Apps y Power Automate. Implementación con IA en la mitad del tiempo.",
    siteName: "BCForge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BCForge — Doble Velocidad, Mitad de Costo",
    description:
      "Consultoría empresarial para Business Central, Power Apps y Power Automate. Implementación con IA en la mitad del tiempo.",
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
        <Analytics />
      </body>
    </html>
  );
}
