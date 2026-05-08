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
      className="relative py-24 md:py-36 px-6 overflow-hidden"
    >
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(280,40%,12%)] via-[hsl(300,30%,18%)] to-[hsl(340,35%,14%)]" />
      
      {/* Soft neon glow accents */}
      <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full bg-neon-pink/8 blur-[150px]" />
      <div className="absolute bottom-[-10%] left-[-8%] w-[45vw] h-[45vw] max-w-[450px] max-h-[450px] rounded-full bg-neon-purple/10 blur-[130px]" />
      <div className="absolute top-[40%] left-[30%] w-[30vw] h-[30vw] max-w-[300px] max-h-[300px] rounded-full bg-neon-cyan/5 blur-[120px]" />
      
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[#f2f2f2]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl lg:text-6xl text-white mb-12 md:mb-16 text-center drop-shadow-lg font-sans"
        >
          {t('who_am_i_title')}
        </motion.h2>

        {/* Two-column layout */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-16 text-red-400">
          {/* Right column: Text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex-1 text-center md:text-right"
          >
            <p className="text-white text-xl md:text-2xl font-medium mb-6 leading-relaxed font-sans">
              {t('who_am_i_intro')}
            </p>

            <div className="space-y-4 text-white/80 text-base md:text-lg leading-relaxed">
              <p className="font-sans">{t('who_am_i_paragraph_1')}</p>
              <p className="font-sans">{t('who_am_i_paragraph_2')}</p>
              <p className="text-white font-medium text-lg md:text-xl font-sans">
                {t('who_am_i_highlight')}
              </p>
            </div>
          </motion.div>

          {/* Left column: Vertical Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full max-w-[280px] md:max-w-[320px] flex-shrink-0"
          >
            <div className="relative">
              {/* Subtle glow behind video */}
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
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
