import type { Metadata } from "next";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Check, Sparkles, ShieldCheck, Zap, Star } from "lucide-react";
import { PayPalProvider } from "@/components/providers/PayPalProvider";
import { PayPalPaymentButton } from "@/components/payments/PayPalPaymentButton";

export const metadata: Metadata = {
    title: "מסלולי פרימיום | AI FINANCE",
    description: "הצטרפו לקהילת הפרימיום של רונן עמוס וקבלו גישה לכל המדריכים, הפרומפטים והתכנים הבלעדיים.",
};

const plans = [
    {
        name: "מסלול חובב (Free)",
        price: "0",
        description: "למי שרוצה להתחיל להכיר את עולם ה-AI בפיננסים.",
        features: [
            "גישה למאמרים ציבוריים",
            "הרשמה לניוזלטר שבועי",
            "צפייה בסילבוס הקורסים",
            "השתתפות בוובינרים פתוחים"
        ],
        cta: "הירשם בחינם",
        href: "/login",
        variant: "ghost" as const,
        popular: false
    },
    {
        name: "מנוי חודשי גמיש",
        price: "10",
        period: "לחודש (ביטול בכל עת)",
        description: "גישה מלאה לכל התוכן המקצועי בתשלום חודשי סמלי.",
        features: [
            "גישה מלאה לכל מאמרי הפרימיום",
            "ספריית 100+ פרומפטים מוכנים לחשבונאים",
            "גישה למדריכים טכניים (NotebookLM, Power BI)",
            "קבוצת וואטסאפ 'שקטה' לעדכונים בלעדיים",
            "תבניות אקסל ושיטות עבודה אוטומטיות",
            "ללא התחייבות - ניתן לבטל בכל רגע"
        ],
        cta: "התחל מנוי עכשיו",
        href: "/dashboard",
        variant: "secondary" as const,
        popular: false
    },
    {
        name: "AI FINANCE PRO - לכל החיים",
        price: "199",
        period: "חד פעמי - גישה לתמיד",
        description: "החבילה המלאה והמשתלמת ביותר למי שרוצה להוביל.",
        features: [
            "גישה מלאה לכל מאמרי הפרימיום",
            "ספריית 100+ פרומפטים מוכנים לחשבונאים",
            "גישה למדריכים טכניים (NotebookLM, Power BI)",
            "קבוצת וואטסאפ 'שקטה' לעדכונים בלעדיים",
            "הנחה של 15% על כל הקורסים הפרונטליים",
            "תבניות אקסל ושיטות עבודה אוטומטיות",
            "תשלום אחד קטן וחשבון PRO לתמיד"
        ],
        cta: "רכוש גישה לכל החיים",
        href: "/dashboard",
        variant: "primary" as const,
        popular: true
    }
];

export default function PricingPage() {
    const isSandbox = process.env.NEXT_PUBLIC_PAYPAL_SANDBOX === 'true';
    const monthlyPlanId = isSandbox
        ? process.env.NEXT_PUBLIC_PAYPAL_SANDBOX_MONTHLY_PLAN_ID
        : process.env.NEXT_PUBLIC_PAYPAL_MONTHLY_PLAN_ID;

    return (
        <PayPalProvider>
            <div className="pt-24 pb-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <SectionHeading
                        title="בחרו את מסלול ההצלחה שלכם"
                        subtitle="הצטרפו לקהילה המקצועית של מובילי ה-AI בעולם הפיננסים"
                        gradient
                    />

                    <div className="mt-16 grid gap-8 lg:grid-cols-3">
                        {plans.map((plan) => (
                            <div key={plan.name} className="relative">
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                                        <Badge variant="royal" className="px-4 py-1.5 shadow-lg shadow-royal-500/20">
                                            <Star className="h-3 w-3 ml-1 inline" /> הכי משתלם
                                        </Badge>
                                    </div>
                                )}

                                <GlassCard
                                    className={`h-full flex flex-col p-8 transition-transform duration-300 hover:scale-[1.02] ${plan.popular ? 'border-royal-500/50 bg-royal-500/5' : ''}`}
                                    hover={false}
                                >
                                    <div className="mb-8">
                                        <h3 className="text-xl font-bold text-text-primary mb-2">{plan.name}</h3>
                                        <div className="flex items-baseline gap-1 mb-4">
                                            <span className="text-4xl font-bold text-text-primary">₪{plan.price}</span>
                                            {plan.period && <span className="text-text-muted text-sm">{plan.period}</span>}
                                        </div>
                                        <p className="text-text-secondary text-sm leading-relaxed">
                                            {plan.description}
                                        </p>
                                    </div>

                                    <ul className="mb-10 space-y-4 flex-grow">
                                        {plan.features.map((feature) => (
                                            <li key={feature} className="flex items-start gap-3 text-sm text-text-secondary">
                                                <Check className="h-5 w-5 text-teal-400 shrink-0" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {plan.price !== "0" ? (
                                        <div className="mt-auto">
                                            <PayPalPaymentButton
                                                amount={plan.price}
                                                planId={plan.name.includes("חודשי") ? monthlyPlanId : undefined}
                                                subscriptionType={plan.name.includes("חודשי") ? 'monthly' : 'lifetime'}
                                            />
                                        </div>
                                    ) : (
                                        <Button
                                            href={plan.href}
                                            variant={plan.variant}
                                            className="w-full py-6 text-lg mt-auto"
                                        >
                                            {plan.cta}
                                        </Button>
                                    )}

                                    {plan.popular && (
                                        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-text-muted">
                                            <ShieldCheck className="h-4 w-4 text-teal-400" />
                                            רכישה מאובטחת באמצעות PayPal
                                        </div>
                                    )}
                                </GlassCard>
                            </div>
                        ))}
                    </div>

                    {/* FAQ Preview or Trust Section */}
                    <div className="mt-24 text-center">
                        <h2 className="text-2xl font-bold mb-8">למה להצטרף ל-AI FINANCE PRO?</h2>
                        <div className="grid gap-8 md:grid-cols-3">
                            <div className="p-6">
                                <div className="bg-teal-400/10 h-12 w-12 rounded-xl flex items-center justify-center mx-auto mb-4 border border-teal-400/20">
                                    <Zap className="h-6 w-6 text-teal-400" />
                                </div>
                                <h4 className="font-bold mb-2">חיסכון בזמן</h4>
                                <p className="text-sm text-text-secondary text-center">במקום לחפש פרומפטים, קבלו את כל מה שעובד מוכן לשימוש מיידי.</p>
                            </div>
                            <div className="p-6">
                                <div className="bg-royal-500/10 h-12 w-12 rounded-xl flex items-center justify-center mx-auto mb-4 border border-royal-500/20">
                                    <Sparkles className="h-6 w-6 text-royal-400" />
                                </div>
                                <h4 className="font-bold mb-2">יתרון תחרותי</h4>
                                <p className="text-sm text-text-secondary text-center">תהיו הראשונים שמטמיעים כלי Grounded AI בצוותי הכספים שלכם.</p>
                            </div>
                            <div className="p-6">
                                <div className="bg-teal-400/10 h-12 w-12 rounded-xl flex items-center justify-center mx-auto mb-4 border border-teal-400/20">
                                    <ShieldCheck className="h-6 w-6 text-teal-400" />
                                </div>
                                <h4 className="font-bold mb-2">דיוק מקצועי</h4>
                                <p className="text-sm text-text-secondary text-center">שימוש בשיטות עבודה שמונעות "הזיות AI" ומבטיחות דיוק פיננסי.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PayPalProvider>
    );
}
