import heroImage from '@/assets/hero-image.jpeg';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToClasses = () => {
    document.getElementById('classes')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: '75vh' }}>
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="למי אכפת איך את רוקדת?"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto py-24">
        {/* Main Headline - Playful, Large, Expressive */}
        <h1 className="text-white font-display font-bold drop-shadow-2xl animate-fade-in opacity-0 leading-[1.1]" 
            style={{ 
              fontSize: 'clamp(48px, 10vw, 72px)',
              animationDelay: '0.2s', 
              animationFillMode: 'forwards',
              letterSpacing: '-0.02em'
            }}>
          למי אכפת<br />
          איך את רוקדת?
        </h1>

        {/* Scroll indicator - playful and inviting */}
        <button
          onClick={scrollToHowItWorks}
          className="mt-20 flex flex-col items-center gap-3 text-white/90 hover:text-white transition-all mx-auto group animate-fade-in opacity-0 hover:scale-110"
          style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
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
