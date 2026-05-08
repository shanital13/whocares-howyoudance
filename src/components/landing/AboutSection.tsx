import { motion } from 'framer-motion';
import { useSiteContent } from '@/hooks/use-site-content';
import aboutBg from '@/assets/about-bg.jpg';

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
    <section
      id="about"
      className="relative py-24 md:py-36 px-6 overflow-hidden"
      style={{
        backgroundImage: `url(${aboutBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/30" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-6 drop-shadow-lg"
        >
          {t('who_am_i_title')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-body text-white/90 text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed"
        >
          {t('who_am_i_intro')}
        </motion.p>

        {/* Video with neon glow frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative mx-auto w-full max-w-2xl"
        >
          {/* Neon glow effect behind video */}
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-[hsl(340,100%,65%)] via-[hsl(280,70%,72%)] to-[hsl(175,90%,55%)] opacity-50 blur-xl" />
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[hsl(340,100%,65%)] via-[hsl(280,70%,72%)] to-[hsl(175,90%,55%)] opacity-70" />

          <video
            src="/about-video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="relative w-full aspect-video object-cover rounded-2xl shadow-2xl"
          />
        </motion.div>

        {/* Text below video */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 space-y-4 font-body text-white/85 text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
        >
          <p>{t('who_am_i_paragraph_1')}</p>
          <p>{t('who_am_i_paragraph_2')}</p>
          <p className="text-white font-medium text-lg md:text-xl">
            {t('who_am_i_highlight')}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
