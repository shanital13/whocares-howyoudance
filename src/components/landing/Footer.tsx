import { Heart } from 'lucide-react';
import WaveLines from '@/components/decor/WaveLines';
import TropicalLeaf from '@/components/decor/TropicalLeaf';

const Footer = () => (
  <footer className="relative py-12 px-6 bg-background text-center overflow-hidden">
    <WaveLines
      color="hsl(var(--hoodie-teal))"
      className="absolute top-0 left-0 w-full h-8 opacity-50"
    />
    <div className="relative z-10">
      <div className="flex justify-center mb-3">
        <TropicalLeaf
          color="hsl(var(--hoodie-coral))"
          variant="palm"
          className="w-8 h-10 opacity-80"
        />
      </div>
      <p className="text-primary text-lg mb-2 flex items-center justify-center gap-2 font-display">
        למי אכפת איך את רוקדת
        <Heart className="h-4 w-4 text-primary fill-primary" />
      </p>
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} כל הזכויות שמורות
      </p>
    </div>
  </footer>
);

export default Footer;
