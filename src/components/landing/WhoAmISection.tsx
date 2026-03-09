import teacherVideo from '@/assets/teacher-video.mp4';
import { motion } from 'framer-motion';

const WhoAmISection = () => {
  const scrollToClasses = () => {
    document.getElementById('classes')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="who-am-i" className="py-20 md:py-28 px-6 bg-background relative overflow-hidden">
      {/* Decorative organic shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-peach blur-3xl rounded-full opacity-30 -translate-x-1/3 -translate-y-1/4" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/10 blur-3xl rounded-full translate-x-1/4 translate-y-1/4" />

      {/* Curved motion lines */}
      <svg className="absolute top-16 right-8 w-24 h-24 text-primary/10 pointer-events-none" viewBox="0 0 100 100" fill="none">
        <path d="M10 80 Q40 20 90 40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <svg className="absolute bottom-20 left-12 w-20 h-20 text-secondary/10 pointer-events-none rotate-45" viewBox="0 0 100 100" fill="none">
        <path d="M15 70 Q50 10 85 50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-nehama text-4xl md:text-5xl lg:text-6xl text-foreground text-center mb-14"
        >
          מי אני?
        </motion.h2>

        {/* Layout: video + text */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-16">
          {/* Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-72 h-96 md:w-[400px] md:h-[520px] flex-shrink-0"
          >
            {/* Background blob behind video */}
            <div className="absolute -inset-4 bg-peach rounded-[2rem] rotate-3" />
            <video
              src={teacherVideo}
              autoPlay
              loop
              muted
              playsInline
              className="relative w-full h-full object-cover rounded-[1.5rem] shadow-lg"
            />
            {/* Decorative dots */}
            <div className="absolute -bottom-3 -left-3 flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-primary/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-primary/25" />
              <div className="w-2.5 h-2.5 rounded-full bg-primary/15" />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex-1 text-center md:text-right"
          >
            <p className="font-body text-foreground text-xl md:text-2xl font-medium mb-6 leading-relaxed">
              אני יוגב.
            </p>

            <div className="space-y-4 font-body text-muted-foreground text-base md:text-lg leading-relaxed">
              <p>
                רקדן ומורה למחול מודרני, ואני מאמין שריקוד צריך להיות מקום שבו אפשר להשתחרר — לא מקום שבו שופטים אותך.
              </p>
              <p>
                השיעורים שלי נועדו במיוחד למתחילות, עם קצב לימוד נעים, הרבה חזרות וכוראיגרפיות שמקשיבות לגוף.
              </p>
              <p className="text-foreground font-medium">
                המטרה היא פשוטה: שתצאי מהשיעור עם חיוך ועם קצת יותר חופש בתנועה.
              </p>
            </div>

            {/* CTA Button */}
            <button
              onClick={scrollToClasses}
              className="mt-8 inline-block px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-body font-bold text-base shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg active:scale-95"
            >
              באה לרקוד 💃
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhoAmISection;
