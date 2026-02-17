import { SectionHeading } from "@/components/ui/SectionHeading";

const problems = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "עבודה ידנית מתישה",
    description: "דוחות שלוקחים ימים להכנה, העתקה-הדבקה אינסופית בין מערכות",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
    title: "טעויות אנוש יקרות",
    description: "טעויות בהכרת הכנסות (ASC 606/IFRS 15) שעלולות לעלות במיליונים",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "חוסר תובנות בזמן אמת",
    description: "מנכ\"ל שואל \"איפה אנחנו עומדים?\" - והתשובה מגיעה רק בסוף החודש",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375" />
      </svg>
    ),
    title: "תלות במערכות יקרות",
    description: "מערכות ERP מסורבלות שדורשות צוות IT ייעודי",
  },
];

export function Problems() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="הבעיה שאני פותר"
          subtitle="מחלקות כספים בארגונים קטנים-בינוניים מתמודדות עם אתגרים שעולים להן ביוקר"
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {problems.map((problem) => (
            <div
              key={problem.title}
              className="glass-light flex gap-4 rounded-xl p-6"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                {problem.icon}
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">
                  {problem.title}
                </h3>
                <p className="mt-1 text-sm text-text-secondary">
                  {problem.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
