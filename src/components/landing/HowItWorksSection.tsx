import { UserPlus, MapPin, Music, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: UserPlus,
    title: 'נרשמות',
    description: 'בוחרות שיעור ומשריינות מקום.',
    position: 'md:right-[8%] md:top-[8%] right-1/2 translate-x-1/2 md:translate-x-0',
  },
  {
    icon: MapPin,
    title: 'מגיעות',
    description: 'אין צורך בניסיון.',
    position: 'md:right-[38%] md:top-[42%] right-1/2 translate-x-1/2 md:translate-x-0',
  },
  {
    icon: Music,
    title: 'רוקדות',
    description: 'מוזיקה, תנועה ושחרור.',
    position: 'md:right-[70%] md:top-[16%] right-1/2 translate-x-1/2 md:translate-x-0',
  },
];

const footsteps = [
  { top: '16%', right: '14%', rotate: '-16deg', tone: 'primary' },
  { top: '26%', right: '24%', rotate: '12deg', tone: 'secondary' },
  { top: '40%', right: '34%', rotate: '-14deg', tone: 'primary' },
  { top: '52%', right: '44%', rotate: '14deg', tone: 'secondary' },
  { top: '36%', right: '56%', rotate: '-10deg', tone: 'primary' },
  { top: '24%', right: '68%', rotate: '16deg', tone: 'secondary' },
  { top: '18%', right: '80%', rotate: '-12deg', tone: 'primary' },
];

const FootstepMark = ({ tone }: { tone: 'primary' | 'secondary' }) => {
  const toneClass = tone === 'primary' ? 'bg-primary/35' : 'bg-secondary/35';

  return (
    <div className="flex items-end gap-2 animate-fade-in">
      <div className={`h-9 w-4 rounded-full ${toneClass}`} />
      <div className={`h-11 w-4 rounded-full ${toneClass}`} />
    </div>
  );
};

const HowItWorksSection = () => {
  const scrollToClasses = () => {
    document.getElementById('classes')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="how-it-works" className="relative overflow-hidden bg-background px-6 py-24 md:py-28">
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute -right-10 top-12 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute left-[8%] top-[42%] h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute bottom-10 right-[35%] h-56 w-56 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <h2 className="mb-16 text-center text-5xl md:text-6xl text-foreground">איך זה עובד</h2>

        <div className="relative min-h-[620px] md:min-h-[460px]">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 1000 460"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M 920 92 C 810 20, 690 250, 560 212 C 420 172, 325 365, 190 160"
              stroke="hsl(var(--secondary))"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="4 14"
              opacity="0.26"
            />
            <path
              d="M 900 112 C 782 44, 676 258, 540 228 C 404 198, 302 380, 172 182"
              stroke="hsl(var(--primary))"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              opacity="0.32"
            />
          </svg>

          {footsteps.map((step, index) => (
            <motion.div
              key={`${step.top}-${step.right}`}
              className="absolute"
              style={{ top: step.top, right: step.right, transform: `rotate(${step.rotate})` }}
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.12, ease: 'easeInOut' }}
            >
              <FootstepMark tone={step.tone as 'primary' | 'secondary'} />
            </motion.div>
          ))}

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.article
                key={step.title}
                initial={{ opacity: 0, y: 20, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.14 }}
                whileHover={{ scale: 1.07, y: -6 }}
                className={`absolute w-56 -translate-x-1/2 rounded-full bg-peach p-7 text-center shadow-lg transition-all hover:shadow-2xl ${step.position}`}
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/20">
                  <Icon className="h-7 w-7 text-primary" strokeWidth={2.4} />
                </div>
                <h3 className="mb-1 text-2xl text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.article>
            );
          })}
        </div>

        <button
          onClick={scrollToClasses}
          className="group mx-auto mt-12 flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
          aria-label="גלול לשיעורים הקרובים"
        >
          <span className="font-body text-lg">לשיעורים הקרובים</span>
          <ChevronDown className="h-8 w-8 animate-float" strokeWidth={2.5} />
        </button>
      </div>
    </section>
  );
};

export default HowItWorksSection;
