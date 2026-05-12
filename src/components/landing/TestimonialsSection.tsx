import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import CarouselDots from '@/components/decor/CarouselDots';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    quote: 'יוגב יצר בשבילי מרחב שלא הכרתי. סוף סוף יכולתי לרקוד בלי לשפוט את עצמי.',
    name: 'מיכל',
    role: 'משתתפת קבועה',
    bg: 'bg-hoodie-orange',
  },
  {
    quote: 'יצאתי מכל שיעור עם חיוך ענק ותחושה שאני שוב מתחברת לגוף שלי.',
    name: 'נועה',
    role: 'סדנת סוף שבוע',
    bg: 'bg-hoodie-yellow',
  },
  {
    quote: 'האנרגיה, האהבה, הקלילות — הכל שם. ממליצה לכל אישה לבוא לטעום.',
    name: 'שירה',
    role: 'ליווי אונליין',
    bg: 'bg-hoodie-teal',
  },
];

const TestimonialCard = ({
  t,
  isActive,
  inCarousel,
}: {
  t: (typeof testimonials)[number];
  isActive?: boolean;
  inCarousel?: boolean;
}) => (
  <div
    className={cn(
      `${t.bg} p-8 rounded-sm text-center flex flex-col h-full transition-transform duration-300`,
      inCarousel && (isActive ? 'scale-[1.05]' : 'scale-[0.92] opacity-80'),
    )}
  >
    <p className="text-white text-base md:text-lg leading-relaxed font-sans mb-6 flex-1">
      “{t.quote}”
    </p>
    <p className="text-white font-display text-xl">{t.name}</p>
    <p className="text-white/85 text-sm mt-1">{t.role}</p>
  </div>
);

const TestimonialsSection = () => {
  const isMobile = useIsMobile();
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);

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

  return (
    <section className="py-20 md:py-28 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-hoodie-coral mb-3 font-sans">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl text-foreground font-display">
            מה אומרות עליי
          </h2>
        </motion.div>

        {isMobile ? (
          <>
            <Carousel
              setApi={setApi}
              opts={{ align: 'center', loop: false, containScroll: 'trimSnaps' }}
              className="-mx-6"
            >
              <CarouselContent className="px-[7.5%]">
                {testimonials.map((t, i) => (
                  <CarouselItem key={i} className="basis-[85%]">
                    <TestimonialCard t={t} isActive={selected === i} inCarousel />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <CarouselDots
              count={testimonials.length}
              active={selected}
              onSelect={(i) => api?.scrollTo(i)}
            />
          </>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <TestimonialCard t={t} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
