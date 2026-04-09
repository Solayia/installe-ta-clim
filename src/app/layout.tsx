import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Installe ta Clim | Votre climatisation, simplement",
  description:
    "Achetez votre climatisation et installez-la vous-même ou faites installer par nos experts certifiés RGE. Devis gratuit en 2 minutes, sans engagement.",
  keywords:
    "climatisation, clim, installation climatisation, prêt à poser, devis climatisation, clim maison, split, pompe à chaleur",
  openGraph: {
    title: "Installe ta Clim | Votre climatisation, simplement",
    description:
      "Achetez votre climatisation et installez-la vous-même ou faites installer par nos experts. Devis gratuit en 2 min.",
    type: "website",
    locale: "fr_FR",
    siteName: "Installe ta Clim",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}
