import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import ProductHighlights from "@/components/ProductHighlights";
import AidesBanner from "@/components/AidesBanner";
import TrustBar from "@/components/TrustBar";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTABanner from "@/components/CTABanner";
import { HomePageSchema } from "@/components/SchemaMarkup";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <HomePageSchema />
      <Hero />
      <TrustBar />
      <ScrollReveal>
        <HowItWorks />
      </ScrollReveal>
      <ScrollReveal>
        <ProductHighlights />
      </ScrollReveal>
      <AidesBanner />
      <ScrollReveal>
        <Testimonials />
      </ScrollReveal>
      <ScrollReveal>
        <FAQ />
      </ScrollReveal>
      <ScrollReveal direction="scale">
        <CTABanner />
      </ScrollReveal>
    </>
  );
}
