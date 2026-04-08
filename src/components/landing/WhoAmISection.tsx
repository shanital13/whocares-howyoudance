import teacherVideo from '@/assets/teacher-video.mp4';
import { motion } from 'framer-motion';
import { useSiteContent } from '@/hooks/use-site-content';

const DEFAULTS = {
  who_am_i_title: 'מי אני?',
  who_am_i_intro: 'אני יוגב.',
  who_am_i_paragraph_1: 'רקדן ומורה למחול מודרני, ואני מאמין שריקוד צריך להיות מקום שבו אפשר להשתחרר — לא מקום שבו שופטים אותך.',
  who_am_i_paragraph_2: 'השיעורים שלי נועדו במיוחד למתחילות, עם קצב לימוד נעים, הרבה חזרות וכוראיגרפיות שמקשיבות לגוף.',
  who_am_i_highlight: 'המטרה היא פשוטה: שתצאי מהשיעור עם חיוך ועם קצת יותר חופש בתנועה.',
};

const WhoAmISection = () => {
  const { data: content } = useSiteContent();
  const t = (key: keyof typeof DEFAULTS) => content?.[key] || DEFAULTS[key];

  const mediaUrl = content?.who_am_i_media_url;
  const isVideo = !mediaUrl || mediaUrl.includes('.mp4') || mediaUrl.includes('.webm') || mediaUrl.includes('.mov');
  const mediaSrc = mediaUrl || teacherVideo;

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
          className="text-4xl md:text-5xl text-foreground text-center mb-14 font-sans lg:text-5xl"
        >
          {t('who_am_i_title')}
        </motion.h2>

        {/* Layout: video + text */}
...
            <button
              onClick={scrollToClasses}
              className="mt-8 inline-block px-8 py-3.5 rounded-full text-primary-foreground font-body font-bold text-base shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg active:scale-95 bg-secondary"
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
