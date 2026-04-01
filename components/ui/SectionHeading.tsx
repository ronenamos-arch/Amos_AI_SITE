interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  gradient?: boolean;
  className?: string;
  as?: "h1" | "h2";
}

export function SectionHeading({
  title,
  subtitle,
  gradient = false,
  className = "",
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 text-center ${className}`}>
      <Tag
        className={`text-3xl font-bold sm:text-4xl ${
          gradient ? "gradient-text" : "text-text-primary"
        }`}
      >
        {title}
      </Tag>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
          {subtitle}
        </p>
      )}
    </div>
  );
}
