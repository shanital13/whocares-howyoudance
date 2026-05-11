import { motion } from 'framer-motion';
import Squiggle from '@/components/decor/Squiggle';
import SunArc from '@/components/decor/SunArc';
import Sparkle from '@/components/decor/Sparkle';

const testimonials = [
  {
    quote: 'יוגב יצר בשבילי מרחב שלא הכרתי. סוף סוף יכולתי לרקוד בלי לשפוט את עצמי.',
    name: 'מיכל',
    role: 'משתתפת קבועה',
  },
  {
    quote: 'יצאתי מכל שיעור עם חיוך ענק ותחושה שאני שוב מתחברת לגוף שלי.',
    name: 'נועה',
    role: 'סדנת סוף שבוע',
  },
  {
    quote: 'האנרגיה, האהבה, הקלילות — הכל שם. ממליצה לכל אישה לבוא לטעום.',
    name: 'שירה',
    role: 'ליווי אונליין',
  },
];

const TestimonialsSection = () => (
  <section className="py-20 md:py-28 px-6 bg-background relative overflow-hidden paper-grain">
    <SunArc
      color="hsl(var(--hoodie-yellow))"
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] opacity-[0.12]"
    />
    <Sparkle color="hsl(var(--hoodie-coral))" className="absolute top-12 left-10 w-4 h-4 opacity-70" />
    <Sparkle color="hsl(var(--hoodie-teal))" className="absolute bottom-16 right-12 w-5 h-5 opacity-70" />

    <div className="max-w-5xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl text-foreground font-display">מה אומרות עליי</h2>
        <Squiggle color="hsl(var(--hoodie-coral))" className="mx-auto mt-3 w-32 h-2" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="text-center px-2"
          >
            <Squiggle color="hsl(var(--hoodie-coral))" className="mx-auto mb-6 w-16 h-2 opacity-70" />
            <p className="text-foreground text-base md:text-lg leading-relaxed font-sans mb-6">
              “{t.quote}”
            </p>
            <p className="text-hoodie-coral font-display text-lg">{t.name}</p>
            <p className="text-muted-foreground text-sm mt-1">{t.role}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
