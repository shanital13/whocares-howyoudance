import { mockClasses } from '@/lib/mock-data';
import { type DanceClass } from '@/lib/types';
import { useState } from 'react';
import RegistrationDialog from './RegistrationDialog';
import EventCard from './EventCard';

const ClassesSection = () => {
  const [selectedClass, setSelectedClass] = useState<DanceClass | null>(null);

  return (
    <section id="classes" className="py-24 px-6 bg-background relative overflow-hidden">
      {/* Organic background shapes */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-20 left-[5%] w-96 h-96 bg-peach blur-3xl rounded-full" />
        <div className="absolute bottom-40 right-[10%] w-80 h-80 bg-secondary/30 blur-3xl rounded-full" />
        <div className="absolute top-[50%] left-[50%] w-64 h-64 bg-primary/20 blur-3xl rounded-full" />
      </div>

      {/* Decorative curved lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-5">
        <path
          d="M -100 300 Q 400 100, 700 300 T 1400 200"
          stroke="hsl(var(--foreground))"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M -50 500 Q 300 400, 600 550 T 1200 450"
          stroke="hsl(var(--foreground))"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Title */}
        <h2 className="font-nehama text-4xl md:text-5xl text-center mb-16 text-foreground">השיעורים הקרובים</h2>

        {/* Poster-style Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {mockClasses.map((cls, i) => (
            <EventCard
              key={cls.id}
              danceClass={cls}
              variant={i}
              onRegister={() => setSelectedClass(cls)}
            />
          ))}
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
