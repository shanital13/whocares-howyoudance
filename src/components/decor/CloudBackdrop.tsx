import cloudscape from '@/assets/cloudscape.jpg';

/**
 * CloudBackdrop — viewport-locked cloudscape wallpaper.
 * Stays completely static while content scrolls over it.
 */
const CloudBackdrop = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none fixed inset-0 -z-10"
    style={{
      backgroundImage: `url(${cloudscape})`,
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
    }}
  >
    <div className="absolute inset-0 bg-background/25" />
  </div>
);

export default CloudBackdrop;
