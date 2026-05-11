/**
 * PageBlobs — a single fixed background layer of large, soft-focus "ink cloud"
 * blobs that flow down the entire page. Sits behind every section to create
 * continuous depth on the cream canvas.
 */
const PageBlobs = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
  >
    {/* Hero region */}
    <div className="absolute -top-40 -right-32 w-[680px] h-[680px] rounded-full bg-hoodie-magenta/35 blur-[140px]" />
    <div className="absolute top-20 -left-40 w-[560px] h-[560px] rounded-full bg-hoodie-coral/30 blur-[130px]" />

    {/* About / mid region */}
    <div className="absolute top-[55%] -right-48 w-[620px] h-[620px] rounded-full bg-hoodie-orange/25 blur-[140px]" />
    <div className="absolute top-[70%] left-[5%] w-[480px] h-[480px] rounded-full bg-hoodie-teal/25 blur-[130px]" />

    {/* Services / Testimonials region */}
    <div className="absolute top-[120%] -left-32 w-[600px] h-[600px] rounded-full bg-hoodie-yellow/30 blur-[150px]" />
    <div className="absolute top-[150%] right-[10%] w-[520px] h-[520px] rounded-full bg-hoodie-magenta/25 blur-[140px]" />

    {/* Contact / footer region */}
    <div className="absolute top-[200%] -right-40 w-[560px] h-[560px] rounded-full bg-hoodie-coral/25 blur-[140px]" />
    <div className="absolute top-[230%] left-[15%] w-[500px] h-[500px] rounded-full bg-hoodie-teal/20 blur-[130px]" />
  </div>
);

export default PageBlobs;
