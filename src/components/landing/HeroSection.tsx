import heroImage from '@/assets/hero-image.jpeg';
import heroMobileImage from '@/assets/hero-mobile.jpeg';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const scrollToClasses = () => {
    document.getElementById('classes')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden">
      {/* Desktop: full-width image drives the section height */}
      <div className="hidden md:block w-full">
        <img
          src={heroImage}
          alt="למי אכפת איך את רוקדת"
          className="w-full h-auto block"
        />
      </div>

      {/* Mobile: full-screen cover */}
      <div className="md:hidden w-full min-h-[75vh]">
        <img
          src={heroMobileImage}
          alt="למי אכפת איך את רוקדת"
          className="w-full h-full object-cover object-center absolute inset-0"
        />
      </div>

      {/* Scroll indicator overlay */}
      <div className="absolute inset-0 z-10 flex items-end justify-center pb-8">
        <button
          onClick={scrollToClasses}
          className="flex flex-col items-center gap-2 text-white/80 hover:text-white transition-all group animate-fade-in opacity-0 hover:scale-110"
          style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
          aria-label="גלול למטה"
        >
          <ChevronDown className="h-8 w-8 animate-float" strokeWidth={2.5} />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
