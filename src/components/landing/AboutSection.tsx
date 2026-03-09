import gallery1 from '@/assets/gallery-1.jpg';
import gallery2 from '@/assets/gallery-2.jpg';
import gallery3 from '@/assets/gallery-3.jpg';
import gallery4 from '@/assets/gallery-4.jpg';
import gallery5 from '@/assets/gallery-5.jpg';
import gallery6 from '@/assets/gallery-6.jpg';

const photos = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-6 bg-card">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h2 className="text-center mb-12 text-foreground">
          מי זה 'למי אכפת איך את רוקדת'?
        </h2>

        {/* Text content */}
        <div className="text-center space-y-6 mb-16 max-w-2xl mx-auto">
          <p className="text-foreground text-xl leading-relaxed font-medium">
            זה לא שיעור ריקוד קלאסי.
          </p>
          
          <p className="text-muted-foreground leading-relaxed">
            זה מרחב שבו נשים באות לזוז, להשתחרר ולרקוד כמו שבא להן.
          </p>

          <div className="space-y-2 text-muted-foreground leading-relaxed">
            <p>בלי ניסיון.</p>
            <p>בלי ביקורת.</p>
            <p>בלי "נכון" ו"לא נכון".</p>
          </div>

          <p className="text-foreground text-lg leading-relaxed font-medium pt-4">
            רק מוזיקה, תנועה ואנשים טובים.
          </p>
        </div>

        {/* Photo strip */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo, i) => (
            <div
              key={i}
              className="aspect-square rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in opacity-0"
              style={{ 
                animationDelay: `${0.1 + i * 0.1}s`, 
                animationFillMode: 'forwards' 
              }}
            >
              <img
                src={photo}
                alt={`רגעים מהקהילה ${i + 1}`}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
