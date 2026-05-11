interface WaveLinesProps {
  className?: string;
  color?: string;
  strokeWidth?: number;
}

const WaveLines = ({ className, color = 'currentColor', strokeWidth = 1.5 }: WaveLinesProps) => (
  <svg viewBox="0 0 1200 60" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" preserveAspectRatio="none" aria-hidden="true" className={className}>
    <path d="M0 20 Q150 0 300 20 T600 20 T900 20 T1200 20" />
    <path d="M0 35 Q150 15 300 35 T600 35 T900 35 T1200 35" opacity="0.6" />
    <path d="M0 50 Q150 30 300 50 T600 50 T900 50 T1200 50" opacity="0.35" />
  </svg>
);

export default WaveLines;
