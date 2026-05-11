import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import SunArc from '@/components/decor/SunArc';
import Coconut from '@/components/decor/Coconut';
import WaveLines from '@/components/decor/WaveLines';
import Sparkle from '@/components/decor/Sparkle';

const WHATSAPP_NUMBER = '972501234567';
const WHATSAPP_MESSAGE = 'היי! אני מעוניינת לשמוע עוד על השיעורים ​';

const ContactSection = () => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <section id="contact" className="py-24 md:py-32 px-6 relative overflow-hidden bg-background">
      <WaveLines
        color="hsl(var(--hoodie-coral))"
        className="absolute top-0 left-0 w-full h-10 opacity-60"
      />
      <SunArc
        color="hsl(var(--hoodie-teal))"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[460px] opacity-[0.12]"
      />
      <Coconut
        color="hsl(var(--hoodie-orange))"
        className="absolute -bottom-6 -left-6 md:bottom-0 md:left-4 w-36 h-56 md:w-48 md:h-72 opacity-70"
      />
      <Coconut
        color="hsl(var(--hoodie-teal))"
        className="absolute -bottom-8 -right-8 md:bottom-0 md:right-4 w-32 h-52 md:w-44 md:h-68 opacity-60 -scale-x-100"
      />
      <Sparkle color="hsl(var(--hoodie-yellow))" className="absolute top-20 right-16 w-5 h-5 opacity-80" />
      <Sparkle color="hsl(var(--hoodie-magenta))" className="absolute top-32 left-20 w-4 h-4 opacity-70" />

      <div className="max-w-3xl mx-auto relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl lg:text-6xl mb-4 text-hoodie-gradient font-display leading-[1.1]"
        >
          מתרגשת לקראת התנועה החדשה שלך בעולם?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-muted-foreground text-lg md:text-xl mb-10"
        >
          מוזמנת לשאול הכל !!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-10"
        >
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bubble-btn inline-flex items-center gap-3 bg-[#25D366] text-white text-xl md:text-2xl px-12 py-5 hover:scale-105 hover:bg-[#20bd5a]"
          >
            <MessageCircle className="h-7 w-7" strokeWidth={2} />
            דברי איתי
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-1"
        >
          <p className="text-muted-foreground text-lg">השאירי פרטים ואחזור אלייך :)</p>
          <p className="text-muted-foreground/70 text-base">זמין לך בוואצאפ</p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
