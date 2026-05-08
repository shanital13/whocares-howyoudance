import { Heart } from 'lucide-react';

const Footer = () => (
  <footer className="py-10 px-6 border-t border-border/30 bg-background text-center">
    <p className="font-display text-primary text-lg mb-2 flex items-center justify-center gap-2">
      למי אכפת איך את רוקדת
      <Heart className="h-4 w-4 text-primary fill-primary" />
    </p>
    <p className="text-sm text-muted-foreground">
      © {new Date().getFullYear()} כל הזכויות שמורות
    </p>
  </footer>
);

export default Footer;
