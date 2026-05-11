import { ChevronDown } from 'lucide-react';
import Coconut from '@/components/decor/Coconut';
import SunArc from '@/components/decor/SunArc';
import Sparkle from '@/components/decor/Sparkle';
import WaveLines from '@/components/decor/WaveLines';

const HeroSection = () => {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 overflow-hidden bg-background">
      {/* Tropical line-art decorations peeking in */}
      <SunArc
        color="hsl(var(--hoodie-yellow))"
        className="absolute top-8 left-6 md:top-12 md:left-16 w-20 h-20 md:w-28 md:h-28 opacity-70"
      />
      <Coconut
        color="hsl(var(--hoodie-teal))"
        className="absolute -bottom-6 -left-6 md:bottom-0 md:left-4 w-40 h-64 md:w-56 md:h-80 opacity-80"
      />
      <Coconut
        color="hsl(var(--hoodie-orange))"
        className="absolute -bottom-10 -right-8 md:bottom-0 md:right-6 w-32 h-52 md:w-44 md:h-72 opacity-75 -scale-x-100"
      />

      <Sparkle color="hsl(var(--hoodie-coral))" className="absolute top-24 right-12 w-5 h-5 opacity-80" />
      <Sparkle color="hsl(var(--hoodie-magenta))" className="absolute top-40 right-1/4 w-3 h-3 opacity-70" />
      <Sparkle color="hsl(var(--hoodie-orange))" className="absolute top-1/3 left-1/4 w-4 h-4 opacity-70" />
      <Sparkle color="hsl(var(--hoodie-teal))" className="absolute bottom-1/3 right-1/3 w-3 h-3 opacity-70" />

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1] mb-8 animate-fade-in text-hoodie-gradient font-display">
          למי איכפת
          <br />
          איך את רוקדת
        </h1>

        <p
          className="text-muted-foreground text-lg md:text-xl mb-10 max-w-md mx-auto animate-fade-in opacity-0 font-sans"
          style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
        >
          שיעורי מחול ומרחבי תנועה לשחרור ביקורת עצמית, תנועה ומלא פאן !
        </p>

        <div className="animate-fade-in opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
          <button
            onClick={scrollToAbout}
            className="bubble-btn inline-flex items-center gap-2 px-10 py-4 bg-hoodie-coral text-white text-lg hover:scale-105"
          >
            מי מצטרפת לחגיגה ? ​
          </button>
        </div>
      </div>

      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors animate-float z-10"
        aria-label="גלול למטה"
      >
        <ChevronDown className="h-8 w-8" strokeWidth={2} />
      </button>

      {/* Wave divider at bottom */}
      <WaveLines
        color="hsl(var(--hoodie-coral))"
        className="absolute bottom-0 left-0 w-full h-10 opacity-60"
      />
    </section>
  );
};

export default HeroSection;
