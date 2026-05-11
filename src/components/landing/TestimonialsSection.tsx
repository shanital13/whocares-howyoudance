import { motion } from 'framer-motion';

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
  <section className="py-20 md:py-28 px-6 bg-background relative overflow-hidden">
    <div className="max-w-5xl mx-auto relative z-10">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl text-foreground text-center mb-16 font-display"
      >
        מה אומרות עליי
      </motion.h2>

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
            <div className="mx-auto mb-6 h-px w-12 bg-hoodie-coral/50" />
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
