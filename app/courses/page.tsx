import type { Metadata } from "next";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
    title: "הנבחרת: כל הקורסים וההדרכות",
    description:
        "גלו את מגוון ההדרכות והקורסים של רונן עמוס: מ-AI Mastery ועד Notebook Master. הכלים שיהפכו אותך לאיש כספים של המאה ה-21.",
};

const courses = [
    {
        slug: "ai-mastery",
        title: "AI FINANCE Mastery",
        description: "ChatGPT לפיננסים וחשבונאות ארגונית. קורס מקיף של 8 שיעורים שיהפוך אותך לחשבונאי של העתיד.",
        duration: "8 שיעורים",
        level: "מתחילים - מתקדמים",
        icon: "🤖",
        color: "teal",
        image: "/images/courses/ai-mastery-syllabus.png"
    },
    {
        slug: "notebook-master",
        title: "Mastering NotebookLM: קורס מעשי לאנשי פיננסים",
        description: "שלטו ב-NotebookLM להכנה לדירקטוריון, Deep Research ומצוינות רגולטורית ללא הזיות. 8 שיעורים של פרקטיקה.",
        duration: "8 שיעורים",
        level: "מתחילים - מתקדמים",
        icon: "📓",
        color: "royal",
        image: "/images/courses/notebook-master-syllabus.png"
    }
];

export default function CoursesHubPage() {
    return (
        <div className="pt-24 pb-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeading
                    title="הנבחרת: כל הקורסים וההדרכות"
                    subtitle="בחרו את המסלול שלכם לטרנספורמציה דיגיטלית בעולם הכספים"
                    gradient
                />

                <div className="grid gap-10 md:grid-cols-2">
                    {courses.map((course) => (
                        <GlassCard
                            key={course.slug}
                            className={`flex flex-col h-full border-t-4 ${course.color === 'teal' ? 'border-teal-400' : 'border-royal-500'} !p-0 overflow-hidden`}
                        >
                            {/* Syllabus Preview Image */}
                            <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-white/5">
                                <img
                                    src={course.image}
                                    alt={`${course.title} Syllabus`}
                                    className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-space-950 via-space-950/20 to-transparent" />
                                <div className="absolute top-4 right-4">
                                    <Badge variant={course.color as any}>{course.duration}</Badge>
                                </div>
                            </div>

                            <div className="p-8 pt-6 flex flex-col flex-grow">
                                <h2 className="text-2xl font-bold mb-4">{course.title}</h2>
                                <p className="text-text-secondary mb-8 flex-grow leading-relaxed">
                                    {course.description}
                                </p>

                                <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                                    <span className="text-xs text-text-muted font-medium">רמה: {course.level}</span>
                                    <Button href={`/courses/${course.slug}`} variant={course.color === 'teal' ? 'primary' : 'secondary'}>
                                        לסילבוס המלא והרשמה
                                    </Button>
                                </div>
                            </div>
                        </GlassCard>
                    ))}
                </div>

                {/* Custom Training CTA */}
                <div className="mt-20 glass-panel p-10 rounded-3xl text-center border border-white/5">
                    <h3 className="text-2xl font-bold mb-4">צריכים הדרכה מותאמת אישית לארגון?</h3>
                    <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
                        אני מקיים ימי עיון והכשרות פנים-ארגוניות המותאמות בדיוק לצרכים ולמערכות של מחלקת הכספים שלכם.
                    </p>
                    <Button href="/contact" variant="ghost">
                        דברו איתי על הדרכה בארגון
                    </Button>
                </div>
            </div>
        </div>
    );
}
