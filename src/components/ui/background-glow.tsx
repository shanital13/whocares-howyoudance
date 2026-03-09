import { cn } from "@/lib/utils";

interface BackgroundGlowProps {
  children: React.ReactNode;
  className?: string;
}

export const BackgroundGlow = ({ children, className }: BackgroundGlowProps) => {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Soft pastel glow blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -right-24 h-[500px] w-[500px] rounded-full bg-primary/15 blur-[120px]" />
        <div className="absolute top-1/3 -left-32 h-[400px] w-[400px] rounded-full bg-secondary/15 blur-[120px]" />
        <div className="absolute -bottom-20 right-1/4 h-[350px] w-[350px] rounded-full bg-accent/20 blur-[100px]" />
      </div>
      {children}
    </div>
  );
};
