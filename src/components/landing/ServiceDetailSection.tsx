import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

interface ServiceDetailProps {
  id: string;
  title: string;
  description: string[];
  bgClass: string;
  ctaText?: string;
  ctaLink?: string;
  reverse?: boolean;
}

const WHATSAPP_NUMBER = '972501234567';
const WHATSAPP_MESSAGE = 'היי! אני מעוניינת לשמוע עוד ​';

const ServiceDetailSection = ({
  id,
  title,
  description,
  bgClass,
  ctaText = 'רוצה לשמוע עוד?',
  ctaLink,
  reverse = false,
}: ServiceDetailProps) => {
  const whatsappUrl = ctaLink || `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <section
      id={id}
      className={`py-20 md:py-28 px-6 relative overflow-hidden ${bgClass}`}
    >
      <div className={`max-w-5xl mx-auto flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 md:gap-16`}>
        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex-1 text-center md:text-right"
        >
          <h3 className="text-3xl md:text-4xl text-foreground mb-6">
            {title}
          </h3>
          <div className="space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed mb-8">
            {description.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-primary-foreground text-base shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <MessageCircle className="h-5 w-5" />
            {ctaText}
          </a>
        </motion.div>

        {/* Decorative placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full max-w-xs md:max-w-sm aspect-square rounded-3xl bg-foreground/5 flex items-center justify-center"
        >
          <span className="text-6xl">​</span>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceDetailSection;
