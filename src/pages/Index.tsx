import HeroSection from '@/components/landing/HeroSection';
import AboutSection from '@/components/landing/AboutSection';
import ServicesSection from '@/components/landing/ServicesSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import ContactSection from '@/components/landing/ContactSection';
import Footer from '@/components/landing/Footer';
import MarqueeStrip from '@/components/decor/MarqueeStrip';

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <MarqueeStrip />
      <AboutSection />
      <ServicesSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
