/**
 * Hero video panel — the right-hand column of the /guides hero.
 *
 * Originally built for Hero.tsx, archived on 2026-08-07, restored here on
 * 2026-08-09 in place of the hand-built "Finance Dashboard" SVG mockup.
 *
 * It plays a web-sized transcode of the CFO dashboard clip: 1280px wide, no
 * audio track, 890 KB, so it is safe to serve on phones as well. The 25 MB
 * master still lives at
 * public/course-assets/ai-master-course/images/CFO-inteligence-dashboard.mp4.
 */
export function HeroVideoBlock() {
  return (
    /* Video Player with Avatar Poster & Floating Badge */
    <div className="relative animate-wow" style={{ animationDelay: "0.2s" }}>
      <div className="relative p-3 rounded-[2.5rem] bg-gradient-to-tr from-white/10 to-transparent border border-white/10 shadow-2xl overflow-hidden group">
        <div className="absolute inset-0 bg-space-950/20 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
        <div className="absolute -inset-[100%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_20deg,rgba(34,211,238,0.1)_25deg,transparent_30deg)] animate-[spin_10s_linear_infinite] pointer-events-none" />

        <div className="relative w-full aspect-[1.33] rounded-[2rem] overflow-hidden bg-space-950">
          <video
            src="/videos/cfo-dashboard-hero.mp4"
            poster="/videos/cfo-dashboard-hero.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="הדגמה של דשבורד CFO מבוסס AI"
            className="w-full h-full object-cover rounded-[2rem] opacity-90 group-hover:opacity-100 transition-opacity duration-500"
          />

          {/* Floating author tag */}
          <div className="absolute bottom-4 right-4 glass rounded-2xl p-3 border border-white/10 flex items-center gap-3 pointer-events-none z-30 shadow-lg">
            <div className="w-24 h-24 rounded-full overflow-hidden border border-teal-400">
              <img src="/images/avatar-f.png" alt="רונן עמוס" className="w-full h-full object-cover" />
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-white leading-none">רונן עמוס</p>
              <p className="text-[10px] text-teal-400 mt-1 leading-none">מייסד &amp; CFO</p>
            </div>
          </div>
        </div>
      </div>
      {/* Background Glows */}
      <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-neon-teal/20 blur-3xl rounded-full animate-bounce-subtle" />
      <div className="absolute -top-10 -right-10 w-48 h-48 bg-royal-500/20 blur-3xl rounded-full animate-bounce-subtle" style={{ animationDelay: "2s" }} />
    </div>
  );
}
