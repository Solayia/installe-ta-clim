import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import ProductHighlights from "@/components/ProductHighlights";
import Testimonials from "@/components/Testimonials";
import AboutSection from "@/components/AboutSection";
import FAQ from "@/components/FAQ";
import CTABanner from "@/components/CTABanner";
import { HomePageSchema } from "@/components/SchemaMarkup";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <HomePageSchema />
      <Hero />
      <ScrollReveal>
        <HowItWorks />
      </ScrollReveal>
      <ScrollReveal>
        <ProductHighlights />
      </ScrollReveal>
      <ScrollReveal>
        <Testimonials />
      </ScrollReveal>
      <ScrollReveal>
        <AboutSection />
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
