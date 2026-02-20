import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
    try {
        const { message, history } = await req.json();
        const apiKey = process.env.GOOGLE_AI_API_KEY;

        if (!apiKey) {
            return new Response(JSON.stringify({ error: "API Key missing" }), { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);

        // Attempting to use gemini-1.5-flash as it's the most stable free-tier model.
        // If 2.0 gave a "limit 0" error, it's likely restricted on this key/region.
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash-latest",
            systemInstruction: `אתה "עמוס Intelligence", עוזר ה-AI המקצועי של רונן עמוס.
      רונן עמוס הוא רו"ח ויועץ טכנולוגי פיננסי המתמחה ב-AI, Power BI ואוטומציות.
      ענה תמיד בעברית בצורה מקצועית ואדיבה.`,
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
