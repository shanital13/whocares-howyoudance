import { MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type DanceClass } from '@/lib/types';
import { motion } from 'framer-motion';

interface EventCardProps {
  danceClass: DanceClass;
  variant: number;
  onRegister: () => void;
}

// Poster-style card variants with different colors and rotations
const cardStyles = [
  { 
    bg: 'bg-[hsl(351,100%,68%)]', // Coral pink
    rotation: -1.5,
    buttonBg: 'bg-foreground',
    buttonText: 'text-background',
  },
  { 
    bg: 'bg-[hsl(245,100%,70%)]', // Soft purple
    rotation: 1,
    buttonBg: 'bg-background',
    buttonText: 'text-foreground',
  },
  { 
    bg: 'bg-peach', // Peach
    rotation: -0.5,
    buttonBg: 'bg-primary',
    buttonText: 'text-primary-foreground',
  },
  { 
    bg: 'bg-[hsl(48,100%,88%)]', // Light yellow
    rotation: 2,
    buttonBg: 'bg-foreground',
    buttonText: 'text-background',
  },
];

// Badge options
const badges = ['חדש', 'כמעט מלא', null, 'אחרונים'];

const EventCard = ({ danceClass, variant, onRegister }: EventCardProps) => {
  const style = cardStyles[variant % cardStyles.length];
  const badge = badges[variant % badges.length];
  
  const formatDay = (date: string) => {
    return new Date(date).toLocaleDateString('he-IL', {
      weekday: 'long',
    });
  };

  // Extract location name (short version)
  const shortLocation = danceClass.location.split(',')[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: 0 }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        rotate: style.rotation
      }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        y: -16, 
        rotate: 0,
        scale: 1.03,
      }}
      className="cursor-pointer"
    >
      <div 
        className={`
          ${style.bg}
          rounded-[24px] 
          p-6 md:p-8
          relative
          overflow-hidden
          transition-all
          duration-300
          min-h-[320px]
          flex
          flex-col
        `}
        style={{
          boxShadow: '0 12px 30px rgba(0,0,0,0.08)'
        }}
      >
        {/* Decorative organic shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Top right blob */}
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-background/10 rounded-full blur-xl" />
          {/* Bottom left curve */}
          <svg className="absolute bottom-0 left-0 w-full h-24 opacity-10" viewBox="0 0 200 80">
            <path
              d="M0 80 Q50 20, 100 50 T200 30 L200 80 Z"
              fill="currentColor"
              className="text-background"
            />
          </svg>
          {/* Dots pattern */}
          <div className="absolute top-12 right-6 flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-background/20" />
            <div className="w-2 h-2 rounded-full bg-background/15" />
            <div className="w-2 h-2 rounded-full bg-background/10" />
          </div>
          {/* Curved line */}
          <svg className="absolute top-1/2 left-4 w-16 h-16 opacity-15" viewBox="0 0 50 50">
            <path
              d="M5 45 Q25 25, 45 5"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              className="text-background"
            />
          </svg>
        </div>

        {/* Badge sticker */}
        {badge && (
          <div className="absolute top-4 left-4 z-20">
            <div 
              className="
                bg-background 
                text-foreground 
                px-3 
                py-1 
                rounded-full 
                text-xs 
                font-bold
                shadow-md
                rotate-[-8deg]
              "
            >
              {badge}
            </div>
          </div>
        )}

        {/* TITLE - Large bold typography */}
        <div className="relative z-10 flex-1">
          <h3 
            className="
              text-foreground 
              font-display 
              font-bold 
              text-3xl 
              md:text-4xl 
              leading-tight 
              mb-6
              tracking-tight
            "
            style={{ lineHeight: '1.1' }}
          >
            {danceClass.name.split(' ').map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}
          </h3>
        </div>

        {/* MIDDLE - Event details */}
        <div className="relative z-10 space-y-2 mb-6">
          <div className="flex items-center gap-2 text-foreground/80">
            <MapPin className="h-4 w-4" strokeWidth={2.5} />
            <span className="text-sm font-medium">{shortLocation}</span>
          </div>
          <div className="flex items-center gap-2 text-foreground/80">
            <Clock className="h-4 w-4" strokeWidth={2.5} />
            <span className="text-sm font-medium">
              {formatDay(danceClass.date)} {danceClass.time}
            </span>
          </div>
        </div>

        {/* BOTTOM - CTA Button */}
        <Button
          className={`
            w-full 
            ${style.buttonBg}
            ${style.buttonText}
            rounded-full 
            font-bold
            text-base
            py-6
            transition-all 
            hover:scale-105
            hover:opacity-90
            shadow-lg
            relative 
            z-10
          `}
          onClick={(e) => {
            e.stopPropagation();
            onRegister();
          }}
        >
          באה לרקוד
        </Button>
      </div>
    </motion.div>
  );
};

export default EventCard;
