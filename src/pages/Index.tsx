import HeroSection from '@/components/landing/HeroSection';
import ClassesSection from '@/components/landing/ClassesSection';
import WhoAmISection from '@/components/landing/WhoAmISection';
import ContactSection from '@/components/landing/ContactSection';
import Footer from '@/components/landing/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ClassesSection />
      <WhoAmISection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
