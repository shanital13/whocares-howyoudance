import { Calendar, MapPin, Clock, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockClasses } from '@/lib/mock-data';
import { LEVEL_LABELS, type DanceClass } from '@/lib/types';
import { useState } from 'react';
import RegistrationDialog from './RegistrationDialog';

const levelColors: Record<string, string> = {
  beginner: 'bg-success/15 text-success border-success/30',
  intermediate: 'bg-warning/15 text-warning border-warning/30',
  advanced: 'bg-primary/15 text-primary border-primary/30',
  all: 'bg-secondary/15 text-secondary border-secondary/30',
};

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
    <section id="classes" className="py-24 px-6 bg-background relative">
      <div className="absolute inset-0" style={{ background: 'var(--gradient-warm)' }} />

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <span className="text-primary font-display text-sm tracking-wider mb-3 block">✦ שיעורים</span>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">השיעורים הקרובים</h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">בחרי את השיעור שמתאים לך והצטרפי אלינו</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-8">
          {mockClasses.map((cls, i) => (
            <Card
              key={cls.id}
              className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden rounded-3xl bg-card animate-fade-in opacity-0"
              style={{ animationDelay: `${0.1 + i * 0.15}s`, animationFillMode: 'forwards' }}
            >
              {/* Gradient top bar */}
              <div className="h-1.5" style={{ background: 'var(--gradient-primary)' }} />
              <CardContent className="p-7">
                <div className="flex justify-between items-start mb-5">
                  <div>
                    <h3 className="font-display text-2xl text-foreground group-hover:text-primary transition-colors">
                      {cls.name}
                    </h3>
                    {cls.is_recurring && (
                      <span className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Sparkles className="h-3 w-3" />
                        שיעור שבועי קבוע
                      </span>
                    )}
                  </div>
                  <Badge variant="outline" className={`${levelColors[cls.level]} border font-medium`}>
                    {LEVEL_LABELS[cls.level]}
                  </Badge>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <span>{formatDate(cls.date)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <span>{cls.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <span>{cls.location}</span>
                  </div>
                </div>

                <Button
                  className="w-full rounded-full font-bold text-base py-5 shadow-md hover:shadow-lg transition-all"
                  onClick={() => setSelectedClass(cls)}
                >
                  אני מגיעה! 💃
                </Button>
              </CardContent>
            </Card>
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