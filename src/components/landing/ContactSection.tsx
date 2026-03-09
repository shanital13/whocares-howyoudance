import { MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '972501234567'; // Replace with real number
const WHATSAPP_MESSAGE = 'היי! אני מעוניינת לשמוע עוד על השיעורים 💃';

const ContactSection = () => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <section id="contact" className="py-20 md:py-28 px-6 relative overflow-hidden bg-peach">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 rounded-full bg-primary/8 blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-48 h-48 md:w-72 md:h-72 rounded-full bg-secondary/8 blur-3xl translate-y-1/3 -translate-x-1/4" />
      
      {/* Decorative movement lines */}
      <svg 
        className="absolute top-12 left-8 md:left-16 w-16 h-16 text-primary/20 rotate-12"
        viewBox="0 0 100 100" 
        fill="none"
      >
        <path 
          d="M20 80 Q50 20 80 50" 
          stroke="currentColor" 
          strokeWidth="3" 
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      
      {/* Sparkle dots */}
      <div className="absolute top-20 right-1/4 w-2 h-2 rounded-full bg-primary/30 animate-float" />
      <div className="absolute bottom-24 left-1/3 w-3 h-3 rounded-full bg-secondary/25 animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-12 w-2.5 h-2.5 rounded-full bg-accent/30 animate-float" style={{ animationDelay: '0.5s' }} />

      <div className="max-w-5xl mx-auto relative">
        {/* Desktop: Two column layout / Mobile: Stacked */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10 md:gap-16">
          
          {/* Left side: Headlines + Supporting text */}
          <div className="text-center md:text-right flex-1">
            {/* Main headline - broken into 2 lines */}
            <h2 className="font-nehama text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-3 animate-fade-in opacity-0" style={{ animationFillMode: 'forwards' }}>
              רוצה
              <br />
              <span className="text-primary">לשמוע עוד?</span>
            </h2>
            
            {/* Secondary line */}
            <p className="font-nehama text-2xl md:text-3xl text-foreground/80 mb-6 animate-fade-in opacity-0" style={{ animationDelay: '0.15s', animationFillMode: 'forwards' }}>
              דברי איתי בוואטספ
            </p>
            
            {/* Supporting text */}
            <p className="font-body text-muted-foreground text-base md:text-lg max-w-md mx-auto md:mx-0 md:mr-0 leading-relaxed animate-fade-in opacity-0" style={{ animationDelay: '0.25s', animationFillMode: 'forwards' }}>
              אפשר לשאול על השיעורים, האווירה, למי זה מתאים
              <br className="hidden md:block" />
              <span className="md:hidden"> </span>
              ופשוט להבין אם זה בשבילך
            </p>
          </div>

          {/* Right side: WhatsApp button with decorative arrow */}
          <div className="flex justify-center md:justify-start relative animate-fade-in opacity-0" style={{ animationDelay: '0.35s', animationFillMode: 'forwards' }}>
            {/* Curved arrow pointing to button */}
            <svg 
              className="absolute -top-8 -right-4 md:-right-12 w-12 h-12 text-primary/40 rotate-[-30deg] hidden md:block"
              viewBox="0 0 50 50" 
              fill="none"
            >
              <path 
                d="M10 10 Q25 5 35 20 Q40 30 35 40" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round"
                fill="none"
              />
              <path 
                d="M32 38 L35 42 L39 37" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
            
            {/* WhatsApp Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] text-white text-xl md:text-2xl font-bold px-10 md:px-14 py-5 md:py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1"
            >
              <MessageCircle className="h-7 w-7 md:h-8 md:w-8" strokeWidth={2} />
              <span className="font-nehama">דברי איתי</span>
              
              {/* Subtle glow effect on hover */}
              <div className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
