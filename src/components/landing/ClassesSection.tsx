import { useMemo } from 'react';
import { useClasses, useRegistrations } from '@/hooks/use-supabase-data';
import { type DanceClass } from '@/lib/types';
import { useState } from 'react';
import RegistrationDialog from './RegistrationDialog';
import EventCard from './EventCard';

const ClassesSection = () => {
  const { data: dbClasses = [] } = useClasses();
  const { data: allRegistrations = [] } = useRegistrations();
  const [selectedClass, setSelectedClass] = useState<DanceClass | null>(null);

  const classes: DanceClass[] = dbClasses.map((c) => ({
    id: c.id,
    name: c.name,
    level: c.level,
    description: c.description,
    location: c.location,
    date: c.date,
    time: c.time,
    is_recurring: c.is_recurring,
    recurring_day: c.recurring_day ?? undefined,
    max_participants: c.max_participants ?? undefined,
    arrival_instructions: (c as any).arrival_instructions ?? '',
    created_at: c.created_at,
  }));

  // Count registrations per class
  const regCountByClass = useMemo(() => {
    const counts: Record<string, number> = {};
    allRegistrations.forEach((r) => {
      counts[r.class_id] = (counts[r.class_id] || 0) + 1;
    });
    return counts;
  }, [allRegistrations]);

  const displayedClasses = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const nextWeekEnd = new Date(today);
    nextWeekEnd.setDate(nextWeekEnd.getDate() + 7);

    // Get start of current week (Sunday)
    const weekStart = new Date(today);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());

    return classes.filter((cls) => {
      const classDate = new Date(cls.date);
      if (cls.is_recurring) {
        return classDate >= weekStart && classDate <= nextWeekEnd;
      }
      // Non-recurring: show if in current week or future
      return classDate >= weekStart;
    });
  }, [classes]);

  const selectedIsFull = selectedClass?.max_participants != null
    ? (regCountByClass[selectedClass.id] || 0) >= selectedClass.max_participants
    : false;

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
              <EventCard
                key={cls.id}
                danceClass={cls}
                variant={i}
                registrationCount={regCountByClass[cls.id] || 0}
                onRegister={() => setSelectedClass(cls)}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground font-body text-lg">
            אין שיעורים קרובים כרגע — עקבו אחרינו לעדכונים 💃
          </p>
        )}
      </div>

      <RegistrationDialog
        danceClass={selectedClass}
        isWaitlist={selectedIsFull}
        onClose={() => setSelectedClass(null)}
      />
    </section>
  );
};

export default ClassesSection;
