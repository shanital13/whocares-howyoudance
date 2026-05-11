import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 overflow-hidden bg-background">
      {/* Soft organic decorative blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] max-w-[480px] max-h-[480px] rounded-full bg-hoodie-coral/15 blur-[140px]" />
      <div className="absolute bottom-[-8%] left-[-8%] w-[45vw] h-[45vw] max-w-[420px] max-h-[420px] rounded-full bg-hoodie-teal/15 blur-[140px]" />

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1] mb-8 animate-fade-in text-hoodie-gradient font-display">
          למי איכפת
          <br />
          איך את רוקדת
        </h1>

        <p className="text-muted-foreground text-lg md:text-xl mb-10 max-w-md mx-auto animate-fade-in opacity-0 font-sans" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          שיעורי מחול ומרחבי תנועה לשחרור ביקורת עצמית, תנועה ומלא פאן !
        </p>

        <div className="animate-fade-in opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
          <button
            onClick={scrollToAbout}
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-hoodie-coral text-white text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1"
          >
            מי מצטרפת לחגיגה ? ​
          </button>
        </div>
      </div>

      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors animate-float"
        aria-label="גלול למטה"
      >
        <ChevronDown className="h-8 w-8" strokeWidth={2} />
      </button>
    </section>
  );
};

export default HeroSection;
