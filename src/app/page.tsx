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
import DevisForm from "@/components/DevisForm";
import { HomePageSchema } from "@/components/SchemaMarkup";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <HomePageSchema />
      <Hero />
      <ReassuranceBar />
      <ScrollReveal>
        <ProblemSection />
      </ScrollReveal>
      <ScrollReveal>
        <HowItWorks />
      </ScrollReveal>
      <ScrollReveal>
        <ProductHighlights />
      </ScrollReveal>
      <ScrollReveal>
        <PriceCalculator />
      </ScrollReveal>
      <ScrollReveal>
        <AidesSection />
      </ScrollReveal>
      <ScrollReveal>
        <PedagogySection />
      </ScrollReveal>
      <ScrollReveal>
        <TrustSection />
      </ScrollReveal>
      <ScrollReveal>
        <Testimonials />
      </ScrollReveal>
      <ScrollReveal>
        <FAQ />
      </ScrollReveal>
      <ScrollReveal>
        <DevisForm />
      </ScrollReveal>
      <ScrollReveal direction="scale">
        <CTABanner />
      </ScrollReveal>
    </>
  );
}
