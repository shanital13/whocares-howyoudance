import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const WHATSAPP_NUMBER = '972501234567';
const WHATSAPP_MESSAGE = 'היי! אני מעוניינת לשמוע עוד על השיעורים 💃';

const ContactSection = () => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <section id="contact" className="py-20 md:py-28 px-6 relative overflow-hidden bg-background">
      <div className="max-w-3xl mx-auto relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl lg:text-6xl mb-4 drop-shadow-md text-rainbow font-display"
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
            className="inline-flex items-center gap-3 bg-[#25D366] text-white text-xl md:text-2xl px-12 py-5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#20bd5a]"
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
