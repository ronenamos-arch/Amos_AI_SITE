---
title: "הטריק ה-Human-in-the-Loop שאני מוסיף לכל Prompt ו-Skill"
date: "2026-06-30"
excerpt: "ה-AI סיים ונתן תוצר מהמם אבל מי בדק אותו? הטכניקה האחת שמונעת טעויות שקטות ב-workflows פיננסיים, כולל ה-prompt המלא להוספה לכל skill קיים."
image: "/images/blog/human-loop-1.png"
tags: ["AI", "Prompts", "CFO", "FP&A", "אוטומציה"]
premium: "false"
---

![הטריק ה-Human-in-the-Loop שאני מוסיף לכל Prompt ו-Skill](/images/blog/human-loop-1.png)

## הבעיה שאף אחד לא מדבר עליה מספיק

יש רגע מאוד מסוכן בעבודה עם AI. לא כשהוא טועה בצורה ברורה — אלא כשהוא טועה בשקט.

המודל מחזיר תוצאה נקייה, מאוזנת ומוגשת יפה. אין הודעות שגיאה. אין דגלים אדומים. הכל נראה בסדר — עד שאתה מגיש את התוצאה לדירקטוריון.

זה בדיוק מה שה-human-in-the-loop בא למנוע.

## מה זה Human-in-the-Loop?

הרעיון פשוט: **אתה בונה את ה-prompts, ה-Skills וה-agents שלך כך שה-AI עוצר, מציג את עבודתו, וממתין לאישורך** לפני שממשיך.

לא ריצה מקצה לקצה ואז "הנה התוצאה". עצירה מובנית בכל שלב קריטי.

זה אולי נשמע מובן מאליו. אבל בפועל, רוב ה-workflows שאני רואה — גם אצל אנשים מנוסים — בנויים להפך: ה-AI רץ עד הסוף, ורק אז מגיעה הבדיקה.

## למה זה קריטי דווקא בפיננסים?

![השוואת מודלים שתפסה טעות של $30M](/images/blog/human-loop-2.png)

מודל AI מסוגל לתפוס בעיה של **$30M במיסים** שבן-אדם פספס. אבל אותו מודל יכול גם כך לקפל ולהחביא טעות לתוך מודל מאוזן ומושלם — ולתת לך לשאת אותה עד לפגישה עם הדירקטוריון.

הנקודה: **ככל שאתה סומך יותר — אתה בודק פחות.** זה עובד עם אנשים. וזה עובד, כנראה, גם עם AI.

ברגע שתפסיק לבדוק, זה בדיוק הרגע שבו תגיע הטעות שלא תשים לב אליה.

## איך זה נראה בפועל ב-Skill פיננסי?

הנה דוגמה: skill של three-statement model. מיפוי תבנית, שליפת היסטוריה, בניית הדוחות. הכל רגיל.

ואז מגיע החלק שמרוויח את מקומו:

![שורת הקוד שעוצרת את ה-AI לאישורך](/images/blog/human-loop-3.png)

**המודל בונה. אתה מאשר. מי שעשה את העבודה לא יכול להחליט שהעבודה נגמרה.**

זה הכלל: עושה ובודק — זה אף פעם לא אותן ידיים.

## שתי שיטות להיכנס ל-Loop

**שיטה 1 — חתוך את ה-workflow לצעדים קטנים**

כל workflow מרובה-שלבים נחתך לצעדים, ואתה מאשר אחרי כל צעד. לא בולעים את כל המודל בריצה אחת.

**שיטה 2 — תייג את ה-context עם רמת ביטחון**

על כל דבר שאתה מעביר ל-AI, סמן כמה אתה בטוח במידע — כדי שהוא ידע מתי לעצור ולשאול אותך, במקום לנחש.

## ה-Prompt המלא — הדבק ישירות ל-Claude

אם אתה רוצה להוסיף human-in-the-loop לכל skill קיים שלך — בלי לשכתב אותו ידנית — השתמש ב-prompt הזה:

---

> **You're upgrading one of my finance prompts/skills so I stay in the loop. Don't rewrite it yet. Show me your plan first.**
>
> **Here it is: [attach your prompt or skill]**
>
> **First, map the workflow into steps and mark which ones are HIGH risk (a wrong number reaches a decision) versus low. For each, tell me what could go wrong silently: plugs, hardcoded values where a formula belongs, wrong period or sign, blended or double-counted sources. Show me that and stop.**
>
> **Once I confirm, add a "Verify step-by-step with the user" section to the skill, one line per HIGH step, in exactly this format:**
>
> → After [step] → show me the formula, its inputs, and the result, then confirm [a concrete pass condition, not a vibe — e.g. "Assets − (L+E) = 0", "CF ending cash = BS cash"] before moving on
>
> **…and end the section with:**
>
> → Do NOT run the whole thing end to end and present it complete. Hard-stop at each step and wait for my approval.
>
> **Two rules at the top of the skill: never run end to end, and whatever checks a step is never the thing that built it.**
>
> **Return the updated skill plus a short list of the checkpoints you added.**

---

## למה זה עובד כל כך טוב?

שים לב למבנה של ה-prompt:
- **קודם — מבצע מיפוי ואז עוצר.** ה-AI לא מתחיל לשכתב. הוא קודם מציג לך את התוכנית.
- **סיכון גבוה vs. נמוך.** לא כל שלב שווה אישור — המודל מזהה את הנקודות שבאמת חשובות.
- **תנאי עבור ולא תחושה.** `Assets − (L+E) = 0` ככה רושמים תנאי. כי "נראה טוב" בתוך פרומפט זה לא נכון.
- **שתי חוקים ברורים:** לא עבודה מקצה לקצה וזה שעושה לעומת זה שבודק לא יהיו אותן ידיים.

## נקודה אחת לסיום

המודלים היום של AI הם כלים מאוד חזקים וחכמים. ויכולים לקלוט ולעלות על מה שבן-אדם מפספס. אבל הוא גם יכול ליצור שגיאה שקטה שנראית מושלמת מבחוץ.

ה-human-in-the-loop לא אומר שאתה לא סומך על ה-AI. זה אומר שאתה מוציא ממנו את ה-output הכי טוב שלו — בדיוק כמו שאתה עושה עם כל ספק אחר: בודק, מאשר, ואז ממשיך.

הדבק את ה-prompt, תן ל-Claude לבנות, ואשר כל שלב. זה הכל.

## הצעד הבא — שדרג את ה-Workflows הפיננסיים שלך

רוצה לבנות workflows פיננסיים שעובדים נכון מההתחלה — עם human-in-the-loop מובנה, Skills מותאמים לצרכים שלך, ובלי לסמוך על AI שרץ עד הסוף לבד?

<div style="display: flex; justify-content: center; margin: 3rem 0;">
  <a href="https://www.ronenamoscpa.co.il/pricing" style="
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 2.5rem;
    font-size: 1.125rem;
    font-weight: 600;
    color: white;
    background: linear-gradient(135deg, rgb(20, 184, 166) 0%, rgb(14, 165, 233) 100%);
    border-radius: 0.75rem;
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 0 30px rgba(20, 184, 166, 0.5), 0 10px 25px rgba(20, 184, 166, 0.3);
    border: 1px solid rgba(20, 184, 166, 0.3);
  " onmouseover="this.style.boxShadow='0 0 40px rgba(20, 184, 166, 0.8), 0 15px 35px rgba(20, 184, 166, 0.5)'; this.style.transform='translateY(-2px)';" onmouseout="this.style.boxShadow='0 0 30px rgba(20, 184, 166, 0.5), 0 10px 25px rgba(20, 184, 166, 0.3)'; this.style.transform='translateY(0)';">
    הרשם לעוד מדריכים ותוכן  →
  </a>
</div>
