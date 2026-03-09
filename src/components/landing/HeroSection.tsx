import heroImage from '@/assets/hero-image.jpeg';
import heroMobileImage from '@/assets/hero-mobile.jpeg';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative flex items-center justify-center overflow-hidden min-h-[75vh]">
      {/* Background image - on desktop, drives the section height naturally */}
      <div className="hidden md:block w-full">
        <img
          src={heroImage}
          alt="נשים רוקדות בחופשיות"
          className="w-full h-auto block"
        />
      </div>
      {/* Mobile background */}
      <div className="md:hidden absolute inset-0">
        <img
          src={heroMobileImage}
          alt="נשים רוקדות בחופשיות"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Content - overlays the image */}
      <div className="md:absolute md:inset-0 relative z-10 flex items-center justify-center text-center px-6 max-w-5xl mx-auto py-24">
        <button
          onClick={scrollToHowItWorks}
          className="flex flex-col items-center gap-3 text-white/90 hover:text-white transition-all mx-auto group animate-fade-in opacity-0 hover:scale-110"
          style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
          aria-label="גלול למטה"
        >
          <span className="text-base font-body tracking-wide font-medium">איך זה עובד</span>
          <ChevronDown className="h-7 w-7 animate-float" strokeWidth={2.5} />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
