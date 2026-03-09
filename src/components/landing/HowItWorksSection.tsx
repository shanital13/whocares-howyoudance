import { UserPlus, MapPin, Music } from 'lucide-react';
import { ChevronDown } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: 'נרשמות',
    description: 'בוחרות שיעור ומשריינות מקום.',
  },
  {
    icon: MapPin,
    title: 'מגיעות',
    description: 'לא צריך ניסיון.',
  },
  {
    icon: Music,
    title: 'רוקדות',
    description: 'שעה של מוזיקה ותנועה.',
  },
];

const HowItWorksSection = () => {
  const scrollToClasses = () => {
    document.getElementById('classes')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="how-it-works" className="py-24 px-6 bg-card">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-center mb-16 text-foreground">איך זה עובד</h2>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={i}
                className="bg-card border border-border rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in opacity-0"
                style={{ 
                  animationDelay: `${0.1 + i * 0.15}s`, 
                  animationFillMode: 'forwards',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
                }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon className="h-8 w-8 text-primary" strokeWidth={2} />
                </div>
                <h3 className="mb-3 text-foreground">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>

        {/* Arrow to next section */}
        <button
          onClick={scrollToClasses}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mx-auto group"
        >
          <span className="text-base font-body">לשיעורים הקרובים</span>
          <ChevronDown className="h-6 w-6 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};

export default HowItWorksSection;
