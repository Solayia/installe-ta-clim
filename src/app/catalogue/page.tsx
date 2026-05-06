import type { Metadata } from "next";
import Catalogue from "@/components/Catalogue";

export const metadata: Metadata = {
  title: "Catalogue climatisation prêt à poser | Installe ta Clim",
  description:
    "Découvrez nos 3 gammes de climatisation prêt à poser. Filtrez par surface, marque et prix. Puissance et équivalence m² affichées clairement. Livraison partout en France.",
};

export default function CataloguePage() {
  return <Catalogue />;
}
