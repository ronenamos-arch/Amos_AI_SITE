import type { Metadata } from "next";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialCarousel } from "@/components/ui/TestimonialCarousel";
import { featuredCourse, gridCourses } from "@/lib/courses";
import { testimonials } from "@/lib/testimonials";

export const metadata: Metadata = {
    title: "הנבחרת: כל הקורסים וההדרכות",
    description:
        "גלו את מגוון ההדרכות והקורסים של רונן עמוס: AI Finance Master, AI לכספים, ו-Notebook Master. הכלים שיהפכו אותך לאיש כספים של המאה ה-21.",
    alternates: {
        canonical: "https://www.ronenamoscpa.co.il/courses",
    },
};

export default function CoursesHubPage() {
    return (
        <div className="pt-24 pb-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeading
                    title="הנבחרת: כל הקורסים וההדרכות"
                    subtitle="בחרו את המסלול שלכם לטרנספורמציה דיגיטלית בעולם הכספים"
                    gradient
                />

                {/* Featured Course Hero Section */}
                <div className="mb-16 mt-12">
                    <GlassCard className="!p-0 overflow-hidden border-t-4 border-teal-400 flex flex-col md:flex-row-reverse items-stretch">
                        {/* Image Section (visual-right due to RTL) */}
                        <div className="relative w-full md:w-1/2 aspect-[16/9] md:aspect-auto overflow-hidden">
                            <img
                                src={featuredCourse.image}
                                alt={featuredCourse.title}
                                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-l from-space-950 via-transparent to-transparent" />
                            <div className="absolute top-4 right-4">
                                <Badge variant="teal">החדש שלנו</Badge>
                            </div>
                        </div>

                        {/* Text Section (visual-left due to RTL) */}
                        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                            <div className="space-y-6">
                                <h2 className="text-4xl sm:text-5xl font-black leading-tight">
                                    {featuredCourse.title}
                                </h2>
                                <p className="text-text-secondary text-lg leading-relaxed">
                                    {featuredCourse.description}
                                </p>
                                <div className="flex gap-4 pt-4">
                                    <Button href={featuredCourse.href || `/courses/${featuredCourse.slug}`} variant="primary">
                                        פרטי הקורס
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                </div>

                {/* Course Grid */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold mb-10">קורסים נוספים</h2>
                    <div className="grid gap-10 md:grid-cols-2">
                        {gridCourses.map((course) => (
                            <GlassCard
                                key={course.slug}
                                className={`flex flex-col h-full border-t-4 ${course.color === 'teal' ? 'border-teal-400' : 'border-royal-500'} !p-0 overflow-hidden border-b border-r border-l`}
                                style={{
                                    borderBottomColor: '#d4af37',
                                    borderRightColor: '#d4af37',
                                    borderLeftColor: '#d4af37',
                                    borderBottomWidth: '1px',
                                    borderRightWidth: '1px',
                                    borderLeftWidth: '1px',
                                }}
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
                                    <h3 className="text-2xl font-bold mb-4">{course.title}</h3>
                                    <p className="text-text-secondary mb-8 flex-grow leading-relaxed">
                                        {course.description}
                                    </p>

                                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                                        <span className="text-xs text-text-muted font-medium">רמה: {course.level}</span>
                                        <Button href={course.href || `/courses/${course.slug}`} variant={course.color === 'teal' ? 'primary' : 'secondary'}>
                                            לסילבוס המלא והרשמה
                                        </Button>
                                    </div>
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                </div>

                {/* Corporate Training Section */}
                <div className="mt-24">
                    <div className="relative rounded-3xl overflow-hidden border border-white/10">
                        {/* Content above C logo */}
                        <div className="relative z-10 p-8 md:p-16 bg-gradient-to-b from-space-950 via-space-950/80 to-transparent">
                            <div className="flex flex-col md:flex-row-reverse gap-12 md:gap-20">
                                {/* Right Side - Title & Benefits */}
                                <div className="flex-1">
                                    <h2 className="text-4xl sm:text-5xl font-black mb-10 text-text-primary leading-tight">
                                        הדרכות פנים ארגוניות
                                    </h2>

                                    <div className="space-y-5">
                                        {[
                                            "ימי עיון מותאמים לחברתכם",
                                            "הכשרה פנים-ארגונית בכלי AI",
                                            "פתרונות בהתאמה אישית"
                                        ].map((benefit, index) => (
                                            <div key={index} className="flex items-start gap-4">
                                                <div className="w-6 h-6 rounded-full bg-teal-400 flex items-center justify-center flex-shrink-0 mt-1">
                                                    <span className="text-sm font-bold text-space-950">✓</span>
                                                </div>
                                                <p className="text-lg text-white leading-relaxed">{benefit}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-10">
                                        <Button href="/contact" variant="primary">
                                            דברו איתי על הדרכה בארגון שלכם
                                        </Button>
                                    </div>
                                </div>

                                {/* Left Side - Testimonials Carousel */}
                                <div className="flex-1">
                                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 min-h-[320px] md:min-h-[300px]">
                                        <TestimonialCarousel testimonials={testimonials} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* C Logo at the bottom */}
                        <div className="relative z-0 pt-0">
                            <img
                                src="/course-assets/ai-master-course/images/c-logo.png"
                                alt="Claude AI Logo"
                                className="w-full h-auto object-cover opacity-60 rounded-b-2xl"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
