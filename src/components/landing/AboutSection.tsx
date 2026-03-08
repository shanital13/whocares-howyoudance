import heroImage from '@/assets/hero-image.jpeg';

const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-6 bg-card relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-primary/5 blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-secondary/5 blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="max-w-5xl mx-auto relative">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            <span className="text-primary font-display text-sm tracking-wider mb-3 block">✦ קצת עליי</span>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-8 leading-tight">
              המסע שלי<br />
              <span className="text-primary">התחיל בתנועה</span>
            </h2>
            <div className="space-y-5 text-muted-foreground text-lg leading-relaxed">
              <p>
                אני מאמינה שכל אחת יכולה לרקוד. לא צריך ניסיון, לא צריך כישרון מיוחד — רק את עצמך ואת הרצון לזוז.
              </p>
              <p>
                בשיעורים שלי אנחנו יוצרות מרחב בטוח של תנועה, שחרור ושמחה. כל שיעור הוא מסע — מהגוף אל הנשמה ובחזרה.
              </p>
              <p>
                המטרה היא לא לרקוד "נכון", אלא לרקוד{' '}
                <span className="text-primary font-semibold">באמת</span>. ברגע שמשחררים את הבושה, הגוף יודע בדיוק מה לעשות.
              </p>
            </div>
          </div>
          <div className="relative animate-fade-in opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-border/50">
              <img
                src={heroImage}
                alt="המאמן"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating accent card */}
            <div className="absolute -bottom-6 -right-6 bg-card rounded-2xl shadow-xl p-5 border border-border/50">
              <p className="font-display text-3xl text-primary mb-1">+500</p>
              <p className="text-muted-foreground text-sm">משתתפות מאושרות</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;