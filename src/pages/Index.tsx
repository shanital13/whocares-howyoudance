import HeroSection from '@/components/landing/HeroSection';
import AboutSection from '@/components/landing/AboutSection';
import GallerySection from '@/components/landing/GallerySection';
import ClassesSection from '@/components/landing/ClassesSection';
import ContactSection from '@/components/landing/ContactSection';
import Footer from '@/components/landing/Footer';
import { BackgroundGlow } from '@/components/ui/background-glow';

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <BackgroundGlow>
        <ClassesSection />
        <AboutSection />
        <GallerySection />
        <ContactSection />
      </BackgroundGlow>
      <Footer />
    </div>
  );
};

export default Index;
