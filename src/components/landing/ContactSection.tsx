import { MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '972501234567'; // Replace with real number
const WHATSAPP_MESSAGE = 'היי! אני מעוניינת לשמוע עוד על השיעורים 💃';

const ContactSection = () => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <section id="contact" className="py-20 md:py-28 px-6 relative overflow-hidden bg-indigo-100">
...
          <div className="text-center md:text-right flex-1">
            {/* Main headline - broken into 2 lines */}
            <h2 className="text-4xl md:text-5xl text-foreground leading-tight mb-3 animate-fade-in opacity-0 font-sans lg:text-6xl" style={{ animationFillMode: 'forwards' }}>
              רוצה
              <br />
              <span className="font-sans text-5xl text-secondary">לשמוע עוד?</span>
            </h2>
            
            {/* Secondary line */}
            <p className="text-2xl text-foreground/80 mb-6 animate-fade-in opacity-0 font-sans md:text-4xl font-medium" style={{ animationDelay: '0.15s', animationFillMode: 'forwards' }}>
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
