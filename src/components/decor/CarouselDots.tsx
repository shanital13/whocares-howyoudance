import { cn } from '@/lib/utils';

interface CarouselDotsProps {
  count: number;
  active: number;
  onSelect: (i: number) => void;
  className?: string;
}

const CarouselDots = ({ count, active, onSelect, className }: CarouselDotsProps) => (
  <div className={cn('flex items-center justify-center gap-2 mt-6', className)}>
    {Array.from({ length: count }).map((_, i) => (
      <button
        key={i}
        type="button"
        onClick={() => onSelect(i)}
        aria-label={`עבור לכרטיס ${i + 1}`}
        className={cn(
          'h-2 rounded-full transition-all duration-300',
          i === active ? 'w-6 bg-hoodie-coral' : 'w-2 bg-foreground/20',
        )}
      />
    ))}
  </div>
);

export default CarouselDots;
