import { Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

const WHATSAPP_URL = 'https://wa.me/972526398428';
const INSTAGRAM_URL =
  'https://www.instagram.com/yogevatias?igsh=cm01NXlqaTZvcXMx&utm_source=qr';

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 px-6 overflow-hidden"
    >
      <div className="max-w-2xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-hoodie-coral mb-4 font-sans">
            ​
          </p>
          <h2 className="text-3xl md:text-5xl text-hoodie-gradient font-display leading-[1.15]">
            מתרגשת לקראת התנועה החדשה שלך בעולם?
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl mt-6 font-sans">
            דברי איתי בוואצאפ או באינסטגרם :)
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* WhatsApp button */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full text-white text-lg font-sans font-semibold shadow-[0_15px_30px_-10px_rgba(37,211,102,0.55)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_40px_-10px_rgba(37,211,102,0.65)] active:scale-95"
            style={{ backgroundColor: '#25D366' }}
            aria-label="פתחי שיחה בוואצאפ"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
            שלחי לי הודעה
          </a>

          {/* Instagram icon button */}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-14 w-14 rounded-full text-white ring-2 ring-white/70 shadow-[0_18px_40px_-10px_rgba(214,36,159,0.65)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_48px_-10px_rgba(214,36,159,0.75)] active:scale-95"
            style={{
              background:
                'radial-gradient(circle at 30% 110%, #FDF497 0%, #FDF497 5%, #FD5949 45%, #D6249F 60%, #285AEB 90%)',
            }}
            aria-label="עקבי אחריי באינסטגרם"
          >
            <Instagram className="h-6 w-6" strokeWidth={2} />
          </a>
        </motion.div>

        <p className="text-muted-foreground/80 text-sm mt-8 font-sans">
          מוזמנת לשאול הכל.
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
