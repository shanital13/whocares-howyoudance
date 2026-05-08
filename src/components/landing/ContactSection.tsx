import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const WHATSAPP_NUMBER = '972501234567';
const WHATSAPP_MESSAGE = 'היי! אני מעוניינת לשמוע עוד על השיעורים 💃';

const ContactSection = () => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <section id="contact" className="py-20 md:py-28 px-6 relative overflow-hidden">
      {/* Rich gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-coral via-neon-pink to-neon-purple" />
      
      {/* Logo watermark pattern */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="text-white/[0.04] text-[12rem] md:text-[20rem] font-bold leading-none select-none whitespace-nowrap rotate-[-12deg]">
          💃 למי איכפת 💃
        </div>
      </div>
      
      {/* Secondary watermark layer */}
      <div className="absolute top-[10%] left-[-5%] text-white/[0.03] text-[8rem] md:text-[14rem] font-bold leading-none select-none whitespace-nowrap rotate-[8deg] pointer-events-none">
        רוקדת
      </div>

      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />

      {/* Wavy decorative lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.06]" viewBox="0 0 1200 600" fill="none">
        <path d="M -100 200 Q 300 50, 600 200 T 1300 150" stroke="white" strokeWidth="3" />
        <path d="M -50 350 Q 350 200, 650 350 T 1200 300" stroke="white" strokeWidth="2" />
        <path d="M -80 450 Q 400 350, 700 480 T 1300 400" stroke="white" strokeWidth="2" />
      </svg>

      <div className="max-w-3xl mx-auto relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl lg:text-6xl text-white mb-4 drop-shadow-md"
        >
          מוכנה להתחיל לרקוד?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-white/90 text-lg md:text-xl mb-10"
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
            className="inline-flex items-center gap-3 bg-white text-foreground text-xl md:text-2xl px-12 py-5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
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
          <p className="text-white/95 text-lg">השאירי פרטים ואחזור אלייך :)</p>
          <p className="text-white/70 text-base">זמין לך בוואצאפ</p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
