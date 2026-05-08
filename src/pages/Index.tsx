import HeroSection from '@/components/landing/HeroSection';
import AboutSection from '@/components/landing/AboutSection';
import ServicesSection from '@/components/landing/ServicesSection';
import ServiceDetailSection from '@/components/landing/ServiceDetailSection';
import ContactSection from '@/components/landing/ContactSection';
import Footer from '@/components/landing/Footer';

const serviceDetails = [
  {
    id: 'classes-copenhagen',
    title: 'השיעורים שלנו בקופנהגן',
    description: [
      'שיעורי ריקוד וזוז בסטודיו בקופנהגן — מקום שבו אפשר לנשום, לזוז ולהרגיש חופשיה.',
      'השיעורים מתאימים לכל רמה, עם דגש על הנאה ותנועה חופשית.',
      'בואי לגלות את הגוף שלך מחדש דרך ריקוד.',
    ],
    bgClass: 'bg-neon-purple/15',
  },
  {
    id: 'online-classes',
    title: 'שיעורים בONLINE',
    description: [
      'רוקדות מכל מקום בעולם — מהסלון, מהחדר, מהגינה.',
      'שיעורים חיים בזום עם אנרגיה של סטודיו אמיתי.',
      'את צריכה רק מקום קטן, בגדים נוחים ורצון לזוז.',
    ],
    bgClass: 'bg-neon-pink/10',
    reverse: true,
  },
  {
    id: 'workshops',
    title: 'סדנאות וריטריטים',
    description: [
      'חוויות ריקוד מעמיקות — סדנאות של כמה שעות או ריטריטים של סוף שבוע.',
      'זמן לצלול פנימה, לגלות שכבות חדשות בתנועה ולפגוש נשים מדהימות.',
      'כל סדנה היא מסע קטן.',
    ],
    bgClass: 'bg-neon-coral/10',
  },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      {serviceDetails.map((service) => (
        <ServiceDetailSection key={service.id} {...service} />
      ))}
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
