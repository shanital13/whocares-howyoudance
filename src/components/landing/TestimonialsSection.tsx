import { motion } from 'framer-motion';

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

const TestimonialsSection = () => (
  <section className="py-24 md:py-32 px-6 bg-background relative overflow-hidden">
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
        <div className="mx-auto mt-5 h-px w-24 bg-hoodie-magenta/40" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className={`${t.bg} p-8 rounded-sm text-center flex flex-col`}
          >
            <p className="text-white text-base md:text-lg leading-relaxed font-sans mb-6 flex-1">
              “{t.quote}”
            </p>
            <p className="text-white font-display text-xl">{t.name}</p>
            <p className="text-white/85 text-sm mt-1">{t.role}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
