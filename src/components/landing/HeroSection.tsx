import { ChevronDown } from 'lucide-react';
import Blob from '@/components/decor/Blob';

const HeroSection = () => {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 overflow-hidden bg-background">
      {/* Amorphous background blobs for editorial depth */}
      <Blob
        variant={1}
        color="hsl(var(--hoodie-magenta))"
        className="-top-32 -right-40 w-[640px] h-[640px] opacity-25"
      />
      <Blob
        variant={2}
        color="hsl(var(--hoodie-teal))"
        className="-bottom-40 -left-40 w-[560px] h-[560px] opacity-20"
      />
      <Blob
        variant={3}
        color="hsl(var(--hoodie-yellow))"
        className="top-1/3 left-1/4 w-[280px] h-[280px] opacity-20"
      />

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
            className="btn-rect px-12 py-4 bg-hoodie-coral text-white text-lg"
          >
            מי מצטרפת לחגיגה ?
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
    </section>
  );
};

export default HeroSection;
