import { Calendar, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockClasses } from '@/lib/mock-data';
import { type DanceClass } from '@/lib/types';
import { useState } from 'react';
import { motion } from 'framer-motion';
import RegistrationDialog from './RegistrationDialog';

// Card variants for visual diversity
const cardVariants = [
  { 
    rotation: 'rotate-[-1.5deg]',
    bgGradient: 'bg-gradient-to-br from-primary/20 to-primary/5',
    hoverRotation: 'hover:rotate-0'
  },
  { 
    rotation: 'rotate-[1deg]',
    bgGradient: 'bg-gradient-to-br from-secondary/20 to-secondary/5',
    hoverRotation: 'hover:rotate-0'
  },
  { 
    rotation: 'rotate-[-0.5deg]',
    bgGradient: 'bg-gradient-to-br from-peach to-primary/10',
    hoverRotation: 'hover:rotate-0'
  },
  { 
    rotation: 'rotate-[2deg]',
    bgGradient: 'bg-gradient-to-br from-secondary/15 to-peach',
    hoverRotation: 'hover:rotate-0'
  },
];

const ClassesSection = () => {
  const [selectedClass, setSelectedClass] = useState<DanceClass | null>(null);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('he-IL', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  };

  return (
    <section id="classes" className="py-24 px-6 bg-background relative overflow-hidden">
      {/* Organic background shapes */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-40 left-[5%] w-96 h-96 bg-peach blur-3xl rounded-full" />
        <div className="absolute bottom-20 right-[10%] w-80 h-80 bg-secondary/20 blur-3xl rounded-full" />
        <div className="absolute top-[60%] left-[40%] w-64 h-64 bg-primary/20 blur-3xl rounded-full" />
      </div>

      {/* Curved decorative lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
        <path
          d="M -100 200 Q 300 100, 600 250 T 1200 300"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M -50 400 Q 400 350, 700 500 T 1300 450"
          stroke="hsl(var(--secondary))"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Title */}
        <h2 className="text-center mb-16 text-foreground">השיעורים הקרובים</h2>

        {/* Classes Grid - Asymmetrical Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {mockClasses.map((cls, i) => {
            const variant = cardVariants[i % cardVariants.length];
            
            return (
              <motion.div
                key={cls.id}
                initial={{ opacity: 0, y: 40, rotate: 0 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  rotate: parseFloat(variant.rotation.match(/-?\d+\.?\d*/)?.[0] || '0')
                }}
                viewport={{ once: true }}
                transition={{ 
                  delay: 0.1 + (i * 0.1),
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -12, 
                  rotate: 0,
                  scale: 1.02
                }}
                className={`
                  group relative
                  ${variant.rotation}
                  ${variant.hoverRotation}
                  transition-all duration-300
                `}
                style={{
                  transformOrigin: 'center center'
                }}
              >
                <div 
                  className={`
                    ${variant.bgGradient}
                    bg-card
                    rounded-[24px] 
                    p-8
                    shadow-lg
                    group-hover:shadow-2xl
                    transition-shadow
                    duration-300
                    border border-border/50
                    backdrop-blur-sm
                    relative
                    overflow-hidden
                  `}
                  style={{
                    boxShadow: '0 15px 50px rgba(0, 0, 0, 0.08)'
                  }}
                >
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-bl-full" />
                  
                  {/* Class name - Large and bold */}
                  <div className="mb-6 relative z-10">
                    <h3 className="text-foreground leading-tight text-2xl">
                      {cls.name}
                    </h3>
                  </div>

                  {/* Class details with playful icons */}
                  <div className="space-y-4 mb-8 relative z-10">
                    <div className="flex items-start gap-3 text-muted-foreground">
                      <Calendar className="h-5 w-5 text-primary shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className="text-base leading-relaxed">{formatDate(cls.date)}</span>
                    </div>
                    <div className="flex items-start gap-3 text-muted-foreground">
                      <Clock className="h-5 w-5 text-secondary shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className="text-base leading-relaxed">{cls.time}</span>
                    </div>
                    <div className="flex items-start gap-3 text-muted-foreground">
                      <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className="text-base leading-relaxed">{cls.location}</span>
                    </div>
                  </div>

                  {/* Playful pill-shaped button */}
                  <Button
                    className="
                      w-full 
                      bg-primary 
                      text-primary-foreground 
                      hover:bg-primary/90 
                      rounded-full 
                      font-medium 
                      text-lg
                      py-6
                      transition-all 
                      hover:scale-105
                      shadow-md
                      hover:shadow-lg
                      relative z-10
                    "
                    onClick={() => setSelectedClass(cls)}
                  >
                    נרשמת?
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <RegistrationDialog
        danceClass={selectedClass}
        onClose={() => setSelectedClass(null)}
      />
    </section>
  );
};

export default ClassesSection;
