import { motion } from 'framer-motion';
import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const WHATSAPP_NUMBER = '972501234567';
const WHATSAPP_MESSAGE = 'היי! אני מעוניינת לשמוע עוד 💃';

const services = [
  {
    id: 'classes-copenhagen',
    title: 'שיעורי מחול פרונטליים - קופנגן',
    emoji: '💃',
    gradient: 'from-[hsl(280,70%,72%)] to-[hsl(340,100%,65%)]',
    border: 'border-[hsl(280,70%,72%)]',
    description: [
      'שיעורי ריקוד וזוז בסטודיו בקופנהגן — מקום שבו אפשר לנשום, לזוז ולהרגיש חופשיה.',
      'השיעורים מתאימים לכל רמה, עם דגש על הנאה ותנועה חופשית.',
      'בואי לגלות את הגוף שלך מחדש דרך ריקוד.',
    ],
  },
  {
    id: 'online-classes',
    title: 'ליווי אונליין',
    emoji: '​',
    gradient: 'from-[hsl(175,90%,55%)] to-[hsl(145,70%,55%)]',
    border: 'border-[hsl(175,90%,55%)]',
    description: [
      'רוקדות מכל מקום בעולם — מהסלון, מהחדר, מהגינה.',
      'שיעורים חיים בזום עם אנרגיה של סטודיו אמיתי.',
      'את צריכה רק מקום קטן, בגדים נוחים ורצון לזוז.',
    ],
  },
  {
    id: 'workshops',
    title: 'סדנאות וריטריטים',
    emoji: '✨',
    gradient: 'from-[hsl(340,100%,65%)] to-[hsl(14,90%,65%)]',
    border: 'border-[hsl(340,100%,65%)]',
    description: [
      'חוויות ריקוד מעמיקות — סדנאות של כמה שעות או ריטריטים של סוף שבוע.',
      'זמן לצלול פנימה, לגלות שכבות חדשות בתנועה ולפגוש נשים מדהימות.',
      'כל סדנה היא מסע קטן.',
    ],
  },
];

const ServicesSection = () => {
  const [openService, setOpenService] = useState<typeof services[0] | null>(null);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <>
      <section id="services" className="py-20 md:py-28 px-6 bg-background relative overflow-hidden">
        {/* Subtle neon glow blobs */}
        <div className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] rounded-full bg-neon-purple/10 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[35vw] h-[35vw] max-w-[350px] max-h-[350px] rounded-full bg-neon-pink/10 blur-[100px]" />

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl text-foreground text-center mb-16 font-display"
          >
            אז מה מחכה לך כאן?
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                onClick={() => setOpenService(service)}
                role="button"
                tabIndex={0}
                className="rounded-3xl p-8 md:p-10 min-h-[220px] sm:min-h-[250px] flex-col text-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl group bg-gradient-to-br from-[hsl(280,60%,88%)] to-[hsl(340,70%,85%)] border-white/20 font-extralight border-2 flex items-center justify-start"
              >
                <span className="text-5xl mb-4 group-hover:scale-110 transition-transform">{service.emoji}</span>
                <span className="text-xl text-white leading-snug drop-shadow-md font-sans md:text-4xl font-semibold">
                  {service.title}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      <Dialog open={!!openService} onOpenChange={(open) => !open && setOpenService(null)}>
        <DialogContent className="w-[93vw] max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl md:text-3xl text-foreground text-center">
              {openService?.emoji} {openService?.title}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="sr-only">
            פרטים על {openService?.title}
          </DialogDescription>
          <div className="space-y-4 text-muted-foreground text-base leading-relaxed text-center mt-4">
            {openService?.description.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-primary-foreground text-base shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <MessageCircle className="h-5 w-5" />
              רוצה לשמוע עוד?
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ServicesSection;
