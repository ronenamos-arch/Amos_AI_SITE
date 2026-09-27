import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { checkProfileAccess } from "@/lib/subscription-access";
import { redirect } from "next/navigation";
import { getDBPosts } from "@/lib/blog-supabase";
import { getAllPosts } from "@/lib/blog";
import { getAllGuides } from "@/lib/guides-data";
import {
    DashboardClient,
    CourseAccessItem,
    PaymentItem,
    RecentArticleItem,
    GuideItem,
} from "@/components/dashboard/DashboardClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "האזור האישי | רונן עמוס",
    robots: { index: false, follow: false },
};

export default async function DashboardPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    const adminSupabase = createAdminClient();
    const userEmail = user.email ? user.email.toLowerCase().trim() : "";
    const isAdmin = userEmail === "ronenamos@gmail.com";

    // 1. Fetch profile data
    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

    const isPremium = checkProfileAccess(profile) || isAdmin;

    // 2. Fetch course_access table
    const { data: courseAccessRow } = await supabase
        .from("course_access")
        .select("has_access")
        .eq("user_id", user.id)
        .maybeSingle();

    // 3. Fetch course_purchases for user
    const { data: coursePurchases } = userEmail
        ? await adminSupabase
              .from("course_purchases")
              .select("*")
              .eq("email", userEmail)
        : { data: [] };

    // 4. Fetch bundle_purchases for user
    const { data: bundlePurchases } = userEmail
        ? await adminSupabase
              .from("bundle_purchases")
              .select("*")
              .eq("email", userEmail)
        : { data: [] };

    // 5. Fetch payment_records for user
    const { data: paymentRecords } = await supabase
        .from("payment_records")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

    // Determine Course Unlocks
    const paidCoursePurchases = (coursePurchases || []).filter(
        (p) => p.status === "paid" || p.status === "completed"
    );
    const paidBundlePurchases = (bundlePurchases || []).filter(
        (p) => p.status === "paid" || p.status === "completed"
    );

    // AI Finance Master 599 ₪
    const hasMasterCourse =
        isPremium ||
        courseAccessRow?.has_access === true ||
        paidCoursePurchases.some((p) => !p.amount || Number(p.amount) >= 500);

    // Claude Bundle 150 ₪
    const hasClaudeBundle =
        isPremium ||
        paidBundlePurchases.length > 0;

    const coursesList: CourseAccessItem[] = [
        {
            id: "ai-finance-master",
            slug: "ai-finance-master",
            title: "AI Finance Master (קורס הדגל)",
            description: "שליטה עמוקה ב-AI לאוטומציה, ניתוח מתקדם, דוחות כספיים וביקורת. 16 מודולים מעשיים.",
            price: "₪599",
            level: "מתקדמים",
            duration: "16 מודולים",
            image: "/course-assets/ai-master-course/images/before-after.png",
            href: "/courses/sell-page",
            unlockedHref: "/courses/ai-master-course",
            isUnlocked: hasMasterCourse,
            unlockedLabel: "כניסה לנגן הקורס המלא",
        },
        {
            id: "claude-bundle",
            slug: "claude-bundle",
            title: "בנדל Claude לפרודוקטיביות פיננסית",
            description: "מאגר פרומפטים מובנה, סקילים ומדריכי יישום לעבודה יומיומית עם Claude בפיננסים.",
            price: "₪150",
            level: "לכל הרמות",
            duration: "מאגר דיגיטלי",
            image: "/course-assets/ai-master-course/images/c-logo.png",
            href: "/claude-bundle",
            unlockedHref: paidBundlePurchases[0]?.access_token
                ? `/claude-bundle/access/${paidBundlePurchases[0].access_token}`
                : "/claude-bundle/access/member",
            isUnlocked: hasClaudeBundle,
            unlockedLabel: "כניסה לאזור הצפייה וההורדות",
        },
    ];

    // Compile Payments History List
    const paymentsList: PaymentItem[] = [];

    // 1. Add course purchases
    (coursePurchases || []).forEach((p) => {
        let title = "קורס AI Finance Master";
        if (Number(p.amount) === 250) title = "קורס AI לכספים: המדריך למתחילים";
        if (Number(p.amount) === 150) title = "קורס Mastering NotebookLM";

        paymentsList.push({
            id: p.id,
            title,
            amount: Number(p.amount) || 599,
            currency: p.currency || "ILS",
            status: p.status === "completed" || p.status === "paid" ? "paid" : "pending",
            date: p.created_at || new Date().toISOString(),
            provider: p.payment_provider || (p.paypal_order_id ? "PayPal" : "SmartBee"),
            invoiceUrl: p.invoice_url || null,
            invoiceNumber: p.invoice_number || null,
        });
    });

    // 2. Add bundle purchases
    (bundlePurchases || []).forEach((b) => {
        paymentsList.push({
            id: b.id,
            title: "בנדל Claude לפרודוקטיביות פיננסית",
            amount: Number(b.amount) || 150,
            currency: b.currency || "ILS",
            status: b.status === "paid" || b.status === "completed" ? "paid" : "pending",
            date: b.created_at || new Date().toISOString(),
            provider: b.paypal_order_id ? "PayPal" : "SmartBee",
            invoiceUrl: b.invoice_url || null,
        });
    });

    // 3. Add subscription payment records
    (paymentRecords || []).forEach((pr) => {
        paymentsList.push({
            id: pr.id,
            title: "מנוי חודשי Pro - AI Finance",
            amount: Number(pr.amount) || 100,
            currency: pr.currency || "ILS",
            status: pr.status === "COMPLETED" || pr.status === "completed" ? "paid" : "pending",
            date: pr.created_at || new Date().toISOString(),
            provider: "PayPal",
        });
    });

    // Sort payments by date descending
    paymentsList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Fetch dynamic recent blog posts
    let recentArticles: RecentArticleItem[] = [];
    try {
        const dbPosts = await getDBPosts();
        const staticPosts = getAllPosts();

        const combined = [
            ...dbPosts.map((p) => ({
                slug: p.slug,
                title: p.title,
                description: p.description,
                date: p.published_at ? new Date(p.published_at).toLocaleDateString("he-IL") : "",
                is_premium: p.is_premium,
                tags: p.tags,
            })),
            ...staticPosts.map((p) => ({
                slug: p.slug,
                title: p.title,
                description: p.description,
                date: p.date,
                is_premium: p.premium,
                tags: p.tags,
            })),
        ];

        // Unique by slug
        const seen = new Set<string>();
        recentArticles = combined.filter((item) => {
            if (seen.has(item.slug)) return false;
            seen.add(item.slug);
            return true;
        }).slice(0, 3);
    } catch (e) {
        console.error("Error fetching recent articles for dashboard:", e);
    }

    // Fetch featured guides
    let featuredGuides: GuideItem[] = [];
    try {
        const guides = getAllGuides();
        featuredGuides = guides.slice(0, 3).map((g) => ({
            slug: g.slug,
            title: g.title,
            description: g.description,
            category: g.category,
        }));
    } catch (e) {
        console.error("Error fetching featured guides for dashboard:", e);
    }

    const fullName =
        user.user_metadata?.full_name ??
        user.user_metadata?.name ??
        profile?.full_name ??
        "";

    const phone =
        user.user_metadata?.phone ??
        profile?.phone ??
        "";

    return (
        <DashboardClient
            user={{
                id: user.id,
                email: user.email || "",
                fullName,
                phone,
            }}
            isPremium={isPremium}
            subscriptionStatus={profile?.subscription_status || "free"}
            subscriptionEndDate={profile?.subscription_end_date}
            courses={coursesList}
            payments={paymentsList}
            recentArticles={recentArticles}
            featuredGuides={featuredGuides}
        />
    );
}
