import { ReactNode } from 'react';

interface GalleryFrameProps {
  children: ReactNode;
  borderColor?: string;
  borderWidth?: 1 | 2;
  className?: string;
}

const GalleryFrame = ({
  children,
  borderColor = 'hsl(var(--hoodie-magenta))',
  borderWidth = 2,
  className = '',
}: GalleryFrameProps) => (
  <div
    className={`relative rounded-none ${className}`}
    style={{ border: `${borderWidth}px solid ${borderColor}` }}
  >
    {children}
  </div>
);

export default GalleryFrame;
