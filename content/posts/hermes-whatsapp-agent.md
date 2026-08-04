---
title: "עוזר AI שרץ מה-WhatsApp: המדריך המלא להקמת Hermes לצוות הכספים"
date: "2026-08-04"
excerpt: "Hermes הוא AI agent open-source שיושב על מחשב פרטי או שרת זול, ומדבר איתכם ב-WhatsApp כמו איש צוות. מעל 200,000 כוכבים ב-GitHub. הנה המדריך המלא - מהתקנה ראשונה ועד routines אוטומטיים - עם דוגמאות שמתאימות בדיוק לתפקיד הכספים."
image: "/images/blog/hermes-whatsapp-agent-header.png"
tags: ["AI Agents", "WhatsApp Automation", "FP&A", "אוטומציה"]
premium: "true"
---

![Build Your Own Claude Agent - מדריך הקמה לעוזר AI אישי](/images/blog/hermes-whatsapp-agent-header.png)

יש agent בשם Hermes שהפך לאחת התופעות המדוברות בקהילת ה-AI בחודשים האחרונים: מעל 200,000 כוכבים ב-GitHub, ה-agent המדורג ראשון ב-OpenRouter, ואפילו NVIDIA כתבה עליו פוסט. הרעיון: AI שיושב על המחשב הפרטי שלכם, זוכר אתכם, וכותב לכם ב-WhatsApp כמו איש צוות - לא עוד טאב בדפדפן ששוכחים לסגור.

בשונה מהכלים שרוב אנשי הכספים מכירים (ChatGPT בצ'אט, Claude בדפדפן), Hermes **רץ ברקע ועובד לבד**. אתם שולחים לו הודעה, הוא מבצע את המשימה - כולל דברים שדורשים גישה למחשב שלכם - וחוזר אליכם כשסיים.

## מה זה בעצם

Hermes הוא AI assistant open-source וחינמי, שמותקן על מחשב אישי או שרת זול (כ-5 דולר בחודש), ונשאר שם פעיל. שלושה דברים הופכים אותו לשונה מצ'אטבוט רגיל:

![What makes Hermes different - שלושה דברים שצ'אטבוט רגיל לא יודע לעשות](/images/blog/hermes-whatsapp-agent-1.png)

**הוא זוכר אתכם.** אותה זיכרון בכל שיחה - לא צריך להסביר מחדש כל פעם איך הכספים של החברה שלכם עובדים.

**הוא משתפר בעצמו.** כשהוא פותר משימה, הוא כותב לעצמו "skill" קטן ומשתמש בו שוב בפעם הבאה.

**הוא רץ לבד.** שולחים לו הודעה ב-WhatsApp או Telegram, והוא ממשיך לעבוד ברקע בזמן שאתם עושים משהו אחר.

![Where Hermes fits - השוואה ל-ChatGPT ו-n8n](/images/blog/hermes-whatsapp-agent-2.png)

ה-ROI: תוכנה חינמית, שרת ב-5 דולר בחודש, ותשלום רק על שימוש ב-AI עצמו - בדרך כלל כמה דולרים. יש מי שמריץ את כל המערכת שלו בפחות מ-20 דולר בחודש.

## לפני שמתקינים - זה autonomous, לא demo

Hermes הוא agent אוטונומי: הוא יכול להריץ פקודות על המחשב שלכם בעצמו. זו לא תכונה להתייחס אליה בקלות ראש - זה כמו לתת מפתח לדירה.

לכן, לפני שמתחילים: השאירו את הגדרות האישור (approval) דלוקות, הריצו אותו על שרת זול וזמין להחלפה, ונעלו אותו כך שרק אתם יכולים לשלוח לו הודעות. וכלל הזהב שתמיד שווה לחזור עליו: אל תרדפו אחרי הכלי לפני שאתם יודעים מה הבעיה שלכם. Hermes לא יתקן תהליך כספים מבולגן - הוא רק ירוץ עליו מהר יותר.

## התקנה ראשונית - 5 הגדרות

מי שנוח לו עם terminal, ההתקנה היא שורה אחת:

```
curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
```

אחרי ההתקנה, חמש הגדרות בסיס:

1. **לבחור את "המוח"** - איזה מודל AI מפעיל אותו (`hermes setup --portal`)
2. **להדליק זיכרון** - כדי שיזכור אתכם, ולספר לו במה עוסקת החברה
3. **לשים אותו בקופסה בטוחה** - sandbox עם הגדרות אישור דלוקות (`hermes config set terminal.backend docker`)
4. **לנעול לערוץ אחד** - לחבר Telegram או WhatsApp ולתת גישה רק למספר שלכם
5. **לתת לו משימה ראשונה** - במילים פשוטות: "כל יום חול ב-9:00, סכם לי את המייל ושלח אליי"

תקוע? `hermes doctor` אומר בדיוק מה לא תקין.

## איזה מודל, ולמה

Hermes מאפשר לחבר כל AI כ"מוח" שלו, כולל שני מודלים במקביל - אחד יקר לתכנון, אחד זול לביצוע.

![Which model, and why - מוח יקר לתכנון, ידיים זולות לביצוע](/images/blog/hermes-whatsapp-agent-3.png)

הכלל: **מודל יקר איפה שהחשיבה קורית. מודל זול איפה שהנפח קורה.** תכנון הוא פרוסה קטנה מהעבודה - שווה לשלם עליה פרימיום, כי תוכנית טובה חוסכת טעויות יקרות. ביצוע - קריאה, ניסוח, הרצת שלבים - הוא המקום שרוב הטוקנים נשרפים בו, ולכן שם נמצא החיסכון האמיתי.

יש גם אפשרויות נוספות למי שרוצה זול יותר או פרטי לגמרי:

![Cheap, or fully private - שתי חלופות נוספות](/images/blog/hermes-whatsapp-agent-4.png)

מודל בענן זול (DeepSeek, למשל) נותן איכות קרובה לפרימיום במחיר שבר. מודל מקומי (Qwen, Llama) עם Ollama לא שולח כלום החוצה מהמחשב - בלי חשבון טוקנים בכלל, אבל דורש GPU סביר וקצת יותר חלש במשימות קשות.

## רוצים לבנות agent כזה משלכם, שלב אחר שלב

מעבר להתקנה המהירה של Hermes, יש מדריך מקיף בשם "Build Your Own Claude Agent" שפורס את כל התהליך ל-26 שלבים בנויים - מהקמת בוט ראשוני, דרך שכבת זיכרון, מערכת כלים, ועד אישורים ומעקב עלויות. הוא לא מכריח לבנות הכול: יש בו "תפריט תכונות" בהתחלה שעוזר לבחור מה רלוונטי לכם ומה לדלג עליו, כולל prompt מוכן שמעבירים ל-AI כדי לקבל תוכנית בנייה מותאמת אישית לפני שכותבים שורת קוד אחת.

<div style="display: flex; justify-content: center; margin: 2rem 0;">
  <a href="https://claude-agent-2.vercel.app/#preflight" style="
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
    למדריך ההתקנה המלא - 26 שלבים ←
  </a>
</div>

## דוגמאות שימוש שמתאימות לצוות כספים

הרעיון המקורי מאחורי Hermes מגיע מעולם השיווק והתוכן, אבל אותה תשתית מתאימה בול לתפקיד כספים - חיבור למערכת הנה"ח, מעקב משימות סגירה, ומחקר שוק.

**חיבור API למערכת הנה"ח לקריאה בלבד.** Hermes יכול להתחבר ל-API של מערכת החשבונאות (קריאה בלבד) ולענות על שאלות ישירות מה-WhatsApp: אילו חשבוניות פתוחות, מי באיחור תשלום, מה הסכום והמטבע.

![דוגמה לחיבור API למערכת הנהלת חשבונות - שאילתת חשבוניות דרך WhatsApp](/images/blog/hermes-whatsapp-agent-6.png)

**מעקב משימות צוות ב-Notion.** אם תיקיית העבודה של הצוות (checklist סגירה, SOPs, לוחות זמנים) יושבת ב-Notion, Hermes יכול לקרוא ולעדכן אותה ישירות מ-WhatsApp - מי סיים את ה-reconciliation, למי עוד יש פריטים פתוחים, בלי לפתוח את Notion בכלל.

![יכולות חיפוש ועדכון ב-Notion דרך WhatsApp](/images/blog/hermes-whatsapp-agent-5.png)

**מחקר ואיסוף מידע.** דרך Apify, Hermes יכול לגרד מידע פומבי (מחירי מתחרים, דוחות ציבוריים, מאמרים רלוונטיים) ולסכם אותו - שימושי למי שמכין benchmark תמחור או ניתוח שוק.

![יכולות Apify - הרצת scrapers ואיסוף נתונים באופן אוטומטי](/images/blog/hermes-whatsapp-agent-7.png)

## אוטומציה בלילה - routines מתוזמנים

התכונה שהופכת את זה לשווה את המאמץ: Hermes אף פעם לא ישן, והוא יכול להריץ **routines מתוזמנים** (cron) - בלי שתצטרכו לבקש כל פעם מחדש.

זה המקום שבו אפשר לזרוק אליו את כל הדברים שאף פעם אין זמן אליהם: כל בוקר לפני שמתחילים - סיכום תזרים, רשימת חשבוניות שעברו את מועד הפירעון, סטטוס משימות הסגירה. הכול מחכה כשפותחים את הטלפון, בלי שאתם צריכים לבקש.

הכלל הפשוט: AI טוב כמו הקונטקסט שיש לו, ואף אחד לא רוצה להזין קונטקסט ידנית כל פעם - routines הם הפתרון. הם נותנים ל-agent הזדמנויות למידה מתוזמנות בזמן שאתם ישנים, כך שכשאתם פותחים אותו בבוקר, הוא כבר מעודכן.

<div style="display: grid; grid-template-columns: 1fr; gap: 1.5rem; margin: 2rem 0;">
  <details style="padding: 1.5rem; border: 1px solid rgba(20, 184, 166, 0.2); border-radius: 0.75rem; background: rgba(20, 184, 166, 0.05); cursor: pointer; transition: all 0.3s ease;" onmouseover="this.style.background='rgba(20, 184, 166, 0.1)'; this.style.borderColor='rgba(20, 184, 166, 0.4)';" onmouseout="this.style.background='rgba(20, 184, 166, 0.05)'; this.style.borderColor='rgba(20, 184, 166, 0.2)';">
    <summary style="font-weight: 600; font-size: 1.0625rem; color: rgb(20, 184, 166); outline: none; display: flex; justify-content: space-between; align-items: center;">
      זה בטוח לחבר agent כזה למערכות פיננסיות?
      <span style="margin-right: 1rem;">▼</span>
    </summary>
    <p style="margin-top: 1rem; color: inherit; line-height: 1.6;">רק אם שומרים על הכללים הבסיסיים: גישת קריאה בלבד למערכות רגישות, שער אישור אנושי לפני כל פעולה שמשנה נתונים, ונעילת ה-agent כך שרק אתם יכולים לשלוח לו הודעות. אף פעולה שכותבת לרשומות חשבונאיות לא צריכה לרוץ בלי אישור מפורש - זו אותה עקרונית עבודה שחלה על כל agent פיננסי, לא רק Hermes.</p>
  </details>
  <details style="padding: 1.5rem; border: 1px solid rgba(20, 184, 166, 0.2); border-radius: 0.75rem; background: rgba(20, 184, 166, 0.05); cursor: pointer; transition: all 0.3s ease;" onmouseover="this.style.background='rgba(20, 184, 166, 0.1)'; this.style.borderColor='rgba(20, 184, 166, 0.4)';" onmouseout="this.style.background='rgba(20, 184, 166, 0.05)'; this.style.borderColor='rgba(20, 184, 166, 0.2)';">
    <summary style="font-weight: 600; font-size: 1.0625rem; color: rgb(20, 184, 166); outline: none; display: flex; justify-content: space-between; align-items: center;">
      במה זה שונה מ-Claude רגיל או Cowork?
      <span style="margin-right: 1rem;">▼</span>
    </summary>
    <p style="margin-top: 1rem; color: inherit; line-height: 1.6;">Hermes הוא agnostic למודל (אפשר לחבר כל AI, לא רק Claude), open-source לגמרי ובבעלותכם המלאה, ורץ באופן קבוע על מחשב או שרת שלכם - כולל routines בלילה. Claude ו-Cowork נותנים חוויה מוכנה ומנוהלת בלי צורך בהתקנה או תחזוקה. הבחירה תלויה אם אתם רוצים כלי שמתופעל עבורכם, או תשתית שאתם מרכיבים ומתחזקים בעצמכם.</p>
  </details>
</div>

בין אם זה Hermes על השרת שלכם או פתרון מנוהל, השאלה האמיתית היא לא איזה כלי - היא איזה תהליך אתם רוצים שיפסיק לדרוש מכם נוכחות פיזית.

## הצעד הבא

הצעד הבא שלך הוא לעוד מידע, תוכן ומדריכים לפני כולם. הצטרפו לקורסים שלי.

<div style="display: flex; justify-content: center; margin: 3rem 0;">
  <a href="https://www.ronenamoscpa.co.il/courses" style="
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
    לקורסים שלי — הצטרפו עכשיו ←
  </a>
</div>
