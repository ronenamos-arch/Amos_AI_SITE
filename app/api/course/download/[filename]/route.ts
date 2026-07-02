import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const FILES_DIR = path.join(process.cwd(), "course-content", "ai-master-course", "FILES");

const ALLOWED_EXTENSIONS = new Set([".xlsx", ".xls", ".pdf", ".csv"]);

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ filename: string }> }
) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { filename } = await params;

    // Security: block path traversal and restrict to allowed extensions
    if (filename.includes("..") || filename.includes("/") || filename.includes("\\")) {
        return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
    }

    const ext = path.extname(filename).toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(ext)) {
        return NextResponse.json({ error: "File type not allowed" }, { status: 400 });
    }

    // Search in FILES/ and its subdirectories (one level deep)
    const candidates = [
        path.join(FILES_DIR, filename),
    ];

    // Also check immediate subdirectories
    if (fs.existsSync(FILES_DIR)) {
        for (const entry of fs.readdirSync(FILES_DIR, { withFileTypes: true })) {
            if (entry.isDirectory()) {
                candidates.push(path.join(FILES_DIR, entry.name, filename));
            }
        }
    }

    const filePath = candidates.find((p) => fs.existsSync(p));
    if (!filePath) {
        return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);
    const contentType =
        ext === ".pdf"
            ? "application/pdf"
            : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

    return new NextResponse(fileBuffer, {
        headers: {
            "Content-Type": contentType,
            "Content-Disposition": `attachment; filename="${filename}"`,
            "Content-Length": String(fileBuffer.length),
        },
    });
}
