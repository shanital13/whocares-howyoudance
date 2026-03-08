const placeholders = [
  { id: 1, emoji: '💃', label: 'ריקוד חופשי' },
  { id: 2, emoji: '🌊', label: 'תנועה בים' },
  { id: 3, emoji: '🧘‍♀️', label: 'יוגה ותנועה' },
  { id: 4, emoji: '🎶', label: 'מוזיקה ותנועה' },
  { id: 5, emoji: '🌅', label: 'שיעור שקיעה' },
  { id: 6, emoji: '✨', label: 'אנרגיה' },
];

const GallerySection = () => {
  return (
    <section id="gallery" className="py-20 px-6 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-display text-4xl text-foreground mb-4">רגעים מהשיעורים</h2>
          <p className="text-muted-foreground text-lg">כל שיעור הוא חוויה</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {placeholders.map((item) => (
            <div
              key={item.id}
              className="aspect-square rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex flex-col items-center justify-center gap-3 hover:scale-[1.02] transition-transform cursor-pointer"
            >
              <span className="text-5xl">{item.emoji}</span>
              <span className="text-muted-foreground text-sm">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
