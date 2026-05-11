interface CoconutProps {
  className?: string;
  color?: string;
  strokeWidth?: number;
}

const Coconut = ({ className, color = 'currentColor', strokeWidth = 1.5 }: CoconutProps) => (
  <svg
    viewBox="0 0 120 200"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    {/* Trunk */}
    <path d="M60 200 Q55 150 58 110 Q60 90 55 60" />
    <path d="M58 180 Q62 178 60 175" />
    <path d="M56 150 Q60 148 58 145" />
    <path d="M58 120 Q62 118 60 115" />
    {/* Coconuts cluster */}
    <circle cx="52" cy="62" r="4" />
    <circle cx="62" cy="60" r="4" />
    <circle cx="57" cy="68" r="4" />
    {/* Fronds */}
    <path d="M55 60 Q35 50 10 55 Q30 55 50 62" />
    <path d="M55 58 Q45 38 20 25 Q40 35 55 58" />
    <path d="M58 56 Q60 35 55 10 Q62 30 60 56" />
    <path d="M60 56 Q80 38 105 28 Q85 38 62 58" />
    <path d="M60 60 Q85 55 112 60 Q90 60 62 64" />
    <path d="M58 62 Q70 80 75 105 Q65 85 56 64" />
  </svg>
);

export default Coconut;
