import Hero from "@/components/Hero";
import ReassuranceBar from "@/components/ReassuranceBar";
import ProblemSection from "@/components/ProblemSection";
import HowItWorks from "@/components/HowItWorks";
import ProductHighlights from "@/components/ProductHighlights";
import PriceCalculator from "@/components/PriceCalculator";
import AidesSection from "@/components/AidesSection";
import PedagogySection from "@/components/PedagogySection";
import TrustSection from "@/components/TrustSection";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTABanner from "@/components/CTABanner";
import { HomePageSchema } from "@/components/SchemaMarkup";

export default function Home() {
  return (
    <>
      <HomePageSchema />
      <Hero />
      <ReassuranceBar />
      <ProblemSection />
      <HowItWorks />
      <ProductHighlights />
      <PriceCalculator />
      <AidesSection />
      <PedagogySection />
      <TrustSection />
      <Testimonials />
      <FAQ />
      <CTABanner />
    </>
  );
}
