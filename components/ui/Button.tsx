import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

const variants = {
  primary:
    "bg-teal-400 text-space-950 font-semibold hover:bg-teal-300 hover:shadow-lg hover:shadow-teal-400/20 disabled:bg-teal-400/50 disabled:cursor-not-allowed",
  secondary:
    "bg-royal-500 text-white font-semibold hover:bg-royal-400 hover:shadow-lg hover:shadow-royal-500/20 disabled:bg-royal-500/50 disabled:cursor-not-allowed",
  ghost:
    "text-text-secondary border border-glass-border hover:bg-glass-light hover:text-teal-400 disabled:opacity-50 disabled:cursor-not-allowed",
};

const sizes = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-base rounded-xl",
  lg: "px-8 py-4 text-lg rounded-xl",
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const baseClasses = `inline-flex items-center justify-center transition-all duration-300 ${variants[variant]} ${sizes[size]} ${className}`;

  if (href && !disabled) {
    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={baseClasses}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
