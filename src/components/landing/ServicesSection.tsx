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
import WavyFrame from '@/components/decor/WavyFrame';
import TropicalLeaf from '@/components/decor/TropicalLeaf';
import SunArc from '@/components/decor/SunArc';
import Coconut from '@/components/decor/Coconut';
import Sparkle from '@/components/decor/Sparkle';
import Squiggle from '@/components/decor/Squiggle';

const WHATSAPP_NUMBER = '972501234567';
const WHATSAPP_MESSAGE = 'היי! אני מעוניינת לשמוע עוד ​';

type Decor = 'leaf' | 'sun' | 'palm';

const services: {
  id: string;
  title: string;
  tagline: string;
  cardBg: string;
  borderColor: string;
  imageGradient: string;
  wavyBg: string;
  pebble: string;
  decor: Decor;
  decorColor: string;
  description: string[];
}[] = [
  {
    id: 'classes-copenhagen',
    title: 'שיעורי מחול פרונטליים - קופנגן',
    tagline: 'בסטודיו בקופנהגן — מקום לנשום, לזוז ולהרגיש חופשיה.',
    cardBg: 'bg-hoodie-coral/15',
    borderColor: 'border-hoodie-coral/40',
    imageGradient: 'from-hoodie-coral/60 to-hoodie-orange/40',
    wavyBg: 'bg-hoodie-coral/40',
    pebble: 'pebble-1',
    decor: 'leaf',
    decorColor: 'hsl(var(--hoodie-teal))',
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
    cardBg: 'bg-hoodie-teal/15',
    borderColor: 'border-hoodie-teal/40',
    imageGradient: 'from-hoodie-teal/60 to-hoodie-yellow/40',
    wavyBg: 'bg-hoodie-teal/40',
    pebble: 'pebble-2',
    decor: 'sun',
    decorColor: 'hsl(var(--hoodie-yellow))',
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
    cardBg: 'bg-hoodie-yellow/20',
    borderColor: 'border-hoodie-yellow/50',
    imageGradient: 'from-hoodie-yellow/70 to-hoodie-magenta/40',
    wavyBg: 'bg-hoodie-yellow/50',
    pebble: 'pebble-3',
    decor: 'palm',
    decorColor: 'hsl(var(--hoodie-magenta))',
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
        {/* Faint coconut silhouettes in corners */}
        <Coconut
          color="hsl(var(--hoodie-teal))"
          className="absolute top-10 -right-10 w-40 h-60 md:w-52 md:h-80 opacity-[0.08]"
        />
        <Coconut
          color="hsl(var(--hoodie-orange))"
          className="absolute bottom-10 -left-10 w-40 h-60 md:w-52 md:h-80 opacity-[0.08] -scale-x-100"
        />
        <Sparkle color="hsl(var(--hoodie-coral))" className="absolute top-20 left-1/4 w-4 h-4 opacity-70" />
        <Sparkle color="hsl(var(--hoodie-yellow))" className="absolute bottom-24 right-1/4 w-5 h-5 opacity-70" />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl text-foreground font-display inline-block">
              אז מה מחכה לך כאן?
            </h2>
            <Squiggle color="hsl(var(--hoodie-coral))" className="mx-auto mt-3 w-32 h-2" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10">
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
                className={`relative ${service.pebble} ${service.cardBg} ${service.borderColor} border-2 p-6 md:p-7 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:rotate-[0.5deg] hover:shadow-xl flex flex-col text-center`}
              >
                {/* Layered decor overlapping image top */}
                <div className="absolute -top-6 -right-4 w-16 h-16 md:w-20 md:h-20 z-20 drop-shadow-md">
                  {service.decor === 'leaf' && (
                    <TropicalLeaf color={service.decorColor} variant="monstera" className="w-full h-full rotate-12" />
                  )}
                  {service.decor === 'palm' && (
                    <TropicalLeaf color={service.decorColor} variant="palm" className="w-full h-full -rotate-12" />
                  )}
                  {service.decor === 'sun' && <SunArc color={service.decorColor} className="w-full h-full" />}
                </div>

                <div className="mb-5 relative">
                  <WavyFrame bgColor={service.wavyBg} rotate={i % 2 === 0 ? -3 : 3}>
                    <div
                      className={`w-full aspect-[3/4] bg-gradient-to-br ${service.imageGradient}`}
                    />
                  </WavyFrame>
                </div>
                <h3 className="text-xl md:text-2xl text-foreground font-display mb-2 leading-snug">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base font-sans leading-relaxed">
                  {service.tagline}
                </p>
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
              className="bubble-btn inline-flex items-center gap-2 px-8 py-3.5 bg-hoodie-coral text-white text-base hover:scale-105"
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
