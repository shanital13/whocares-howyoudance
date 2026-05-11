interface MarqueeStripProps {
  text?: string;
  className?: string;
}

const DEFAULT_WORDS = ['תנועה', 'חופש', 'שמחה', 'ריקוד', 'נשימה', 'קלילות'];

const MarqueeStrip = ({ text, className = '' }: MarqueeStripProps) => {
  const items = text ? [text] : DEFAULT_WORDS;
  const sequence = Array.from({ length: 4 }).flatMap(() => items);

  return (
    <div
      className={`relative overflow-hidden bg-hoodie-yellow/80 py-3 md:py-4 border-y border-white/30 ${className}`}
      aria-hidden="true"
    >
      <div className="flex whitespace-nowrap animate-marquee gap-10">
        {sequence.concat(sequence).map((w, i) => (
          <span
            key={i}
            className="font-display text-xl md:text-2xl text-white drop-shadow-sm tracking-wide"
          >
            {w} <span className="opacity-70">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeStrip;
