import { motion } from 'framer-motion';
import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const WHATSAPP_NUMBER = '972501234567';
const WHATSAPP_MESSAGE = 'היי! אני מעוניינת לשמוע עוד ​';

const services: {
  id: string;
  title: string;
  tagline: string;
  cardBg: string;
  imageGradient: string;
  description: string[];
}[] = [
  {
    id: 'classes-copenhagen',
    title: 'שיעורי מחול פרונטליים - קופנגן',
    tagline: 'בסטודיו בקופנהגן — מקום לנשום, לזוז ולהרגיש חופשיה.',
    cardBg: 'bg-hoodie-coral',
    imageGradient: 'from-hoodie-magenta to-hoodie-orange',
    description: [
      'שיעורי ריקוד וזוז בסטודיו בקופנהגן — מקום שבו אפשר לנשום, לזוז ולהרגיש חופשיה.',
      'השיעורים מתאימים לכל רמה, עם דגש על הנאה ותנועה חופשית.',
      'בואי לגלות את הגוף שלך מחדש דרך ריקוד.',
    ],
  },
  {
    id: 'online-classes',
    title: 'ליווי אונליין',
    tagline: 'רוקדות מכל מקום בעולם — מהסלון, מהחדר, מהגינה.',
    cardBg: 'bg-hoodie-teal',
    imageGradient: 'from-hoodie-teal to-hoodie-yellow',
    description: [
      'רוקדות מכל מקום בעולם — מהסלון, מהחדר, מהגינה.',
      'שיעורים חיים בזום עם אנרגיה של סטודיו אמיתי.',
      'את צריכה רק מקום קטן, בגדים נוחים ורצון לזוז.',
    ],
  },
  {
    id: 'workshops',
    title: 'סדנאות וריטריטים',
    tagline: 'חוויות ריקוד מעמיקות — סדנאות וריטריטים של סוף שבוע.',
    cardBg: 'bg-hoodie-magenta',
    imageGradient: 'from-hoodie-yellow to-hoodie-coral',
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
      <section id="services" className="py-24 md:py-32 px-6 bg-background relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-hoodie-coral mb-3 font-sans">
              Services
            </p>
            <h2 className="text-4xl md:text-5xl text-foreground font-display">
              אז מה מחכה לך כאן?
            </h2>
            <div className="mx-auto mt-5 h-px w-24 bg-hoodie-magenta/40" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                className={`${service.cardBg} p-8 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col text-center rounded-sm`}
              >
                <div
                  className={`w-full aspect-[3/4] bg-gradient-to-br ${service.imageGradient} mb-6 border-2 border-white`}
                />
                <h3 className="text-2xl md:text-3xl text-white font-display mb-3 leading-snug">
                  {service.title}
                </h3>
                <p className="text-white/90 text-sm md:text-base font-sans leading-relaxed">
                  {service.tagline}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={!!openService} onOpenChange={(open) => !open && setOpenService(null)}>
        <DialogContent className="w-[93vw] max-w-lg max-h-[85vh] overflow-y-auto rounded-sm">
          <DialogHeader>
            <DialogTitle className="text-2xl md:text-3xl text-foreground text-center font-display">
              {openService?.title}
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
              className="btn-rect gap-2 px-8 py-3.5 bg-hoodie-coral text-white text-base"
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
