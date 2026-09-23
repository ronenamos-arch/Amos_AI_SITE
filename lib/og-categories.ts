export interface ExecutiveCategory {
  name: string;
  english: string;
  gradient: string;
  borderColor: string;
  textColor: string;
}

export const EXECUTIVE_CATEGORIES: Record<string, ExecutiveCategory> = {
  ai_finance: {
    name: "AI פיננסי ואוטומציה",
    english: "Finance AI & Autonomous Workflows",
    gradient: "from-cyan-500/20 to-blue-600/20",
    borderColor: "#06B6D4",
    textColor: "#22D3EE",
  },
  cfo_dashboards: {
    name: "דשבורדים ותובנות CFO",
    english: "Decision Intelligence & Executive Dashboards",
    gradient: "from-blue-500/20 to-indigo-600/20",
    borderColor: "#3B82F6",
    textColor: "#60A5FA",
  },
  advisory: {
    name: "ייעוץ וליווי פיננסי",
    english: "Financial Advisory & Project Delivery",
    gradient: "from-emerald-500/20 to-teal-600/20",
    borderColor: "#10B981",
    textColor: "#34D399",
  },
  lectures: {
    name: "הרצאות והכשרות AI",
    english: "Keynotes, Masterclasses & Workshops",
    gradient: "from-purple-500/20 to-pink-600/20",
    borderColor: "#A855F7",
    textColor: "#C084FC",
  },
  month_end: {
    name: "סגירת חודש ותהליכי כספים",
    english: "Month-End Acceleration & Operational Controls",
    gradient: "from-amber-500/20 to-orange-600/20",
    borderColor: "#F59E0B",
    textColor: "#FBBF24",
  },
};

/**
 * Intelligently maps any raw tag, category string, or title to one of the 5 executive badges.
 */
export function getExecutiveCategoryBadge(
  input?: string | string[]
): ExecutiveCategory {
  if (!input) return EXECUTIVE_CATEGORIES.ai_finance;

  const text = Array.isArray(input) ? input.join(" ").toLowerCase() : input.toLowerCase();

  if (
    text.includes("סגירת חודש") ||
    text.includes("סגירה") ||
    text.includes("תזרים") ||
    text.includes("התאמות") ||
    text.includes("month end") ||
    text.includes("close")
  ) {
    return EXECUTIVE_CATEGORIES.month_end;
  }

  if (
    text.includes("דשבורד") ||
    text.includes("dashboard") ||
    text.includes("power bi") ||
    text.includes("bi") ||
    text.includes("kpi") ||
    text.includes("ניתוח נתונים") ||
    text.includes("תובנות")
  ) {
    return EXECUTIVE_CATEGORIES.cfo_dashboards;
  }

  if (
    text.includes("הרצאה") ||
    text.includes("סדנא") ||
    text.includes("הכשרה") ||
    text.includes("קורס") ||
    text.includes("וובינר") ||
    text.includes("masterclass") ||
    text.includes("lecture") ||
    text.includes("workshop")
  ) {
    return EXECUTIVE_CATEGORIES.lectures;
  }

  if (
    text.includes("ייעוץ") ||
    text.includes("ליווי") ||
    text.includes("asc 606") ||
    text.includes("ifrs 15") ||
    text.includes("הטמעה") ||
    text.includes("advisory") ||
    text.includes("consulting") ||
    text.includes("פרויקט")
  ) {
    return EXECUTIVE_CATEGORIES.advisory;
  }

  return EXECUTIVE_CATEGORIES.ai_finance;
}
