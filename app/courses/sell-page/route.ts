import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
    const filePath = path.join(
        process.cwd(),
        "course-content",
        "ai-master-course",
        "sell-page.html"
    );

    let html = fs.readFileSync(filePath, "utf-8");

    // Fix asset paths so scripts and images load correctly
    html = html.replace(
        '<script src="./support.js">',
        '<script src="/course-assets/ai-master-course/support.js">'
    );
    html = html.replace(/src="Images\/([^"]+)"/g, 'src="/course-assets/ai-master-course/images/$1"');

    return new NextResponse(html, {
        headers: { "Content-Type": "text/html; charset=utf-8" },
    });
}
