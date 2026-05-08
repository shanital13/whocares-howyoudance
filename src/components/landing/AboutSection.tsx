import { motion } from 'framer-motion';
import { useSiteContent } from '@/hooks/use-site-content';

const DEFAULTS = {
  who_am_i_title: 'מי אני?',
  who_am_i_intro: 'אני יוגב וקודם כל ממש נעים להכיר.',
  who_am_i_paragraph_1: 'אני מעביר שיעורי מחול ומרחבי תנועה שמהטרה העיקרית שלהן לשחרר ביקורת עצמית, שיפוטיות ולתת לכן להיות הכי חופשיות בגוף שלכן כשאתן רוקדות. \n',
  who_am_i_paragraph_2: 'אני אגלה לכן סוד קטן, אנחנו לא הולכים להופיע בפסטיבל כרמיאל ולא לתת פייט ללהקת בת שבע 😊',
  who_am_i_highlight: '​​בואו איך שאתן - זה מספיק !! ',
};

const AboutSection = () => {
  const { data: content } = useSiteContent();
  const t = (key: keyof typeof DEFAULTS) => content?.[key] || DEFAULTS[key];

  return (
    <section
      id="about"
      className="relative py-24 md:py-36 px-6 overflow-hidden bg-white"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl lg:text-6xl text-foreground mb-12 md:mb-16 text-center drop-shadow-lg font-display"
        >
          {t('who_am_i_title')}
        </motion.h2>

        {/* Two-column layout: video left, text right */}
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Left column: Vertical Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full max-w-[280px] md:max-w-[320px] flex-shrink-0"
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-neon-pink/20 via-neon-purple/15 to-neon-cyan/10 blur-2xl" />
              <video
                src="/about-video.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="relative w-full aspect-[9/16] object-cover rounded-2xl shadow-2xl shadow-black/40"
              />
            </div>
          </motion.div>

          {/* Right column: Text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex-1 text-center md:text-right"
          >
            <p className="text-foreground text-xl md:text-2xl font-medium mb-6 leading-relaxed">
              {t('who_am_i_intro')}
            </p>

            <div className="space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed">
              <p>{t('who_am_i_paragraph_1')}</p>
              <p>{t('who_am_i_paragraph_2')}</p>
              <p className="text-foreground font-medium text-lg md:text-xl">
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
