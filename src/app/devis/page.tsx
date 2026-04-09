import type { Metadata } from "next";
import DevisForm from "@/components/DevisForm";

export const metadata: Metadata = {
  title: "Devis gratuit | Installe ta Clim",
  description:
    "Obtenez votre devis climatisation en 2 minutes. Visualisez la clim chez vous en réalité augmentée, choisissez votre modèle et recevez une estimation personnalisée sous 48h.",
};

export default function DevisPage() {
  return <DevisForm />;
}
