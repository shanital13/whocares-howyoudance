import HeroSection from '@/components/landing/HeroSection';
import AboutSection from '@/components/landing/AboutSection';
import ServicesSection from '@/components/landing/ServicesSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import ContactSection from '@/components/landing/ContactSection';
import Footer from '@/components/landing/Footer';
import CloudBackdrop from '@/components/decor/CloudBackdrop';

const Index = () => {
  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      <CloudBackdrop />
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
};

export default Index;
