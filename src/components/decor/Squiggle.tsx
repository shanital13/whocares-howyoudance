interface SquiggleProps {
  className?: string;
  color?: string;
  strokeWidth?: number;
}

const Squiggle = ({ className, color = 'currentColor', strokeWidth = 2 }: SquiggleProps) => (
  <svg viewBox="0 0 120 12" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" preserveAspectRatio="none" aria-hidden="true" className={className}>
    <path d="M2 6 Q15 0 30 6 T60 6 T90 6 T118 6" />
  </svg>
);

export default Squiggle;
