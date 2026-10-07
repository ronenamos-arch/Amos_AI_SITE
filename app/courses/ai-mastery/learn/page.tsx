import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPlayerCourse } from "@/lib/courses-player-data";
import { checkCourseAccess } from "@/lib/course-access";
import { CoursePlayer } from "@/components/courses/CoursePlayer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "נגן הקורס: AI לכספים: המדריך למתחילים | רונן עמוס",
  description: "אזור הלמידה והצפייה האינטראקטיבי: 8 שיעורים, מצגות מוטמעות, ספריית פרומפטים וחוברות תרגול.",
  robots: { index: false, follow: false },
};

export default async function AiMasteryLearnPage() {
  const course = getPlayerCourse("ai-mastery");
  if (!course) {
    notFound();
  }

  const access = await checkCourseAccess("ai-mastery");

  return (
    <CoursePlayer
      course={course}
      hasAccess={access.hasAccess}
      accessReason={access.reason}
      userEmail={access.userEmail}
    />
  );
}
