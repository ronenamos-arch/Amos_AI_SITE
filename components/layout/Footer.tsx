import Link from "next/link";
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-space-950 border-t border-white/5 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold gradient-text">רונן עמוס</span>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed">
              רואה חשבון ויועץ טכנולוגי פיננסי.
              הופך מחלקות כספים לחכמות, מהירות ויעילות באמצעות כלי AI ואוטומציות מתקדמים.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="https://www.linkedin.com/in/ronenamoscpa" target="_blank" className="text-text-muted hover:text-teal-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-text-muted hover:text-teal-400 transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-text-primary font-bold mb-6">ניווט מהיר</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/" className="text-text-secondary hover:text-teal-400 transition-colors">דף הבית</Link></li>
              <li><Link href="/courses" className="text-text-secondary hover:text-teal-400 transition-colors">קורסי AI</Link></li>
              <li><Link href="/blog" className="text-text-secondary hover:text-teal-400 transition-colors">בלוג פרימיום</Link></li>
              <li><Link href="/pricing" className="text-text-secondary hover:text-teal-400 transition-colors">מסלולי מנוי</Link></li>
              <li><Link href="/dashboard" className="text-text-secondary hover:text-teal-400 transition-colors">אזור אישי</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-text-primary font-bold mb-6">שירותים</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/services" className="text-text-secondary hover:text-teal-400 transition-colors">ייעוץ טכנולוגי פיננסי</Link></li>
              <li><Link href="/training" className="text-text-secondary hover:text-teal-400 transition-colors">הכשרות צוותי כספים</Link></li>
              <li><Link href="/services" className="text-text-secondary hover:text-teal-400 transition-colors">אוטומציות Power BI</Link></li>
              <li><Link href="/legal" className="text-text-secondary hover:text-teal-400 transition-colors">מדיניות פרטיות ותנאי שימוש</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-text-primary font-bold mb-6">צור קשר</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3 text-text-secondary">
                <Phone className="h-4 w-4 text-teal-400" />
                <a href="tel:0505500344" className="hover:text-teal-400 transition-colors">050-5500344</a>
              </li>
              <li className="flex items-center gap-3 text-text-secondary">
                <Mail className="h-4 w-4 text-teal-400" />
                <a href="mailto:ronenamos@gmail.com" className="hover:text-teal-400 transition-colors">ronenamos@gmail.com</a>
              </li>
              <li className="flex items-center gap-3 text-text-secondary">
                <MapPin className="h-4 w-4 text-teal-400" />
                <span>ישראל - פריסה ארצית</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="py-8 border-t border-white/5 mb-4">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <div className="shrink-0 text-center md:text-right">
              <h4 className="text-text-primary font-bold text-sm">הישאר מעודכן</h4>
              <p className="text-text-muted text-xs mt-1">טיפים על AI וכספים, פעם בשבוע</p>
            </div>
            <div className="flex-grow w-full md:max-w-md">
              <NewsletterForm source="footer" variant="inline" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-muted">
          <p>© {currentYear} רונן עמוס - AI FINANCE. כל הזכויות שמורות.</p>
          <p>בנייה ועיצוב: Antigravity AI Engine</p>
        </div>
      </div>
    </footer>
  );
}
