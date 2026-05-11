import { Heart } from 'lucide-react';

const Footer = () => (
  <footer className="py-12 px-6">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-right">
      <p className="text-foreground text-lg font-display flex items-center gap-2">
        למי אכפת איך את רוקדת
        <Heart className="h-4 w-4 text-hoodie-coral fill-hoodie-coral" />
      </p>
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} כל הזכויות שמורות
      </p>
    </div>
  </footer>
);

export default Footer;
