import cloudscape from '@/assets/cloudscape.jpg';

/**
 * CloudBackdrop — full-document pastel cloudscape that flows seamlessly
 * from the very top of the page down through the footer. The image is
 * tiled vertically and feathered at each seam so the repeat is invisible.
 */
const CloudBackdrop = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden"
  >
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `url(${cloudscape})`,
        backgroundRepeat: 'repeat-y',
        backgroundSize: '100% auto',
        backgroundPosition: 'top center',
      }}
    />
    {/* Soft cream wash to lift readability without introducing new colors */}
    <div className="absolute inset-0 bg-background/35" />
  </div>
);

export default CloudBackdrop;
