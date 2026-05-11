import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const WHATSAPP_NUMBER = '972501234567';

const ContactSection = () => {
  const [form, setForm] = useState({ name: '', contact: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `היי! שמי ${form.name}\nיצירת קשר: ${form.contact}\n\n${form.message}`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      '_blank'
    );
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-6 bg-hoodie-magenta relative overflow-hidden">
      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-white/80 mb-4 font-sans">
            Contact
          </p>
          <div className="bg-background py-8 px-6 rounded-sm">
            <h2 className="text-3xl md:text-5xl text-hoodie-gradient font-display leading-[1.15]">
              מתרגשת לקראת התנועה החדשה שלך בעולם?
            </h2>
          </div>
          <p className="text-white/90 text-lg md:text-xl mt-6">
            מוזמנת לשאול הכל, אחזור אלייך בהקדם.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            required
            placeholder="השם שלך"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-background text-foreground px-4 py-3 rounded-sm border border-white/20 focus:outline-none focus:border-hoodie-yellow"
          />
          <input
            type="text"
            required
            placeholder="טלפון או אימייל"
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
            className="w-full bg-background text-foreground px-4 py-3 rounded-sm border border-white/20 focus:outline-none focus:border-hoodie-yellow"
          />
          <textarea
            required
            placeholder="מה בא לך לשאול?"
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full bg-background text-foreground px-4 py-3 rounded-sm border border-white/20 focus:outline-none focus:border-hoodie-yellow resize-none"
          />
          <button
            type="submit"
            className="btn-rect w-full bg-hoodie-yellow text-hoodie-magenta text-lg py-4 gap-2"
          >
            <MessageCircle className="h-5 w-5" />
            שלחי לי הודעה
          </button>
        </motion.form>

        <p className="text-white/70 text-center text-sm mt-6">
          השליחה פותחת ואצאפ ישיר אליי
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
