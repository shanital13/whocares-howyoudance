import HeroSection from '@/components/landing/HeroSection';
import AboutSection from '@/components/landing/AboutSection';
import ServicesSection from '@/components/landing/ServicesSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import ContactSection from '@/components/landing/ContactSection';
import Footer from '@/components/landing/Footer';
import CloudBackdrop from '@/components/decor/CloudBackdrop';

const Index = () => {
  return (
    <>
      <CloudBackdrop />
      <main className="relative min-h-screen">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
};

export default Index;
