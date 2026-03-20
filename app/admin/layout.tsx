export const dynamic = 'force-dynamic';

import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { FileText, Mail, MessageSquare, ExternalLink } from "lucide-react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    if (process.env.NODE_ENV !== "development") {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user || user.email !== "ronenamos@gmail.com") {
            redirect("/");
        }
    }
    return (
        <>
            <nav className="fixed top-16 left-0 right-0 z-40 bg-[#0a0e17]/95 backdrop-blur border-b border-white/8">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-14" dir="rtl">
                        <div className="flex items-center gap-1">
                            <Link
                                href="/admin"
                                className="text-sm font-semibold text-teal-400 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
                            >
                                ניהול
                            </Link>
                            <span className="text-white/20">|</span>
                            <Link
                                href="/admin/blog"
                                className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
                            >
                                <FileText className="h-3.5 w-3.5" />
                                בלוג
                            </Link>
                            <Link
                                href="/admin/newsletter"
                                className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
                            >
                                <Mail className="h-3.5 w-3.5" />
                                ניוזלטר
                            </Link>
                            <Link
                                href="/admin/contacts"
                                className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
                            >
                                <MessageSquare className="h-3.5 w-3.5" />
                                פניות
                            </Link>
                        </div>
                        <Link
                            href="/"
                            className="flex items-center gap-1.5 text-xs text-text-muted hover:text-teal-400 transition-colors"
                        >
                            <ExternalLink className="h-3 w-3" />
                            חזרה לאתר
                        </Link>
                    </div>
                </div>
            </nav>
            <div className="pt-14">{children}</div>
        </>
    );
}
