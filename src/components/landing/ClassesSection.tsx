import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockClasses } from '@/lib/mock-data';
import { LEVEL_LABELS, type DanceClass } from '@/lib/types';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import RegistrationDialog from './RegistrationDialog';

const levelColors: Record<string, string> = {
  beginner: 'bg-success text-success-foreground',
  intermediate: 'bg-warning text-warning-foreground',
  advanced: 'bg-primary text-primary-foreground',
  all: 'bg-secondary text-secondary-foreground',
};

const ClassesSection = () => {
  const { user, signInWithGoogle } = useAuth();
  const [selectedClass, setSelectedClass] = useState<DanceClass | null>(null);

  const handleRegister = (danceClass: DanceClass) => {
    setSelectedClass(danceClass);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('he-IL', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  };

  return (
    <section id="classes" className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-display text-4xl text-foreground mb-4">השיעורים הקרובים</h2>
          <p className="text-muted-foreground text-lg">בחרי את השיעור שמתאים לך והירשמי</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {mockClasses.map((cls) => (
            <Card
              key={cls.id}
              className="group hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary/20 overflow-hidden"
            >
              <div className="h-2" style={{ background: 'var(--gradient-primary)' }} />
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="font-display text-xl">{cls.name}</CardTitle>
                  <Badge className={levelColors[cls.level]}>{LEVEL_LABELS[cls.level]}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>{formatDate(cls.date)}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>{cls.time}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{cls.location}</span>
                </div>
                {cls.is_recurring && (
                  <Badge variant="outline" className="text-xs">שיעור שבועי קבוע</Badge>
                )}
                <Button
                  className="w-full mt-4 rounded-full font-bold"
                  onClick={() => handleRegister(cls)}
                >
                  {user ? 'הרשמה לשיעור' : 'התחברי להרשמה'}
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
