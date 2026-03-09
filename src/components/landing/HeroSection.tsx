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
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto mt-[30vh]">
        <p className="text-xl md:text-2xl text-primary-foreground/90 mb-4 font-light leading-relaxed drop-shadow-lg animate-fade-in opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
          מסע של התפתחות, שחרור בושה וחסמים דרך תנועה
        </p>
        <p className="text-lg text-primary-foreground/70 mb-10 font-light drop-shadow-md animate-fade-in opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
          בואי לרקוד. בואי להיות. בלי שיפוטיות, בלי ציפיות.
        </p>
        <a href="#classes" className="block mt-8 text-primary-foreground/60 hover:text-primary-foreground transition-colors drop-shadow-md animate-fade-in opacity-0" style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}>
          ↓ לשיעורים הקרובים
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
