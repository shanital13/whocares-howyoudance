interface SparkleProps {
  className?: string;
  color?: string;
}

const Sparkle = ({ className, color = 'currentColor' }: SparkleProps) => (
  <svg viewBox="0 0 24 24" fill={color} aria-hidden="true" className={className}>
    <path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" />
  </svg>
);

export default Sparkle;
