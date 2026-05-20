import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import CarouselDots from '@/components/decor/CarouselDots';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import studio1 from '@/assets/studio-1.jpg';
import studio2 from '@/assets/studio-2.jpg';
import studio3 from '@/assets/studio-3.jpg';
import WeeklyScheduleOverlay from './WeeklyScheduleOverlay';
import RegistrationDialog from './RegistrationDialog';
import type { DanceClass } from '@/lib/types';

const WHATSAPP_NUMBER = '972526398428';
const WHATSAPP_MESSAGE = 'היי! אני מעוניינת לשמוע עוד ​';

const COPENHAGEN_ID = 'classes-copenhagen';

type Service = {
  id: string;
  title: string;
  tagline: string;
  image: string;
  tilt: string;
  description: string[];
};

const services: Service[] = [
  {
    id: COPENHAGEN_ID,
    title: 'שיעורי מחול פרונטליים - קופנגן',
    tagline: 'שיעורים באי הקסום הזה באווירה סופר שונה ומשחררת.',
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
    tagline: 'חוויות ריקוד מעמיקות — סדנאות וריטריטים.',
    image: studio2,
    tilt: 'rotate-1',
    description: [
      'חוויות ריקוד מעמיקות — סדנאות וריטריטים.',
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

const PolaroidCard = ({
  service,
  onCardClick,
  isActive,
  inCarousel,
  onBookSchedule,
  isMobile,
  expanded,
}: {
  service: Service;
  onCardClick: () => void;
  isActive?: boolean;
  inCarousel?: boolean;
  onBookSchedule: (dc: DanceClass) => void;
  isMobile: boolean;
  expanded: boolean;
}) => {
  const isCopenhagen = service.id === COPENHAGEN_ID;
  return (
    <div
      className={cn(
        'flex flex-col items-center transition-transform duration-300',
        inCarousel && (isActive ? 'scale-[1.05]' : 'scale-[0.92] opacity-80'),
      )}
    >
      <button
        type="button"
        onClick={onCardClick}
        className={cn(
          'group relative bg-white p-3 pb-14 shadow-[0_18px_40px_-15px_rgba(0,0,0,0.35)] transform transition-all duration-500 ease-out md:hover:rotate-0 md:hover:-translate-y-2 md:hover:scale-[1.03] md:hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.45)] w-full max-w-[300px] focus:outline-none focus:ring-2 focus:ring-hoodie-magenta/50',
          service.tilt,
        )}
        aria-label={service.title}
      >
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
          {isCopenhagen ? (
            <div className="hidden md:block absolute inset-0">
              <WeeklyScheduleOverlay variant="desktop-overlay" onBook={(it) => onBookSchedule(it.danceClass)} />
            </div>
          ) : (
            <div className="hidden md:flex absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex-col justify-end text-right">
              <h3 className="text-white font-display text-xl leading-tight mb-2">
                {service.title}
              </h3>
              <p className="text-white/90 text-sm font-sans leading-relaxed">
                {service.tagline}
              </p>
            </div>
          )}
        </div>
      </button>

      <div className="md:hidden text-center mt-5 px-2">
        <h3 className="text-foreground font-display text-xl leading-tight mb-2">
          {service.title}
        </h3>
        <p className="text-muted-foreground text-sm font-sans leading-relaxed">
          {service.tagline}
        </p>
      </div>

      {isCopenhagen && isMobile && (
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="mobile-schedule"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-[300px] overflow-hidden"
            >
              <WeeklyScheduleOverlay
                variant="mobile-expanded"
                onBook={(it) => onBookSchedule(it.danceClass)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

const ServicesSection = () => {
  const [openService, setOpenService] = useState<Service | null>(null);
  const [bookingClass, setBookingClass] = useState<DanceClass | null>(null);
  const [mobileScheduleOpen, setMobileScheduleOpen] = useState(false);
  const isMobile = useIsMobile();
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelected(api.selectedScrollSnap());
    onSelect();
    api.on('select', onSelect);
    api.on('reInit', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  const handleCardClick = (service: Service) => {
    if (service.id === COPENHAGEN_ID) {
      if (isMobile) {
        setMobileScheduleOpen((v) => !v);
        return;
      }
      // On desktop, hover already shows schedule; click still opens the description dialog.
    }
    setOpenService(service);
  };

  return (
    <>
      <section id="services" className="relative py-20 md:py-28 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-hoodie-coral mb-3 font-sans">
              ​
            </p>
            <h2 className="text-4xl md:text-5xl text-foreground font-display">
              אז מה מחכה לך כאן?
            </h2>
          </motion.div>

          {isMobile ? (
            <>
              <Carousel
                setApi={setApi}
                opts={{ align: 'center', loop: false, containScroll: 'trimSnaps', direction: 'rtl' }}
                className="-mx-6 touch-pan-y"
              >
                <CarouselContent className="px-[7.5%]">
                  {services.map((service, i) => (
                    <CarouselItem key={service.id} className="basis-[85%]">
                      <PolaroidCard
                        service={service}
                        onCardClick={() => handleCardClick(service)}
                        isActive={selected === i}
                        inCarousel
                        onBookSchedule={(dc) => setBookingClass(dc)}
                        isMobile={isMobile}
                        expanded={mobileScheduleOpen && service.id === COPENHAGEN_ID}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
              <CarouselDots
                count={services.length}
                active={selected}
                onSelect={(i) => api?.scrollTo(i)}
              />
            </>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
              {services.map((service, i) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <PolaroidCard
                    service={service}
                    onCardClick={() => handleCardClick(service)}
                    onBookSchedule={(dc) => setBookingClass(dc)}
                    isMobile={false}
                    expanded={false}
                  />
                </motion.div>
              ))}
            </div>
          )}
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

      <RegistrationDialog
        danceClass={bookingClass}
        onClose={() => setBookingClass(null)}
        successTitle="המקום שלך שמור! 🎉"
        successMessage="המקום שמור — נתראה בסטודיו 💛 אישור נשלח לכתובת המייל שלך."
      />
    </>
  );
};

export default ServicesSection;
