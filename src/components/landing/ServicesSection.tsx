import { motion } from 'framer-motion';

const services = [
  {
    id: 'classes-copenhagen',
    title: 'השיעורים שלנו בקופנהגן',
    color: 'bg-neon-purple',
    description: 'שיעורי ריקוד וזוז בסטודיו בקופנהגן',
  },
  {
    id: 'online-classes',
    title: 'שיעורים בONLINE',
    color: 'bg-neon-pink/70',
    description: 'רוקדות מכל מקום בעולם',
  },
  {
    id: 'workshops',
    title: 'סדנאות וריטריטים',
    color: 'bg-neon-coral',
    description: 'חוויות ריקוד מעמיקות',
  },
];

const ServicesSection = () => {
  const scrollToDetail = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-20 md:py-28 px-6 bg-background relative overflow-hidden">
      {/* Wavy decorative lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]" viewBox="0 0 1200 600" fill="none">
        <path d="M -100 200 Q 300 100, 600 250 T 1300 200" stroke="hsl(var(--neon-yellow))" strokeWidth="3" />
        <path d="M -50 350 Q 250 250, 550 380 T 1200 320" stroke="hsl(var(--neon-pink))" strokeWidth="2" />
      </svg>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display text-4xl md:text-5xl text-foreground text-center mb-16"
        >
          אז מה מחכה לך כאן?
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, i) => (
            <motion.button
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              onClick={() => scrollToDetail(service.id)}
              className={`${service.color} rounded-3xl p-8 md:p-10 aspect-square flex items-center justify-center text-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl group`}
            >
              <span className="font-display text-xl md:text-2xl text-foreground leading-snug group-hover:scale-105 transition-transform">
                {service.title}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
