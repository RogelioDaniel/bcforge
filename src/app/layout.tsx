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
  title: "BCForge — Business Central Performance: Double the Velocity, Half the Cost",
  description:
    "Enterprise consulting for Business Central, Power Apps, and Power Automate. AI-driven framework slashes project timelines by 50%. Request your free automation audit.",
  keywords: [
    "Business Central",
    "Microsoft 365",
    "ERP",
    "Power Automate",
    "Power Apps",
    "Enterprise Automation",
    "Digital Transformation",
  ],
  authors: [{ name: "BCForge" }],
  icons: {
    icon: "/bcforge-logo.png",
  },
  openGraph: {
    title: "BCForge — Double the Velocity, Half the Cost",
    description:
      "Enterprise consulting for Business Central, Power Apps, and Power Automate. AI-driven deployment in half the time.",
    siteName: "BCForge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BCForge — Double the Velocity, Half the Cost",
    description:
      "Enterprise consulting for Business Central, Power Apps, and Power Automate. AI-driven deployment in half the time.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
