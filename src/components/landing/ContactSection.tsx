import { Button } from '@/components/ui/button';
import { MessageCircle, Heart } from 'lucide-react';

const WHATSAPP_NUMBER = '972501234567'; // Replace with real number
const WHATSAPP_MESSAGE = 'היי! אני מעוניינת לשמוע עוד על השיעורים 💃';

const ContactSection = () => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, hsl(320 70% 50% / 0.06), hsl(175 60% 40% / 0.06), hsl(45 90% 55% / 0.06))',
        }}
      />
      <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-primary/10 blur-2xl animate-float" />
      <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-secondary/10 blur-2xl animate-float" style={{ animationDelay: '1.5s' }} />

      <div className="max-w-2xl mx-auto text-center relative">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 animate-fade-in opacity-0" style={{ animationFillMode: 'forwards' }}>
          <Heart className="h-7 w-7 text-primary" />
        </div>
        <h2 className="font-display text-4xl md:text-5xl text-foreground mb-5 animate-fade-in opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
          רוצה לשמוע עוד?
        </h2>
        <p className="text-muted-foreground text-lg mb-10 max-w-md mx-auto animate-fade-in opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          שאלות, התלבטויות, או סתם רוצה לומר שלום — כתבי לי בוואטסאפ!
        </p>
        <div className="animate-fade-in opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
          <Button
            asChild
            size="lg"
            className="bg-success hover:bg-success/90 text-success-foreground text-lg px-12 py-7 rounded-full font-bold shadow-xl hover-scale"
          >
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-6 w-6 ml-2" />
              דברי איתי בוואטסאפ
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;