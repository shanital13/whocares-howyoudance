import { motion } from 'framer-motion';
import { useSiteContent } from '@/hooks/use-site-content';
import WavyFrame from '@/components/decor/WavyFrame';
import TropicalLeaf from '@/components/decor/TropicalLeaf';
import Sparkle from '@/components/decor/Sparkle';

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
      className="relative py-24 md:py-36 px-6 overflow-hidden bg-background dot-pattern"
    >
      <Sparkle color="hsl(var(--hoodie-coral))" className="absolute top-16 right-10 w-4 h-4 opacity-70" />
      <Sparkle color="hsl(var(--hoodie-yellow))" className="absolute bottom-20 left-12 w-5 h-5 opacity-60" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl lg:text-6xl text-foreground mb-12 md:mb-16 text-center drop-shadow-lg font-display text-zinc-950 md:text-7xl"
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
            className="w-full max-w-[280px] md:max-w-[320px] flex-shrink-0 relative"
          >
            <TropicalLeaf
              color="hsl(var(--hoodie-teal))"
              variant="palm"
              className="absolute -top-10 -right-8 w-20 h-24 md:w-28 md:h-32 opacity-80 rotate-12 z-10"
            />
            <TropicalLeaf
              color="hsl(var(--hoodie-orange))"
              variant="monstera"
              className="absolute -bottom-8 -left-8 w-20 h-24 md:w-24 md:h-28 opacity-75 -rotate-12 z-10"
            />
            <WavyFrame bgColor="bg-hoodie-coral/40" rotate={-3}>
              <div className="bg-white p-2">
                <video
                  src="/about-video.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full aspect-[9/16] object-cover"
                />
              </div>
            </WavyFrame>
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
                <span className="hand-underline">{t('who_am_i_highlight')}</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
