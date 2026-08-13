---
title: "Cash Flow Playground: המודל שעונה על 'מה יקרה למזומן שלנו אם...' תוך שניות"
date: "2026-08-06"
excerpt: "רגע לפני ישיבת דירקטוריון, ה-CEO תמיד שואל את אותה שאלה: מה יקרה למזומן אם נעשה X. הנה איך בונים עם Claude מודל תזרים אינטראקטיבי - קובץ HTML אחד שמחשב מחדש בזמן אמת, עם כללים שמונעים ממנו לשקר."
image: "/images/blog/cash-flow-playground-header.png"
tags: ["Cash Flow", "FP&A", "AI Skills"]
premium: "false"
---

![Cash Flow Playground - מודל תזרים מזומנים אינטראקטיבי](/images/blog/cash-flow-playground-header.png)

רגע לפני כל ישיבת דירקטוריון, ה-CEO שואל את אותה שאלה בדיוק: "מה יקרה למזומן שלנו אם...". מבטלים הוצאה. מוסיפים שני עובדים. מגייסים ביולי במקום בספטמבר. והם לא רוצים דוח בשבוע הבא - הם רוצים להזיז מספר ולראות את יתרת המזומן הסופית מגיבה, עכשיו, כשהמחשבה עוד חמה.

זה בדיוק מה ש-**playground** של תזרים מזומנים נותן.

## מה זה playground, ולמה כל CEO רוצה אחד

חשוב להבחין: תחזית תזרים היא לא דבר אחד. יש את ה-13-week cash flow לניהול נזילות שוטף. יש תחזית חודשית. יש direct מול indirect method. וכל אחד מהם משתנה לפי סוג העסק - SaaS, ייצור, שירותים, שלב מוקדם מול Enterprise.

ה-playground הוא סוג אחר לגמרי. הוא לא התחזית הרשמית, לא ה-13-week לטרეז'רי - הוא **סנדבוקס**. כל הוצאה עתידית נראית לעין, כל שורה ניתנת לעריכה, וה-free cash flow החודשי, תחזית סוף השנה, ויתרת המזומן מחושבים מחדש בזמן אמת תוך כדי משחק.

![מבנה ה-Cash Flow Playground - שישה טאבים מקושרים, actuals נעולים ותוכנית ניתנת לעריכה](/images/blog/cash-flow-playground-1.png)

הדגמה חיה - עריכת שורת הוצאה, ויתרת המזומן מתעדכנת תוך כדי הקלדה:

<video src="/images/blog/cash-flow-playground-2.mp4" autoplay loop muted playsinline style="width: 100%; max-width: 100%; height: auto; border-radius: 0.75rem; margin: 2rem 0; display: block;"></video>

הבעיה: לבנות אחד כזה ידנית בגיליון אלקטרוני לוקח ימים, והוא נשבר ברגע שמישהו גורר נוסחה לכיוון הלא נכון. הפתרון: להפוך את כל התהליך ל-Claude skill. מתקינים פעם אחת, נותנים ל-Claude את המספרים, והוא בונה את ה-playground - עם הכללים ששומרים עליו כן, כתובים בפנים.

## איך זה עובד: 4 שלבים, והשני הוא הסיפור האמיתי

**1. קלט.** P&L היסטורי חודשי, רשימת שכר, הוצאות תוכנה, רשימת לקוחות עם תדירות חיוב וימי גבייה לכל לקוח, והנחות התחזית. שום דבר לא מומצא - אם משהו חסר, הוא שואל.

**2. שער איכות נתונים.** לפני שבונים כלום, בודקים שה-P&L מסתכם נכון, שמפל ה-MRR מאוזן, שהמזומן מתאזן ל-0, ושה-AR וההכנסה הדחויה מתגלגלים כמו שצריך. נכשל? שואלים. לעולם לא מרמים. זה הסעיף הכי חשוב בכל התהליך - למי שבונה בעצמו, זה הכלל שהכי משתלם להעתיק: **הגורם שמבצע את המשימה לא מקבל לזייף את הקלט של עצמו.**

**3. בנייה.** קובץ עצמאי אחד, שישה טאבים מקושרים: P&L Playground, תוכנה, שכר, MRR פעיל, תזרים נכנס, תזרים מזומנים. בפועל (actuals) נעול, תוכנית ניתנת לעריכה, נוסחאות תמיד מחושבות מחדש.

**4. אימות ומשלוח.** מריצים שוב את כל הבדיקות על הקובץ הסופי לפני שהוא יוצא לדרך.

הפלט: קובץ HTML אחד, אופליין. שולחים אותו ל-CEO, והוא יכול לשחק בלי לגעת בנתוני המקור שלכם.

## הכללים שאפויים בפנים

זה מה שהופך מודל פיננסי מיפה למהימן: **actuals נעולים** (עריכות נוגעות רק בחודשי תוכנית), **הוצאות שומרות סימן** (מינוס שהוקלד לא הופך עלות להכנסה בטעות), **מזומן שונה מרווח נקי** (AR והכנסה דחויה נעקבים כמו שצריך, לא cumsum נאיבי), ו**מפל MRR חייב להתאזן** (סה"כ = קודם + לקוחות חדשים + upsell + downsell + churn).

אלה בדיוק הדברים שנשברים בשקט במודלים בנויים-ידנית, והופכים כאן לבלתי אפשריים מבחינה מבנית.

## איך מגדירים את זה (5 דקות)

זה Claude skill - מתקינים פעם אחת, ואז פשוט מבקשים מ-Claude לבנות או לעדכן playground.

**מה צריך:** תוכנית Claude עם **Code execution and file creation** דלוק. בלי זה, skills לא רצים.

בגרסת ה-web / desktop / Cowork:

1. להדליק code execution: **Settings ← Capabilities ← Code execution and file creation**
2. לגשת ל-**Customize ← Skills**
3. ליצור או להעלות skill מותאם לתהליך הזה
4. להפעיל אותו

אחר כך, בצ'אט חדש: "בנה לי cash flow playground מהמספרים האלה" - ומצרפים P&L, שכר, הוצאות תוכנה, ורשימת לקוחות (תדירות חיוב + ממוצע ימי גבייה לכל לקוח).

הבנייה הראשונה לוקחת כמה דקות. אחר כך, עדכון לחודש חדש הוא משפט אחד: "הנה בפועל של יוני, קדם את יוני לבפועל והארך את התוכנית."

<div style="display: grid; grid-template-columns: 1fr; gap: 1.5rem; margin: 2rem 0;">
  <details style="padding: 1.5rem; border: 1px solid rgba(20, 184, 166, 0.2); border-radius: 0.75rem; background: rgba(20, 184, 166, 0.05); cursor: pointer; transition: all 0.3s ease;" onmouseover="this.style.background='rgba(20, 184, 166, 0.1)'; this.style.borderColor='rgba(20, 184, 166, 0.4)';" onmouseout="this.style.background='rgba(20, 184, 166, 0.05)'; this.style.borderColor='rgba(20, 184, 166, 0.2)';">
    <summary style="font-weight: 600; font-size: 1.0625rem; color: rgb(20, 184, 166); outline: none; display: flex; justify-content: space-between; align-items: center;">
      במה playground שונה מ-13-week cash flow?
      <span style="margin-right: 1rem;">▼</span>
    </summary>
    <p style="margin-top: 1rem; color: inherit; line-height: 1.6;">ה-13-week הוא כלי טרזרי לניהול נזילות שוטף - מדויק, קצר טווח, לא לשחק בו. ה-playground הוא כלי החלטה - סנדבוקס ארוך טווח (בדרך כלל עד סוף השנה) שנועד בדיוק בשביל "מה אם", לא לניהול יומיומי של תזרים בפועל. משתמשים בשניהם, לצרכים שונים לגמרי.</p>
  </details>
  <details style="padding: 1.5rem; border: 1px solid rgba(20, 184, 166, 0.2); border-radius: 0.75rem; background: rgba(20, 184, 166, 0.05); cursor: pointer; transition: all 0.3s ease;" onmouseover="this.style.background='rgba(20, 184, 166, 0.1)'; this.style.borderColor='rgba(20, 184, 166, 0.4)';" onmouseout="this.style.background='rgba(20, 184, 166, 0.05)'; this.style.borderColor='rgba(20, 184, 166, 0.2)';">
    <summary style="font-weight: 600; font-size: 1.0625rem; color: rgb(20, 184, 166); outline: none; display: flex; justify-content: space-between; align-items: center;">
      אפשר לתת ל-CEO לגעת בקובץ בלי חשש?
      <span style="margin-right: 1rem;">▼</span>
    </summary>
    <p style="margin-top: 1rem; color: inherit; line-height: 1.6;">כן, וזו בדיוק הנקודה. הקובץ עצמאי ואופליין, חודשי actuals נעולים לחלוטין, ורק חודשי תוכנית ניתנים לעריכה. ה-CEO יכול לשנות הנחות ולראות תוצאה, בלי סיכון לשבש נתונים היסטוריים או לגעת במקור הנתונים שלכם.</p>
  </details>
</div>

אם היום כל "מה אם" דורש ממכם לפתוח גיליון ולבנות תרחיש מאפס, זה בדיוק המקום להתחיל לשנות.

## הצעד הבא

הצעד הבא שלך הוא לעוד מידע, תוכן ומדריכים לפני כולם. הירשם לבלוג שלי.

<div style="display: flex; justify-content: center; margin: 3rem 0;">
  <a href="https://www.ronenamoscpa.co.il/blog" style="
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
    הירשם לבלוג וקבל תוכן לפני כולם ←
  </a>
</div>
