export interface Resource {
    slug: string;
    title: string;
    description: string;
    contentFile: string;
    free?: boolean;
}

export const resources: Resource[] = [
    {
        slug: "50-ways-ai",
        title: "50 דרכים להשתמש ב-AI",
        description: "50 שימושים מעשיים ב-AI לאנשי כספים.",
        contentFile: "50-ways-ai.html",
    },
    {
        slug: "102-prompt",
        title: "102 Prompts",
        description: "תבנית פרומפט לניתוח פיננסי.",
        contentFile: "102-prompt.html",
    },
    {
        slug: "claude-excel",
        title: "Claude + Excel + PowerPoint",
        description: "מדריך לשימוש ב-Claude עם Excel ו-PowerPoint.",
        contentFile: "claude-excel.html",
    },
    {
        slug: "price-framework",
        title: "Price Framework",
        description: "מסגרת תמחור לשירותי ייעוץ.",
        contentFile: "price-framework.html",
        free: true,
    },
    {
        slug: "claude-playbook",
        title: "Claude Playbook",
        description: "פלייבוק מלא לעבודה עם Claude.",
        contentFile: "claude-playbook.html",
    },
    {
        slug: "python-cfo",
        title: "Python for CFOs",
        description: "מה Python יכול לעשות עבור מנהלי כספים.",
        contentFile: "python-cfo.html",
    },
    {
        slug: "ai-skills",
        title: "AI Skills",
        description: "מיומנויות AI מרכזיות לאנשי כספים.",
        contentFile: "ai-skills.html",
    },
    {
        slug: "colab-he",
        title: "Colab לעברית",
        description: "מדריך עבודה עם Google Colab בעברית.",
        contentFile: "colab-he-ronen.html",
    },
];

export function getResourceBySlug(slug: string): Resource | undefined {
    return resources.find((r) => r.slug === slug);
}
