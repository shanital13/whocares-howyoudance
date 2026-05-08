import { motion } from 'framer-motion';
import { useSiteContent } from '@/hooks/use-site-content';

const DEFAULTS = {
  who_am_i_title: 'מי אני?',
  who_am_i_intro: 'אני יוגב.',
  who_am_i_paragraph_1: 'רקדן ומורה למחול מודרני, ואני מאמין שריקוד צריך להיות מקום שבו אפשר להשתחרר — לא מקום שבו שופטים אותך.',
  who_am_i_paragraph_2: 'השיעורים שלי נועדו במיוחד למתחילות, עם קצב לימוד נעים, הרבה חזרות וכוראיגרפיות שמקשיבות לגוף.',
  who_am_i_highlight: 'המטרה היא פשוטה: שתצאי מהשיעור עם חיוך ועם קצת יותר חופש בתנועה.',
};

const AboutSection = () => {
  const { data: content } = useSiteContent();
  const t = (key: keyof typeof DEFAULTS) => content?.[key] || DEFAULTS[key];

  return (
    <section id="about" className="py-20 md:py-28 px-6 bg-card relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-neon-purple/10 blur-[100px] rounded-full -translate-x-1/3 -translate-y-1/4" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-neon-pink/10 blur-[100px] rounded-full translate-x-1/4 translate-y-1/4" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground text-center mb-14"
        >
          {t('who_am_i_title')}
        </motion.h2>

        <div className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-16">
          {/* Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-full max-w-sm md:w-[400px] flex-shrink-0"
          >
            <div className="absolute -inset-3 bg-neon-coral/20 rounded-[2rem] rotate-2" />
            <video
              src="/about-video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="relative w-full aspect-[3/4] object-cover rounded-[1.5rem] shadow-xl"
            />
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
              {t('who_am_i_intro')}
            </p>

            <div className="space-y-4 font-body text-muted-foreground text-base md:text-lg leading-relaxed">
              <p>{t('who_am_i_paragraph_1')}</p>
              <p>{t('who_am_i_paragraph_2')}</p>
              <p className="text-foreground font-medium">
                {t('who_am_i_highlight')}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
