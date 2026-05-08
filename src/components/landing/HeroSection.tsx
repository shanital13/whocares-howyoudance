import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 overflow-hidden bg-background">
      {/* Decorative blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] max-w-[500px] max-h-[500px] rounded-full bg-neon-pink/15 blur-[100px]" />
      <div className="absolute bottom-[-5%] left-[-10%] w-[50vw] h-[50vw] max-w-[400px] max-h-[400px] rounded-full bg-neon-cyan/15 blur-[100px]" />
      <div className="absolute top-[30%] left-[20%] w-[30vw] h-[30vw] max-w-[300px] max-h-[300px] rounded-full bg-neon-purple/10 blur-[80px]" />

      {/* Wavy decorative lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.06]" viewBox="0 0 1200 800" fill="none">
        <path d="M -100 400 Q 200 200, 500 350 T 1000 300 T 1400 350" stroke="hsl(var(--neon-coral))" strokeWidth="2" />
        <path d="M -50 500 Q 300 350, 600 500 T 1100 450" stroke="hsl(var(--neon-purple))" strokeWidth="2" />
      </svg>

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        {/* Main headline with rainbow effect */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display leading-[1.1] mb-8 animate-fade-in text-rainbow">
          למי איכפת
          <br />
          איך את רוקדת
        </h1>

        {/* Subtitle */}
        <p className="font-body text-muted-foreground text-lg md:text-xl mb-10 max-w-md mx-auto animate-fade-in opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          מרחב של תנועה, חופש וריקוד — בלי שיפוט, בלי "נכון" ו"לא נכון"
        </p>

        {/* CTA Button */}
        <div className="animate-fade-in opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
          <button
            onClick={scrollToServices}
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-primary text-primary-foreground font-display text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1"
          >
            בואי לרקוד 💃
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToServices}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors animate-float"
        aria-label="גלול למטה"
      >
        <ChevronDown className="h-8 w-8" strokeWidth={2} />
      </button>
    </section>
  );
};

export default HeroSection;
