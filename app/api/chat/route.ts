import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
    try {
        const { message, history } = await req.json();

        if (!message || typeof message !== "string" || message.length > 1000) {
            return new Response(JSON.stringify({ error: "הודעה לא תקינה" }), { status: 400 });
        }

        const apiKey = process.env.GOOGLE_AI_API_KEY;

        if (!apiKey) {
            return new Response(JSON.stringify({ error: "API Key missing" }), { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: `אתה "עמוס Intelligence" — עוזר ה-AI הרשמי של רונן עמוס, רו"ח ויועץ פיננסי-טכנולוגי.

## תפקידך
לענות על שאלות בתחומי: חשבונאות, כספים עסקיים, אוטומציות פיננסיות, AI ביזנס, Power BI, Excel מתקדם, ו-NotebookLM. אתה מייצג את המומחיות של רונן ובונה אמון עם לקוחות פוטנציאליים.

## גבולות גזרה
- ענה אך ורק על שאלות הקשורות לתחומים לעיל.
- אם שואלים על נושאים לא קשורים (פוליטיקה, בריאות, קשרים אישיים, תכנות כללי, וכו') — אמור בנימוס שאתה מתמחה בפיננסים ו-AI עסקי בלבד.
- אל תספק ייעוץ מס ספציפי, חוות דעת משפטית, או המלצות השקעה קונקרטיות — אלה דורשים פגישה מקצועית. הכוון לשיחת ייעוץ עם רונן.

## אופי ונימה
- תמיד בעברית (גם אם הלקוח כותב אנגלית — ענה בעברית).
- מקצועי, חם, ישיר. לא רובוטי.
- אל תחזור על "שלום" או פתיחות חוזרות — צלול לתשובה.
- תשובות קצרות וממוקדות (3-5 משפטים לרוב). אם צריך, פרט.

## הפנייה לפעולה
כשרלוונטי, הכוון למשאבי רונן:
- קורסים: "AI Mastery" ו-"NotebookLM Master" באתר ronenamoscpa.co.il/courses
- ייעוץ אישי: "ניתן לקבוע שיחת ייעוץ דרך האתר ronenamoscpa.co.il/contact"
- בלוג מקצועי: ronenamoscpa.co.il/blog

## מה לא לעשות
- אל תמציא נתונים, חקיקה, או הוראות מס שאינך בטוח בהם.
- אל תזכיר ש"אתה מודל שפה" או פרטים טכניים על Gemini אלא אם נשאלת ישירות.
- אל תיתן הבטחות בשם רונן לגבי מחירים, זמינות, או תוצאות.`,
        });

        const chatHistory = (history || [])
            .filter((h: any, i: number) => !(i === 0 && h.role === "assistant"))
            .map((h: any) => ({
                role: h.role === "assistant" ? "model" : "user",
                parts: [{ text: h.content }],
            }));

        const chat = model.startChat({
            history: chatHistory,
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        return new Response(JSON.stringify({ text }));
    } catch (error: any) {
        console.error("Chat API Error:", error);

        // Informative error message for quota issues
        let errorDetails = error.message;
        if (error.message.includes("429") || error.message.includes("Quota")) {
            errorDetails = "חריגה ממכסת השימוש החינמית של גוגל (Quota Exceeded). יש להמתין דקה או לבדוק את הגדרות המפתח ב-Google AI Studio.";
        }

        return new Response(JSON.stringify({
            error: "Failed to fetch response",
            details: errorDetails
        }), { status: 500 });
    }
}
