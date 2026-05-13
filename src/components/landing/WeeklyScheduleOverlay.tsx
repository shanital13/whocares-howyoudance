import { motion } from 'framer-motion';
import { useWeeklySchedule, type WeeklyScheduleItem } from '@/hooks/use-weekly-schedule';
import { cn } from '@/lib/utils';

interface Props {
  variant: 'desktop-overlay' | 'mobile-expanded';
  onBook: (item: WeeklyScheduleItem) => void;
}

const WeeklyScheduleOverlay = ({ variant, onBook }: Props) => {
  const { data: items, isLoading } = useWeeklySchedule();

  const isDesktop = variant === 'desktop-overlay';

  return (
    <div
      className={cn(
        'w-full text-right',
        isDesktop
          ? 'absolute inset-0 z-10 p-4 flex flex-col bg-white/15 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300'
          : 'mt-4 p-4 rounded-2xl bg-white/40 backdrop-blur-md',
      )}
    >
      <h4 className={cn('font-display mb-3 text-foreground', isDesktop ? 'text-lg text-white drop-shadow' : 'text-xl')}>
        מערכת השבוע
      </h4>

      {isLoading ? (
        <p className={cn('text-sm', isDesktop ? 'text-white/90' : 'text-muted-foreground')}>טוען…</p>
      ) : !items || items.length === 0 ? (
        <p className={cn('text-sm leading-relaxed', isDesktop ? 'text-white/90' : 'text-muted-foreground')}>
          השבוע הסתיים — נתראה ביום ראשון ✨
        </p>
      ) : (
        <ul className={cn('space-y-2 overflow-y-auto', isDesktop && 'flex-1')}>
          {items.map((it) => (
            <motion.li
              key={`${it.id}-${it.date.toISOString()}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={cn(
                'flex items-center justify-between gap-2 rounded-xl px-3 py-2',
                isDesktop ? 'bg-white/15 text-white' : 'bg-white/60 text-foreground',
              )}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onBook(it);
                }}
                className={cn(
                  'shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-transform hover:scale-105 active:scale-100',
                  isDesktop
                    ? 'bg-hoodie-coral text-white shadow'
                    : 'bg-hoodie-coral text-white shadow',
                )}
              >
                שריינו מקום
              </button>
              <div className="min-w-0 flex-1 text-right">
                <div className={cn('font-display text-sm leading-tight truncate', isDesktop ? 'text-white' : 'text-foreground')}>
                  {it.name}
                </div>
                <div className={cn('text-xs mt-0.5', isDesktop ? 'text-white/80' : 'text-muted-foreground')}>
                  {it.dayLabel} · {it.time}
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WeeklyScheduleOverlay;
