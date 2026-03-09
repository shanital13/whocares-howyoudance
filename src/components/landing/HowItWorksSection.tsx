import { UserPlus, MapPin, Music, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: UserPlus,
    title: 'נרשמות',
    description: 'בוחרות שיעור\nומשריינות מקום.',
    desktopPosition: 'md:right-[10%] md:top-[15%]',
    mobileOrder: 1,
  },
  {
    icon: MapPin,
    title: 'מגיעות',
    description: 'אין צורך בניסיון.\nפשוט באות.',
    desktopPosition: 'md:right-[40%] md:top-[55%]',
    mobileOrder: 2,
  },
  {
    icon: Music,
    title: 'רוקדות',
    description: 'מוזיקה, תנועה ושחרור.',
    desktopPosition: 'md:right-[72%] md:top-[18%]',
    mobileOrder: 3,
  },
];

const HowItWorksSection = () => {
  const scrollToClasses = () => {
    document.getElementById('classes')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="how-it-works" className="relative overflow-hidden bg-background px-6 py-20 md:py-28">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute left-[5%] top-[50%] h-80 w-80 rounded-full bg-secondary/8 blur-3xl" />
        <div className="absolute bottom-0 right-[30%] h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
      </div>

      {/* Subtle motion lines decoration */}
      <svg className="pointer-events-none absolute top-20 right-[15%] w-20 h-20 text-primary/15 hidden md:block" viewBox="0 0 100 100" fill="none">
        <path d="M20 80 Q50 30 80 60" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <svg className="pointer-events-none absolute bottom-32 left-[12%] w-16 h-16 text-secondary/15 hidden md:block" viewBox="0 0 100 100" fill="none">
        <path d="M30 20 Q60 50 40 80" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Title - NEHAMA font, broken into two lines */}
        <motion.div 
          className="mb-16 md:mb-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-nehama text-5xl md:text-7xl text-foreground leading-tight">
            איך זה
            <br />
            <span className="text-primary">עובד</span>
          </h2>
        </motion.div>

        {/* Desktop curved path layout */}
        <div className="relative hidden md:block" style={{ minHeight: '520px' }}>
          {/* Curved dance path SVG */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 1000 520"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            {/* Main dance trail - organic curve */}
            <path
              d="M 180 140 C 280 80, 350 320, 480 300 C 600 280, 680 140, 820 180"
              stroke="hsl(var(--secondary) / 0.2)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
            />
            
            {/* Curved arrow from step 1 to step 2 */}
            <motion.g
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <path
                d="M 240 200 C 290 260, 340 340, 420 320"
                stroke="hsl(245 100% 70%)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="12 8"
              />
              {/* Arrow head */}
              <path
                d="M 408 330 L 420 320 L 412 308"
                stroke="hsl(245 100% 70%)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.g>

            {/* Curved arrow from step 2 to step 3 */}
            <motion.g
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <path
                d="M 560 300 C 620 280, 700 200, 760 190"
                stroke="hsl(245 100% 70%)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="12 8"
              />
              {/* Arrow head */}
              <path
                d="M 750 202 L 760 190 L 748 182"
                stroke="hsl(245 100% 70%)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.g>

            {/* Small decorative dots along the path */}
            <circle cx="300" cy="160" r="4" fill="hsl(var(--primary) / 0.3)" />
            <circle cx="380" cy="280" r="3" fill="hsl(var(--secondary) / 0.4)" />
            <circle cx="600" cy="260" r="4" fill="hsl(var(--primary) / 0.3)" />
            <circle cx="700" cy="200" r="3" fill="hsl(var(--secondary) / 0.4)" />
          </svg>

          {/* Step bubbles - positioned along the curve */}
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.article
                key={step.title}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ scale: 1.08, y: -8 }}
                className={`absolute w-52 h-52 flex flex-col items-center justify-center rounded-full bg-peach p-6 text-center shadow-lg cursor-default transition-shadow duration-300 hover:shadow-2xl ${step.desktopPosition}`}
              >
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/15">
                  <Icon className="h-7 w-7 text-primary" strokeWidth={2.2} />
                </div>
                <h3 className="font-nehama text-2xl text-foreground mb-1">{step.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{step.description}</p>
              </motion.article>
            );
          })}
        </div>

        {/* Mobile vertical layout */}
        <div className="md:hidden flex flex-col items-center gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isLast = i === steps.length - 1;
            return (
              <div key={step.title} className="flex flex-col items-center">
                <motion.article
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="w-56 h-56 flex flex-col items-center justify-center rounded-full bg-peach p-6 text-center shadow-lg"
                >
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/15">
                    <Icon className="h-7 w-7 text-primary" strokeWidth={2.2} />
                  </div>
                  <h3 className="font-nehama text-2xl text-foreground mb-1">{step.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{step.description}</p>
                </motion.article>
                
                {/* Mobile curved arrow between steps */}
                {!isLast && (
                  <motion.svg
                    className="w-12 h-16 text-secondary my-2"
                    viewBox="0 0 50 70"
                    fill="none"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.1 + 0.2 }}
                  >
                    <path
                      d="M25 5 Q10 30 25 50 Q40 70 25 65"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray="8 6"
                      fill="none"
                    />
                    <path
                      d="M20 58 L25 65 L30 58"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </motion.svg>
                )}
              </div>
            );
          })}
        </div>

        {/* Scroll to classes button */}
        <motion.button
          onClick={scrollToClasses}
          className="group mx-auto mt-16 flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
          aria-label="גלול לשיעורים הקרובים"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <span className="font-body text-lg">לשיעורים הקרובים</span>
          <ChevronDown className="h-8 w-8 animate-float" strokeWidth={2.5} />
        </motion.button>
      </div>
    </section>
  );
};

export default HowItWorksSection;
