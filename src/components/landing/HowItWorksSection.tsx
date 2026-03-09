import { UserPlus, MapPin, Music, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: UserPlus,
    title: 'נרשמות',
    description: 'בוחרות שיעור ומשריינות מקום.',
  },
  {
    icon: MapPin,
    title: 'מגיעות',
    description: 'בלי ניסיון. פשוט באות.',
  },
  {
    icon: Music,
    title: 'רוקדות',
    description: 'שעה של מוזיקה, תנועה ושחרור.',
  },
];

const HowItWorksSection = () => {
  const scrollToClasses = () => {
    document.getElementById('classes')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="how-it-works" className="py-24 px-6 bg-background relative overflow-hidden">
      {/* Organic background shapes */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-20 right-[10%] w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-[15%] w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Title */}
        <h2 className="text-center mb-20 text-foreground">איך זה עובד</h2>

        {/* Flow Path Container */}
        <div className="relative py-12">
          {/* Curved connecting line - SVG path */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none hidden md:block" 
            style={{ top: '50%', transform: 'translateY(-50%)' }}
          >
            <path
              d="M 15% 50% Q 35% 30%, 42% 50% T 85% 50%"
              stroke="hsl(var(--primary))"
              strokeWidth="3"
              fill="none"
              strokeDasharray="8 8"
              opacity="0.3"
              strokeLinecap="round"
            />
          </svg>

          {/* Steps Bubbles */}
          <div className="grid md:grid-cols-3 gap-12 md:gap-8 relative">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const verticalOffset = i === 1 ? 'md:-translate-y-8' : i === 2 ? 'md:translate-y-4' : '';
              
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: 0.2 + i * 0.15,
                    duration: 0.6,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ scale: 1.08, y: -8 }}
                  className={`flex flex-col items-center text-center ${verticalOffset}`}
                >
                  <div 
                    className="w-48 h-48 rounded-full bg-peach flex flex-col items-center justify-center p-8 shadow-lg hover:shadow-xl transition-shadow relative"
                    style={{
                      boxShadow: '0 10px 40px rgba(255, 92, 122, 0.15)',
                    }}
                  >
                    {/* Icon */}
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                      <Icon className="h-8 w-8 text-primary" strokeWidth={2.5} />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-display font-bold text-foreground mb-2">
                      {step.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Arrow to next section */}
        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          onClick={scrollToClasses}
          className="flex flex-col items-center gap-3 text-muted-foreground hover:text-primary transition-colors mx-auto group mt-16"
        >
          <span className="text-lg font-body font-medium">לשיעורים הקרובים</span>
          <ChevronDown 
            className="h-8 w-8 group-hover:translate-y-2 transition-transform animate-float" 
            strokeWidth={2.5}
          />
        </motion.button>
      </div>
    </section>
  );
};

export default HowItWorksSection;
