import heroImage from '@/assets/hero-image.jpeg';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToClasses = () => {
    document.getElementById('classes')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: '78vh' }}>
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="למי אכפת איך את רוקדת?"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto py-20">
        {/* Main Headline */}
        <h1 className="text-white font-display font-bold mb-8 drop-shadow-2xl animate-fade-in opacity-0 leading-tight" 
            style={{ 
              fontSize: 'clamp(40px, 8vw, 64px)',
              animationDelay: '0.1s', 
              animationFillMode: 'forwards' 
            }}>
          למי אכפת<br />
          איך את רוקדת?
        </h1>

        {/* Subtext */}
        <p className="text-xl md:text-2xl text-white/95 mb-12 font-body leading-relaxed drop-shadow-md animate-fade-in opacity-0 max-w-xl mx-auto" 
           style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
          בואי פשוט לזוז.<br />
          בלי ניסיון. בלי שיפוט.
        </p>

        {/* CTA Button */}
        <Button
          onClick={scrollToClasses}
          className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-medium px-7 py-4 h-auto rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105 animate-fade-in opacity-0"
          style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
        >
          בואי לרקוד
        </Button>

        {/* Scroll indicator */}
        <button
          onClick={scrollToHowItWorks}
          className="mt-20 flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors mx-auto group animate-fade-in opacity-0"
          style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}
        >
          <span className="text-sm font-body tracking-wide">איך זה עובד</span>
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
