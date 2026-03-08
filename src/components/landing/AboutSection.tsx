const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-6 bg-card">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-4xl text-foreground mb-6">
              קצת עליי
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                אני מאמינה שכל אחת יכולה לרקוד. לא צריך ניסיון, לא צריך כישרון מיוחד — רק את עצמך ואת הרצון לזוז.
              </p>
              <p>
                בשיעורים שלי אנחנו יוצרות מרחב בטוח של תנועה, שחרור ושמחה. כל שיעור הוא מסע — מהגוף אל הנשמה ובחזרה.
              </p>
              <p>
                המטרה היא לא לרקוד "נכון", אלא לרקוד <span className="text-primary font-semibold">באמת</span>. ברגע שמשחררים את הבושה, הגוף יודע בדיוק מה לעשות.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="text-8xl mb-4">🧘‍♀️</div>
                <p className="text-muted-foreground text-sm">תמונת המאמנת</p>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-xl bg-accent/30 blur-xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
