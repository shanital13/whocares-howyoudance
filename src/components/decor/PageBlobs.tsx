/**
 * PageBlobs — full-page absolute layer of large, soft-focus "ink cloud" blobs
 * that bleed into the cream canvas across every section.
 */
const PageBlobs = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden"
  >
    {/* Hero region (0–15%) */}
    <div className="absolute top-[-6%] right-[-10%] w-[720px] h-[720px] rounded-[60%_40%_55%_45%] bg-hoodie-magenta/45 blur-[140px]" />
    <div className="absolute top-[4%] left-[-12%] w-[600px] h-[600px] rounded-[50%_55%_45%_50%] bg-hoodie-coral/50 blur-[130px]" />
    <div className="absolute top-[10%] left-[40%] w-[460px] h-[460px] rounded-full bg-hoodie-yellow/35 blur-[150px]" />

    {/* Hero ↔ About straddle (15–30%) */}
    <div className="absolute top-[20%] right-[18%] w-[560px] h-[560px] rounded-[55%_45%_60%_40%] bg-hoodie-orange/45 blur-[140px]" />
    <div className="absolute top-[28%] left-[-8%] w-[520px] h-[520px] rounded-full bg-hoodie-teal/35 blur-[150px]" />

    {/* About ↔ Services straddle (35–55%) */}
    <div className="absolute top-[40%] right-[-12%] w-[680px] h-[680px] rounded-[45%_55%_50%_50%] bg-hoodie-magenta/40 blur-[150px]" />
    <div className="absolute top-[48%] left-[20%] w-[500px] h-[500px] rounded-[60%_40%_45%_55%] bg-hoodie-yellow/45 blur-[140px]" />

    {/* Services ↔ Testimonials straddle (60–75%) */}
    <div className="absolute top-[62%] left-[-10%] w-[640px] h-[640px] rounded-[55%_45%_50%_50%] bg-hoodie-coral/45 blur-[150px]" />
    <div className="absolute top-[70%] right-[10%] w-[540px] h-[540px] rounded-full bg-hoodie-orange/40 blur-[140px]" />

    {/* Testimonials ↔ Contact straddle (80–95%) */}
    <div className="absolute top-[82%] right-[-14%] w-[620px] h-[620px] rounded-[50%_50%_45%_55%] bg-hoodie-teal/40 blur-[150px]" />
    <div className="absolute top-[88%] left-[5%] w-[560px] h-[560px] rounded-[45%_55%_55%_45%] bg-hoodie-magenta/40 blur-[140px]" />
    <div className="absolute top-[94%] left-[45%] w-[480px] h-[480px] rounded-full bg-hoodie-yellow/40 blur-[150px]" />
  </div>
);

export default PageBlobs;
