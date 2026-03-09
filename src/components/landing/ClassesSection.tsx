import { useMemo } from 'react';
import { useClasses } from '@/hooks/use-supabase-data';
import { type DanceClass } from '@/lib/types';
import { useState } from 'react';
import RegistrationDialog from './RegistrationDialog';
import EventCard from './EventCard';

const ClassesSection = () => {
  const { data: dbClasses = [] } = useClasses();
  const [selectedClass, setSelectedClass] = useState<DanceClass | null>(null);

  // Map DB classes to DanceClass type
  const classes: DanceClass[] = dbClasses.map((c) => ({
    id: c.id,
    name: c.name,
    level: c.level,
    location: c.location,
    date: c.date,
    time: c.time,
    is_recurring: c.is_recurring,
    recurring_day: c.recurring_day ?? undefined,
    max_participants: c.max_participants ?? undefined,
    created_at: c.created_at,
  }));

  const displayedClasses = useMemo(() => {
    const now = new Date();
    const nextWeekEnd = new Date(now);
    nextWeekEnd.setDate(nextWeekEnd.getDate() + 7);

    return classes.filter((cls) => {
      if (!cls.is_recurring) return true;
      const classDate = new Date(cls.date);
      return classDate >= now && classDate <= nextWeekEnd;
    });
  }, [classes]);

  return (
    <section id="classes" className="py-24 px-6 bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-20 left-[5%] w-96 h-96 bg-peach blur-3xl rounded-full" />
        <div className="absolute bottom-40 right-[10%] w-80 h-80 bg-secondary/30 blur-3xl rounded-full" />
        <div className="absolute top-[50%] left-[50%] w-64 h-64 bg-primary/20 blur-3xl rounded-full" />
      </div>

      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-5">
        <path d="M -100 300 Q 400 100, 700 300 T 1400 200" stroke="hsl(var(--foreground))" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M -50 500 Q 300 400, 600 550 T 1200 450" stroke="hsl(var(--foreground))" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="font-nehama text-4xl md:text-5xl text-center mb-16 text-foreground">השיעורים הקרובים</h2>

        {displayedClasses.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {displayedClasses.map((cls, i) => (
              <EventCard key={cls.id} danceClass={cls} variant={i} onRegister={() => setSelectedClass(cls)} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground font-body text-lg">
            אין שיעורים קרובים כרגע — עקבו אחרינו לעדכונים 💃
          </p>
        )}
      </div>

      <RegistrationDialog danceClass={selectedClass} onClose={() => setSelectedClass(null)} />
    </section>
  );
};

export default ClassesSection;
