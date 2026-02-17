interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  gradient?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  gradient = false,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 text-center ${className}`}>
      <h2
        className={`text-3xl font-bold sm:text-4xl ${
          gradient ? "gradient-text" : "text-text-primary"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
          {subtitle}
        </p>
      )}
    </div>
  );
}
