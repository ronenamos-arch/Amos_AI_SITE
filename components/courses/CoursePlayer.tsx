"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  PlayerCourse, 
  CourseLesson 
} from "@/lib/courses-player-data";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { 
  PlayCircle, 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  ArrowLeft, 
  Copy, 
  Check, 
  Download, 
  ExternalLink, 
  Lock, 
  Sparkles, 
  BookOpen, 
  Clock, 
  ChevronRight,
  FileText
} from "lucide-react";
import { SMARTBEE_CONFIG } from "@/lib/smartbee-config";

interface CoursePlayerProps {
  course: PlayerCourse;
  hasAccess: boolean;
  accessReason: string;
  userEmail?: string | null;
}

export function CoursePlayer({
  course,
  hasAccess,
  accessReason,
  userEmail,
}: CoursePlayerProps) {
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [copiedPromptIndex, setCopiedPromptIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"video" | "presentation" | "master">("presentation");

  const activeLesson: CourseLesson = course.lessons[activeLessonIndex] || course.lessons[0];

  // Auto-switch to video view if available when lesson changes
  useEffect(() => {
    if (activeLesson.videoUrl) {
      setViewMode("video");
    } else {
      setViewMode("presentation");
    }
  }, [activeLessonIndex, activeLesson.videoUrl]);

  // Load completed lessons from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`course_progress_${course.slug}`);
      if (saved) {
        setCompletedLessons(JSON.parse(saved));
      }
    } catch {
      // Ignore localStorage errors
    }
  }, [course.slug]);

  const toggleLessonCompleted = (lessonId: number) => {
    setCompletedLessons((prev) => {
      const next = prev.includes(lessonId)
        ? prev.filter((id) => id !== lessonId)
        : [...prev, lessonId];
      try {
        localStorage.setItem(`course_progress_${course.slug}`, JSON.stringify(next));
      } catch {
        // Ignore
      }
      return next;
    });
  };

  const handleCopyPrompt = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedPromptIndex(index);
    setTimeout(() => setCopiedPromptIndex(null), 2500);
  };

  const progressPercent = Math.round(
    (completedLessons.length / course.lessons.length) * 100
  );

  // If user does NOT have access, render the High-Converting Paywall Screen
  if (!hasAccess) {
    return (
      <div className="relative min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-slate-100 font-primary pt-24 pb-20 overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[-10%] right-[-10%] w-[55%] h-[55%] bg-teal-500/20 blur-[150px] rounded-full" />
          <div className="absolute bottom-[10%] left-[-10%] w-[45%] h-[45%] bg-royal-600/20 blur-[140px] rounded-full" />
        </div>

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-8">
            <Link href="/courses" className="hover:text-teal-300 transition-colors">
              כל הקורסים
            </Link>
            <ChevronRight className="w-4 h-4 rotate-180" />
            <Link href={`/courses/${course.slug}`} className="hover:text-teal-300 transition-colors">
              {course.title}
            </Link>
            <ChevronRight className="w-4 h-4 rotate-180" />
            <span className="text-white font-medium">נגן הקורס המאובטח</span>
          </div>

          <div className="p-8 sm:p-14 text-center border border-slate-700/70 border-t-4 border-t-teal-400 relative overflow-hidden bg-slate-900/90 backdrop-blur-xl rounded-3xl shadow-2xl">
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-teal-400/15 border border-teal-400/30 text-teal-300 shadow-lg shadow-teal-500/10">
              <Lock className="h-10 w-10 text-teal-300" />
            </div>

            <Badge variant="teal" className="mb-4 mx-auto w-fit block text-sm">
              תוכן נעול למנויים ורוכשים
            </Badge>

            <h1 className="text-3xl sm:text-5xl font-black mb-4 text-white leading-tight">
              {course.title}
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              השיעורים, המצגות המוטמעות, חוברות התרגול וספריית הפרומפטים פתוחים לכל בעלי <strong className="text-white">מנוי Pro פעיל</strong> או למי שרכש את הקורס בנפרד.
            </p>

            <div className="grid gap-6 md:grid-cols-2 text-right mb-10">
              {/* Option 1: Join Pro */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-teal-500/15 to-slate-900/80 border-2 border-teal-400/50 relative flex flex-col justify-between hover:border-teal-400 shadow-xl transition-all">
                <div className="absolute top-3 left-3">
                  <Badge variant="teal">המשתלם ביותר ⚡</Badge>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">מנוי חודשי AI Finance Pro</h3>
                  <div className="text-3xl font-black text-teal-300 mb-4">
                    ₪100 <span className="text-sm font-normal text-slate-300">/ חודש</span>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-200 mb-6">
                    <li className="flex items-center gap-2 text-white">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" />
                      <span>גישה חופשית לקורס זה + לכל הקורסים הבסיסיים</span>
                    </li>
                    <li className="flex items-center gap-2 text-white">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" />
                      <span>גישה מלאה לספריית ה-Skill Vault ו-25+ מדריכים</span>
                    </li>
                    <li className="flex items-center gap-2 text-white">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" />
                      <span>ביטול עצמי בכל עת ללא התחייבות</span>
                    </li>
                  </ul>
                </div>
                <a
                  href={SMARTBEE_CONFIG.products.monthlySubscription.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-center py-4 px-6 font-bold bg-gradient-to-r from-teal-400 to-teal-500 text-slate-950 rounded-xl shadow-lg shadow-teal-500/25 hover:scale-[1.02] transition-transform"
                >
                  הצטרף ל-Pro ב-₪100 לחודש
                </a>
              </div>

              {/* Option 2: Buy Standalone */}
              <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 relative flex flex-col justify-between hover:border-slate-600 shadow-xl transition-all">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">רכישת קורס זה בלבד</h3>
                  <div className="text-3xl font-black text-white mb-4">
                    ₪{course.price} <span className="text-sm font-normal text-slate-400">תשלום חד-פעמי</span>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-300 mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" />
                      <span>גישה לכל החיים ל-8 השיעורים</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" />
                      <span>כולל עדכונים וחוברות תרגול</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" />
                      <span>חשבונית מס / קבלה מיידית במייל</span>
                    </li>
                  </ul>
                </div>
                <a
                  href={course.smartbeeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-center py-4 px-6 font-bold bg-slate-700/80 hover:bg-slate-700 text-white border border-slate-600 rounded-xl hover:scale-[1.02] transition-transform"
                >
                  רכישת קורס בודד — ₪{course.price}
                </a>
              </div>
            </div>

            {/* Already purchased / Log in */}
            <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-400">
              <span>כבר רכשת את הקורס או יש לך מנוי?</span>
              <Link href={`/login?returnUrl=/courses/${course.slug}/learn`} className="text-teal-300 hover:underline font-bold">
                התחבר לחשבונך כאן ←
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Determine current active embed URL and fallback link based on active view mode
  let currentEmbedUrl = activeLesson.embedUrl;
  let currentFallbackUrl = activeLesson.fallbackUrl || activeLesson.presentationUrl;

  if (viewMode === "video" && activeLesson.videoUrl) {
    currentEmbedUrl = activeLesson.videoUrl;
    currentFallbackUrl = activeLesson.videoUrl.replace("/preview", "/view?usp=sharing");
  } else if (viewMode === "master" && course.masterGammaUrl) {
    currentEmbedUrl = course.masterGammaUrl;
    currentFallbackUrl = course.masterFallbackUrl || course.masterGammaUrl;
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-slate-100 font-primary pt-20 pb-20">
      {/* Ambient background lighting glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[5%] right-[10%] w-[650px] h-[500px] bg-teal-500/12 blur-[160px] rounded-full" />
        <div className="absolute bottom-[20%] left-[5%] w-[550px] h-[450px] bg-royal-600/12 blur-[150px] rounded-full" />
      </div>

      {/* Top Bar / Breadcrumb & Progress */}
      <div className="bg-slate-900/90 border-b border-slate-800 sticky top-16 z-30 backdrop-blur-xl shadow-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Link href="/dashboard" className="text-slate-400 hover:text-teal-300 transition-colors">
                האזור האישי
              </Link>
              <ChevronRight className="w-4 h-4 rotate-180 text-slate-500" />
              <Link href="/courses" className="text-slate-400 hover:text-teal-300 transition-colors">
                קורסים
              </Link>
              <ChevronRight className="w-4 h-4 rotate-180 text-slate-500" />
              <span className="font-bold text-teal-300">{course.title}</span>
            </div>

            {/* Progress status */}
            <div className="flex items-center gap-4">
              <div className="text-xs text-slate-300">
                התקדמות: <span className="font-bold text-white">{completedLessons.length}</span> מתוך <span className="font-bold text-white">{course.lessons.length}</span> שיעורים ({progressPercent}%)
              </div>
              <div className="w-36 bg-slate-800 rounded-full h-2.5 overflow-hidden border border-slate-700/60">
                <div 
                  className="bg-gradient-to-r from-teal-400 via-cyan-400 to-royal-400 h-full rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(45,212,191,0.5)]" 
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Stage (8 cols on lg) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Embedded Lesson / Course Viewer */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/70 bg-slate-900/90 shadow-2xl backdrop-blur-xl">
              {/* Top View Mode Switcher */}
              <div className="p-3.5 bg-slate-900/95 border-b border-slate-700/70 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {activeLesson.videoUrl && (
                    <button
                      onClick={() => setViewMode("video")}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                        viewMode === "video"
                          ? "bg-teal-400 text-slate-950 shadow-md shadow-teal-500/30"
                          : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60"
                      }`}
                    >
                      <PlayCircle className="w-3.5 h-3.5" />
                      <span>וידאו השיעור 🎬</span>
                    </button>
                  )}

                  <button
                    onClick={() => setViewMode("presentation")}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      viewMode === "presentation"
                        ? "bg-teal-400 text-slate-950 shadow-md shadow-teal-500/30"
                        : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60"
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>מצגת שיעור {activeLesson.id} (PDF)</span>
                  </button>

                  {course.masterGammaUrl && (
                    <button
                      onClick={() => setViewMode("master")}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                        viewMode === "master"
                          ? "bg-royal-500 text-white shadow-md shadow-royal-500/30 font-bold"
                          : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60"
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-royal-300" />
                      <span>מצגת המאסטר (Gamma)</span>
                    </button>
                  )}
                </div>

                {currentFallbackUrl && (
                  <a
                    href={currentFallbackUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-teal-300 border border-slate-700/60 inline-flex items-center gap-1.5 transition-all shadow-sm"
                  >
                    <span>פתח בטאב נפרד</span>
                    <ExternalLink className="w-3 h-3 text-teal-400" />
                  </a>
                )}
              </div>

              <div className="relative aspect-[16/9] w-full bg-slate-950 border-y border-slate-800">
                <iframe
                  key={currentEmbedUrl}
                  src={currentEmbedUrl}
                  title={activeLesson.title}
                  className="absolute inset-0 w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              {/* Lesson Control Header under Iframe */}
              <div className="p-6 bg-slate-900/90 border-t border-slate-700/70 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Badge variant="teal" className="text-xs">שיעור {activeLesson.id}</Badge>
                    {activeLesson.videoUrl && (
                      <Badge variant="royal" className="text-xs">כולל וידאו מלא</Badge>
                    )}
                    <span className="text-xs text-slate-300 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" /> {activeLesson.duration}
                    </span>
                  </div>
                  <h1 className="text-2xl font-black text-white leading-tight">
                    {activeLesson.title}
                  </h1>
                  {activeLesson.subtitle && (
                    <p className="text-sm text-slate-300 font-medium mt-1">
                      {activeLesson.subtitle}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => toggleLessonCompleted(activeLesson.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md ${
                    completedLessons.includes(activeLesson.id)
                      ? "bg-teal-500/25 text-teal-300 border border-teal-400/60 shadow-teal-500/10"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700"
                  }`}
                >
                  <CheckCircle2 className={`w-4 h-4 ${completedLessons.includes(activeLesson.id) ? "text-teal-400" : "text-slate-400"}`} />
                  <span>{completedLessons.includes(activeLesson.id) ? "שיעור הושלם ✓" : "סמן כהושלם"}</span>
                </button>
              </div>
            </div>

            {/* Lesson Details & Content Card */}
            <div className="p-6 sm:p-8 space-y-6 bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 rounded-2xl shadow-xl">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">על השיעור</h3>
                <p className="text-slate-200 leading-relaxed text-base">
                  {activeLesson.description}
                </p>
              </div>

              {/* Key Takeaways */}
              {activeLesson.keyTakeaways && activeLesson.keyTakeaways.length > 0 && (
                <div className="p-5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <h4 className="text-sm font-bold text-teal-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-teal-400" /> נקודות מפתח שנלמדו
                  </h4>
                  <ul className="space-y-2.5">
                    {activeLesson.keyTakeaways.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-200">
                        <Check className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Prompts Section */}
              {activeLesson.prompts && activeLesson.prompts.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-royal-400" /> פרומפטים מוכנים לשיעור זה
                  </h4>
                  {activeLesson.prompts.map((prompt, idx) => (
                    <div key={idx} className="p-5 rounded-xl bg-slate-950/90 border border-slate-700/70 relative group shadow-inner">
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <h5 className="font-bold text-sm text-teal-300">{prompt.title}</h5>
                        <button
                          onClick={() => handleCopyPrompt(prompt.promptText, idx)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-teal-500/20 hover:bg-teal-500/35 text-teal-300 border border-teal-500/40 transition-all shadow-sm"
                        >
                          {copiedPromptIndex === idx ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-teal-400" />
                              <span>הועתק!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>העתק פרומפט</span>
                            </>
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-slate-300 mb-3">{prompt.description}</p>
                      <pre className="p-4 rounded-xl bg-slate-900/90 text-xs font-mono text-slate-200 whitespace-pre-wrap leading-relaxed border border-slate-700/60 select-all overflow-x-auto shadow-sm">
                        {prompt.promptText}
                      </pre>
                    </div>
                  ))}
                </div>
              )}

              {/* Downloads & External Resources */}
              {activeLesson.downloads && activeLesson.downloads.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <Download className="w-4 h-4 text-teal-400" /> חומרי תרגול ומשאבים להורדה
                  </h4>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {activeLesson.downloads.map((item, idx) => {
                      const isExternal = item.url.startsWith("http");
                      const content = (
                        <>
                          <div className="flex items-center gap-2.5 min-w-0">
                            <FileText className="w-4 h-4 text-teal-400 flex-shrink-0" />
                            <span className="text-sm font-medium text-slate-100 group-hover:text-teal-300 transition-colors truncate">
                              {item.title}
                            </span>
                          </div>
                          <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-teal-300 flex-shrink-0 transition-colors" />
                        </>
                      );

                      return isExternal ? (
                        <a
                          key={idx}
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-4 rounded-xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700/60 hover:border-teal-400/50 flex items-center justify-between gap-3 transition-all shadow-sm group"
                        >
                          {content}
                        </a>
                      ) : (
                        <Link
                          key={idx}
                          href={item.url}
                          className="p-4 rounded-xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700/60 hover:border-teal-400/50 flex items-center justify-between gap-3 transition-all shadow-sm group"
                        >
                          {content}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Bottom Navigation Buttons */}
              <div className="pt-6 border-t border-slate-700/60 flex items-center justify-between gap-4">
                <Button
                  variant="ghost"
                  disabled={activeLessonIndex === 0}
                  onClick={() => {
                    setActiveLessonIndex((prev) => Math.max(0, prev - 1));
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="gap-2 text-slate-300 hover:text-white hover:bg-slate-800"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>השיעור הקודם</span>
                </Button>

                <Button
                  variant="primary"
                  disabled={activeLessonIndex === course.lessons.length - 1}
                  onClick={() => {
                    if (!completedLessons.includes(activeLesson.id)) {
                      toggleLessonCompleted(activeLesson.id);
                    }
                    setActiveLessonIndex((prev) => Math.min(course.lessons.length - 1, prev + 1));
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="gap-2 bg-gradient-to-r from-teal-400 to-teal-500 text-slate-950 font-bold shadow-lg shadow-teal-500/25 hover:opacity-95"
                >
                  <span>השיעור הבא</span>
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right Sidebar Syllabus (4 cols on lg) */}
          <div className="lg:col-span-4">
            <div className="bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/70 p-5 sticky top-36 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-700/70 mb-4">
                <h3 className="font-black text-lg text-white">סילבוס הקורס (8 שיעורים)</h3>
                <span className="text-xs text-slate-300 font-medium">{course.duration}</span>
              </div>

              <div className="space-y-2.5 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
                {course.lessons.map((lesson, idx) => {
                  const isActive = idx === activeLessonIndex;
                  const isCompleted = completedLessons.includes(lesson.id);

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => {
                        setActiveLessonIndex(idx);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className={`w-full text-right p-3.5 rounded-xl border text-sm transition-all flex items-start gap-3 ${
                        isActive
                          ? "bg-gradient-to-l from-teal-500/25 to-teal-500/10 border-teal-400 text-white shadow-lg shadow-teal-500/10"
                          : "bg-slate-800/40 border-slate-700/40 hover:bg-slate-800 hover:border-slate-600 text-slate-300 hover:text-white"
                      }`}
                    >
                      <div className="mt-0.5 flex-shrink-0">
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-teal-400" />
                        ) : isActive ? (
                          <PlayCircle className="w-4 h-4 text-teal-300 animate-pulse" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-500" />
                        )}
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className={`font-bold ${isActive ? "text-teal-300" : "text-slate-100"}`}>
                            שיעור {lesson.id}
                          </span>
                          <div className="flex items-center gap-1.5">
                            {lesson.videoUrl && (
                              <span className="text-[10px] bg-royal-500/30 text-royal-200 px-1.5 py-0.5 rounded border border-royal-400/40 font-medium">
                                וידאו
                              </span>
                            )}
                            <span className="text-[11px] text-slate-400">{lesson.duration}</span>
                          </div>
                        </div>
                        <p className="text-xs mt-0.5 line-clamp-2 leading-relaxed opacity-95 text-slate-300">
                          {lesson.title.replace(/^שיעור \d+:\s*/, "")}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Sidebar Pro Help & Community */}
              <div className="mt-6 pt-5 border-t border-slate-700/70 space-y-3">
                <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700/60 text-xs text-slate-200 leading-relaxed shadow-sm">
                  <strong className="text-white block mb-1 font-bold">💡 זקוקים לעזרה או שאלות?</strong>
                  מנויי Pro נהנים ממענה ישיר ומעטפת תמיכה. פנו ישירות ל-
                  <a href="mailto:ronenamos@gmail.com" className="text-teal-300 underline mr-1 font-medium hover:text-teal-200">
                    ronenamos@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
