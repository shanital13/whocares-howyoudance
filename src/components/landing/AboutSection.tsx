import { motion } from 'framer-motion';
import { useSiteContent } from '@/hooks/use-site-content';
import Blob from '@/components/decor/Blob';
import GalleryFrame from '@/components/decor/GalleryFrame';

const DEFAULTS = {
  who_am_i_title: 'קצת עלי..',
  who_am_i_intro: 'קודם כל ממש נעים להכיר :)',
  who_am_i_paragraph_1: 'אני יוגב ואני מעביר שיעורי מחול ומרחבי תנועה שמהטרה העיקרית שלהן לשחרר ביקורת עצמית, שיפוטיות ולתת לכן להיות הכי חופשיות בגוף שלכן כשאתן רוקדות. בסטודיו, בבית או במסיבה.',
  who_am_i_paragraph_2: 'אני אגלה לכן סוד קטן, אנחנו לא הולכים להופיע בפסטיבל כרמיאל ולא לתת פייט ללהקת בת שבע 😊',
  who_am_i_highlight: '​​בואו איך שאתן - זה מספיק !! ',
};

const AboutSection = () => {
  const { data: content } = useSiteContent();
  const t = (key: keyof typeof DEFAULTS) => content?.[key] || DEFAULTS[key];

  return (
    <section
      id="about"
      className="relative py-24 md:py-32 px-6 overflow-hidden bg-background"
    >
      <Blob
        variant={2}
        color="hsl(var(--hoodie-yellow))"
        className="-top-32 -right-40 w-[520px] h-[520px] opacity-25"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-hoodie-coral mb-3 font-sans">
            About
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-foreground font-display">
            {t('who_am_i_title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-20">
          {/* Left: Video */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full max-w-[360px] mx-auto md:mx-0"
          >
            <GalleryFrame borderColor="hsl(var(--hoodie-magenta))" borderWidth={2}>
              <video
                src="/about-video.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full aspect-[3/4] object-cover block"
              />
            </GalleryFrame>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-right"
          >
            <p className="text-foreground text-xl md:text-2xl font-medium mb-6 leading-relaxed">
              {t('who_am_i_intro')}
            </p>

            <div className="space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed">
              <p>{t('who_am_i_paragraph_1')}</p>
              <p>{t('who_am_i_paragraph_2')}</p>
              <p className="text-hoodie-magenta font-bold text-lg md:text-xl pt-2">
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
