import { Calendar, MapPin, Clock } from 'lucide-react';
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
    <section id="classes" className="py-24 px-6 bg-peach">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-center mb-16 text-foreground">השיעורים הקרובים</h2>

        {/* Classes Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {mockClasses.map((cls, i) => (
            <Card
              key={cls.id}
              className="group border-0 overflow-hidden bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in opacity-0"
              style={{ 
                animationDelay: `${0.1 + i * 0.1}s`, 
                animationFillMode: 'forwards',
                borderRadius: '20px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.05)'
              }}
            >
              <CardContent className="p-6">
                {/* Class name and level */}
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-foreground leading-tight flex-1">{cls.name}</h3>
                  {cls.available_spots <= 3 && cls.available_spots > 0 && (
                    <Badge variant="outline" className="bg-warning/15 text-warning border-warning/30 text-xs mr-2">
                      כמעט מלא
                    </Badge>
                  )}
                </div>

                {/* Class details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-muted-foreground text-sm">
                    <Calendar className="h-4 w-4 text-primary shrink-0" />
                    <span>{formatDate(cls.date)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground text-sm">
                    <Clock className="h-4 w-4 text-primary shrink-0" />
                    <span>{cls.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground text-sm">
                    <MapPin className="h-4 w-4 text-primary shrink-0" />
                    <span>{cls.location}</span>
                  </div>
                </div>

                {/* Signup button */}
                <Button
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full font-medium transition-all hover:scale-105"
                  onClick={() => setSelectedClass(cls)}
                >
                  נרשמת?
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
