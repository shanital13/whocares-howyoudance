import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-image.jpeg';

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="למי אכפת איך את רוקדת?"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto mt-[30vh]">
        <p className="text-xl md:text-2xl text-primary-foreground/90 mb-4 font-light leading-relaxed drop-shadow-lg animate-fade-in opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
          מסע של התפתחות, שחרור בושה וחסמים דרך תנועה
        </p>
        <p className="text-lg text-primary-foreground/70 mb-10 font-light drop-shadow-md animate-fade-in opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
          בואי לרקוד. בואי להיות. בלי שיפוטיות, בלי ציפיות.
        </p>
        <a href="#classes" className="animate-fade-in opacity-0 inline-block" style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}>
          <Button
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-10 py-6 font-bold rounded-full shadow-xl hover-scale"
          >
            הצטרפי עכשיו 💃
          </Button>
        </a>
        <a href="#classes" className="block mt-8 text-primary-foreground/60 hover:text-primary-foreground transition-colors drop-shadow-md animate-fade-in opacity-0" style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
          ↓ לשיעורים הקרובים
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
