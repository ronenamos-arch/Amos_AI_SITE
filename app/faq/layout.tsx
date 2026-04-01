import type { Metadata } from "next";

export const metadata: Metadata = {
    title: { absolute: 'שאלות נפוצות – AI פיננסי | רונן עמוס' },
    description:
        'תשובות לשאלות הנפוצות ביותר על ייעוץ פיננסי, AI, Power BI, קורסים ורואי חשבון. כמה עולה ייעוץ? כמה זמן לוקח Power BI? ועוד.',
    keywords: [
        'שאלות נפוצות רואה חשבון',
        'ייעוץ פיננסי מחיר',
        'Power BI לכספים',
        'AI לרואי חשבון',
        'ASC 606 IFRS 15',
        'דשבורד CFO',
        'ייעוץ AI עסקי',
        'אוטומציה פיננסית',
    ],
    alternates: { canonical: 'https://www.ronenamoscpa.co.il/faq' },
    openGraph: {
        url: 'https://www.ronenamoscpa.co.il/faq',
        title: 'שאלות נפוצות – AI פיננסי | רונן עמוס',
        description:
            'תשובות לשאלות הנפוצות ביותר על ייעוץ פיננסי, AI, Power BI וקורסים לאנשי כספים.',
    },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
