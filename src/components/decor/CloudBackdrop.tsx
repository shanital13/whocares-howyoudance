import { useEffect, useRef } from 'react';
import cloudscape from '@/assets/cloudscape.jpg';

/**
 * CloudBackdrop — viewport-fixed cloudscape with subtle parallax.
 * The image stays glued to the viewport while content scrolls over it.
 * Respects prefers-reduced-motion.
 */
const CloudBackdrop = () => {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = layerRef.current;
    if (!el) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    let raf = 0;
    let ticking = false;

    const update = () => {
      const y = window.scrollY * 0.3;
      el.style.transform = `translate3d(0, ${-y}px, 0) scale(1.05)`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        raf = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        ref={layerRef}
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage: `url(${cloudscape})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          height: '140%',
          top: '-20%',
        }}
      />
      {/* Soft cream wash for readability — no new colors */}
      <div className="absolute inset-0 bg-background/30" />
    </div>
  );
};

export default CloudBackdrop;
