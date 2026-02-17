interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className = "", hover = true }: GlassCardProps) {
  return (
    <div
      className={`glass rounded-2xl p-6 ${
        hover
          ? "transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-400/5"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
