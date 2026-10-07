import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPlayerCourse } from "@/lib/courses-player-data";
import { checkCourseAccess } from "@/lib/course-access";
import { CoursePlayer } from "@/components/courses/CoursePlayer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "נגן הקורס: Mastering NotebookLM | רונן עמוס",
  description: "אזור הלמידה והצפייה האינטראקטיבי: 8 שיעורים, מחברות Grounded AI, מראי מקום וחוברות תרגול.",
  robots: { index: false, follow: false },
};

export default async function NotebookMasterLearnPage() {
  const course = getPlayerCourse("notebook-master");
  if (!course) {
    notFound();
  }

  const access = await checkCourseAccess("notebook-master");

  return (
    <CoursePlayer
      course={course}
      hasAccess={access.hasAccess}
      accessReason={access.reason}
      userEmail={access.userEmail}
    />
  );
}
