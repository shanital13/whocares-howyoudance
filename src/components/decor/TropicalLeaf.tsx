interface LeafProps {
  className?: string;
  color?: string;
  strokeWidth?: number;
  variant?: 'monstera' | 'palm';
}

const TropicalLeaf = ({ className, color = 'currentColor', strokeWidth = 1.5, variant = 'monstera' }: LeafProps) => {
  if (variant === 'palm') {
    return (
      <svg viewBox="0 0 100 120" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
        <path d="M50 115 Q50 70 50 20" />
        <path d="M50 80 Q30 75 15 60" />
        <path d="M50 80 Q70 75 85 60" />
        <path d="M50 60 Q28 55 12 38" />
        <path d="M50 60 Q72 55 88 38" />
        <path d="M50 40 Q32 30 22 15" />
        <path d="M50 40 Q68 30 78 15" />
        <path d="M50 22 Q45 12 40 5" />
        <path d="M50 22 Q55 12 60 5" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 100 120" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M50 115 Q48 80 50 20 Q72 25 82 55 Q78 85 50 115 Q22 85 18 55 Q28 25 50 20" />
      <path d="M50 30 L50 110" />
      <path d="M50 50 Q35 48 25 42" />
      <path d="M50 50 Q65 48 75 42" />
      <path d="M50 70 Q33 70 22 65" />
      <path d="M50 70 Q67 70 78 65" />
      <path d="M50 90 Q36 92 28 88" />
      <path d="M50 90 Q64 92 72 88" />
    </svg>
  );
};

export default TropicalLeaf;
