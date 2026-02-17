"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 500, suffix: "+", label: "שעות עבודה נחסכו ללקוחות" },
  { value: 99.5, suffix: "%", label: "דיוק בהכרת הכנסות", decimal: true },
  { value: 50, suffix: "+", label: "חברות קיבלו ייעוץ" },
  { value: 24, suffix: " שעות", label: "להטמעת דשבורד Power BI" },
];

function CountUp({
  target,
  suffix,
  decimal,
}: {
  target: number;
  suffix: string;
  decimal?: boolean;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(current);
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-4xl font-bold text-teal-400 sm:text-5xl">
      {decimal ? count.toFixed(1) : Math.floor(count)}
      {suffix}
    </div>
  );
}

export function Stats() {
  return (
    <section className="border-y border-glass-border bg-space-900/50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <CountUp
                target={stat.value}
                suffix={stat.suffix}
                decimal={stat.decimal}
              />
              <p className="mt-2 text-sm text-text-secondary">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
