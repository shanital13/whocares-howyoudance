import { ReactNode, useId } from 'react';

interface WavyFrameProps {
  children: ReactNode;
  className?: string;
  bgColor?: string; // tailwind class for offset blob fill
  rotate?: number;
}

/**
 * Spark & Marnee style wavy blob frame.
 * Renders an offset colored blob behind, with the child clipped to a matching wavy path.
 */
const WavyFrame = ({ children, className = '', bgColor = 'bg-hoodie-coral/30', rotate = -2 }: WavyFrameProps) => {
  const id = useId().replace(/:/g, '');
  // A wavy rounded-rect path inside a 100x100 viewBox (will scale via clipPathUnits)
  const wavyPath =
    'M0.05,0.12 C0.02,0.04 0.1,0.0 0.2,0.04 C0.35,0.08 0.5,0.0 0.65,0.03 C0.82,0.06 0.95,0.0 0.97,0.12 C1.0,0.25 0.93,0.4 0.97,0.55 C1.0,0.7 0.94,0.85 0.97,0.92 C0.95,1.0 0.82,0.97 0.68,0.97 C0.5,0.97 0.32,1.0 0.18,0.97 C0.05,0.95 0.0,0.85 0.03,0.7 C0.06,0.55 0.0,0.4 0.03,0.28 C0.04,0.2 0.07,0.18 0.05,0.12 Z';

  return (
    <div className={`relative ${className}`}>
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <clipPath id={`wavy-${id}`} clipPathUnits="objectBoundingBox">
            <path d={wavyPath} />
          </clipPath>
        </defs>
      </svg>
      {/* Offset background blob */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 ${bgColor}`}
        style={{
          clipPath: `url(#wavy-${id})`,
          transform: `translate(8px, 10px) rotate(${rotate}deg)`,
        }}
      />
      {/* Foreground clipped content */}
      <div
        className="relative"
        style={{ clipPath: `url(#wavy-${id})` }}
      >
        {children}
      </div>
    </div>
  );
};

export default WavyFrame;
