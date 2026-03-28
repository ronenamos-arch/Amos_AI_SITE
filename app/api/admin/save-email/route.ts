import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import path from "path";
import fs from "fs";

const FILE_MAP: Record<string, string> = {
    welcome: "welcome.ts",
    day3: "drip-day3.ts",
    day7: "drip-day7.ts",
    day14: "drip-day14.ts",
};

export async function POST(request: NextRequest) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || user.email !== "ronenamos@gmail.com") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json() as { email?: string; content?: string };
    const { email, content } = body;

    if (!email || !content) {
        return NextResponse.json({ error: "Missing email or content" }, { status: 400 });
    }

    const filename = FILE_MAP[email];
    if (!filename) {
        return NextResponse.json({ error: "Unknown email type" }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), "lib", "emails", filename);
    fs.writeFileSync(filePath, content, "utf-8");
    return NextResponse.json({ success: true });
}
