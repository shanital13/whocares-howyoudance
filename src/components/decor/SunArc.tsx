interface SunArcProps {
  className?: string;
  color?: string;
  strokeWidth?: number;
  filled?: boolean;
}

const SunArc = ({ className, color = 'currentColor', strokeWidth = 1.5, filled = false }: SunArcProps) => (
  <svg viewBox="0 0 120 120" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" aria-hidden="true" className={className}>
    {filled ? <circle cx="60" cy="60" r="26" fill={color} /> : <circle cx="60" cy="60" r="26" />}
    <path d="M60 18 L60 6" />
    <path d="M60 114 L60 102" />
    <path d="M18 60 L6 60" />
    <path d="M114 60 L102 60" />
    <path d="M30 30 L22 22" />
    <path d="M98 22 L90 30" />
    <path d="M22 98 L30 90" />
    <path d="M90 90 L98 98" />
  </svg>
);

export default SunArc;
