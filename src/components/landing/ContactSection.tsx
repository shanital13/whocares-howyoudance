import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '972501234567'; // Replace with real number
const WHATSAPP_MESSAGE = 'היי! אני מעוניינת לשמוע עוד על השיעורים 💃';

const ContactSection = () => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <section id="contact" className="py-20 px-6 bg-card">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-display text-4xl text-foreground mb-4">רוצה לשמוע עוד?</h2>
        <p className="text-muted-foreground text-lg mb-8">
          שאלות, התלבטויות, או סתם רוצה לומר שלום — כתבי לי בוואטסאפ!
        </p>
        <Button
          asChild
          size="lg"
          className="bg-success hover:bg-success/90 text-success-foreground text-lg px-10 py-6 rounded-full font-bold shadow-xl"
        >
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-6 w-6 ml-2" />
            דברי איתי בוואטסאפ
          </a>
        </Button>
      </div>
    </section>
  );
};

export default ContactSection;
