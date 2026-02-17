interface BadgeProps {
  children: React.ReactNode;
  variant?: "teal" | "royal" | "muted";
  className?: string;
}

const badgeVariants = {
  teal: "bg-teal-400/10 text-teal-400 border-teal-400/20",
  royal: "bg-royal-500/10 text-royal-400 border-royal-500/20",
  muted: "bg-glass-light text-text-secondary border-glass-border",
};

export function Badge({ children, variant = "teal", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${badgeVariants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
