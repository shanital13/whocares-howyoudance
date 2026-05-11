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
import studio1 from '@/assets/studio-1.jpg';
import studio2 from '@/assets/studio-2.jpg';
import studio3 from '@/assets/studio-3.jpg';

const WHATSAPP_NUMBER = '972526398428';
const WHATSAPP_MESSAGE = 'היי! אני מעוניינת לשמוע עוד ​';

const services: {
  id: string;
  title: string;
  tagline: string;
  image: string;
  tilt: string;
  description: string[];
}[] = [
  {
    id: 'classes-copenhagen',
    title: 'שיעורי מחול פרונטליים - קופנגן',
    tagline: 'בסטודיו בקופנהגן — מקום לנשום, לזוז ולהרגיש חופשיה.',
    image: studio1,
    tilt: '-rotate-2',
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
    image: studio2,
    tilt: 'rotate-1',
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
    image: studio3,
    tilt: '-rotate-1',
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
      <section id="services" className="relative py-24 md:py-32 px-6 overflow-hidden">
        {/* Very light teal wash — almost off-white, soft fade at edges */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-hoodie-teal/[0.06]"
          style={{
            maskImage:
              'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
          }}
        />

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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex flex-col items-center"
              >
                {/* Polaroid frame */}
                <button
                  type="button"
                  onClick={() => setOpenService(service)}
                  className={`group relative bg-white p-3 pb-14 shadow-[0_18px_40px_-15px_rgba(0,0,0,0.35)] transform ${service.tilt} transition-all duration-500 ease-out md:hover:rotate-0 md:hover:-translate-y-2 md:hover:scale-[1.03] md:hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.45)] w-full max-w-[300px] focus:outline-none focus:ring-2 focus:ring-hoodie-magenta/50`}
                  aria-label={service.title}
                >
                  {/* Tape accent */}
                  <span
                    aria-hidden="true"
                    className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-hoodie-yellow/40 rotate-[-4deg] shadow-sm"
                  />
                  <div className="relative w-full aspect-[4/5] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover block"
                      loading="lazy"
                    />
                    {/* Desktop hover overlay */}
                    <div className="hidden md:flex absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex-col justify-end text-right">
                      <h3 className="text-white font-display text-xl leading-tight mb-2">
                        {service.title}
                      </h3>
                      <p className="text-white/90 text-sm font-sans leading-relaxed">
                        {service.tagline}
                      </p>
                    </div>
                  </div>
                </button>

                {/* Mobile-only always-visible text */}
                <div className="md:hidden text-center mt-5 px-2">
                  <h3 className="text-foreground font-display text-xl leading-tight mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm font-sans leading-relaxed">
                    {service.tagline}
                  </p>
                </div>
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
