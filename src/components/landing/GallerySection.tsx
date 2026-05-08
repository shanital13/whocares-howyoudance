import gallery1 from '@/assets/gallery-1.jpg';
import gallery2 from '@/assets/gallery-2.jpg';
import gallery3 from '@/assets/gallery-3.jpg';
import gallery4 from '@/assets/gallery-4.jpg';
import gallery5 from '@/assets/gallery-5.jpg';
import gallery6 from '@/assets/gallery-6.jpg';

const images = [
  { src: gallery1, alt: 'ריקוד חופשי בסטודיו', span: '' },
  { src: gallery2, alt: 'תנועה על חוף הים', span: 'row-span-2' },
  { src: gallery3, alt: 'מעגל תנועה', span: '' },
  { src: gallery4, alt: 'ידיים באוויר', span: 'row-span-2' },
  { src: gallery5, alt: 'קהילה רוקדת', span: '' },
  { src: gallery6, alt: 'ריקוד בתאורה', span: '' },
];

const GallerySection = () => {
  return (
    <section id="gallery" className="py-24 px-6 bg-muted/30 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <span className="text-primary text-sm tracking-wider mb-3 block">✦ גלריה</span>
          <h2 className="text-4xl md:text-5xl text-foreground mb-4">רגעים מהשיעורים</h2>
          <p className="text-muted-foreground text-lg">כל שיעור הוא חוויה בלתי נשכחת</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[200px] md:auto-rows-[240px] gap-4">
          {images.map((img, i) => (
            <div
              key={i}
              className={`${img.span} rounded-2xl overflow-hidden group cursor-pointer animate-scale-in opacity-0`}
              style={{ animationDelay: `${0.1 + i * 0.1}s`, animationFillMode: 'forwards' }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;