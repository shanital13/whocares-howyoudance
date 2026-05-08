import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const WHATSAPP_NUMBER = '972501234567';
const WHATSAPP_MESSAGE = 'היי! אני מעוניינת לשמוע עוד על השיעורים 💃';

const ContactSection = () => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <section id="contact" className="py-20 md:py-28 px-6 relative overflow-hidden bg-neon-coral">
      {/* Wavy decorative lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.08]" viewBox="0 0 1200 600" fill="none">
        <path d="M -100 200 Q 300 50, 600 200 T 1300 150" stroke="hsl(var(--neon-yellow))" strokeWidth="3" />
        <path d="M -50 350 Q 350 200, 650 350 T 1200 300" stroke="hsl(var(--background))" strokeWidth="2" />
      </svg>

      <div className="max-w-3xl mx-auto relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4"
        >
          מוכנה להתחיל לרקוד?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-body text-foreground/80 text-lg md:text-xl mb-10"
        >
          השאירי פרטים ואחזור אלייך
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
            className="inline-flex items-center gap-3 bg-neon-yellow text-foreground font-display text-xl md:text-2xl px-12 py-5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
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
          <p className="font-body text-foreground/90 text-lg">מוזמנת לשאול הכל !!</p>
          <p className="font-body text-foreground/70 text-base">זמין לך בוואצאפ</p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
