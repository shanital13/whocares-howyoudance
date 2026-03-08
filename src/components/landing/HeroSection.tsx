import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, hsl(320 70% 45% / 0.85), hsl(260 60% 50% / 0.8), hsl(200 70% 40% / 0.85), hsl(160 60% 40% / 0.8))',
        }}
      />
      {/* Decorative blobs */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-accent/20 blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-primary/20 blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <h1 className="font-display text-5xl md:text-7xl text-primary-foreground mb-6 leading-tight">
          למי אכפת איך את רוקדת?
        </h1>
        <p className="text-xl md:text-2xl text-primary-foreground/90 mb-4 font-light leading-relaxed">
          מסע של התפתחות, שחרור בושה וחסמים דרך תנועה
        </p>
        <p className="text-lg text-primary-foreground/70 mb-10 font-light">
          בואי לרקוד. בואי להיות. בלי שיפוטיות, בלי ציפיות.
        </p>
        {!user && (
          <Button
            size="lg"
            onClick={signInWithGoogle}
            className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-10 py-6 font-bold rounded-full shadow-xl"
          >
            הצטרפי עכשיו 💃
          </Button>
        )}
        <a href="#classes" className="block mt-8 text-primary-foreground/60 hover:text-primary-foreground transition-colors">
          ↓ לשיעורים הקרובים
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
