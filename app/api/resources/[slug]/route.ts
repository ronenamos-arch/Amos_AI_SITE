import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { getResourceBySlug, isResourceCurrentlyFree } from "@/lib/resources-data";
import { getSubscriptionAccess } from "@/lib/subscription-access";

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const resource = getResourceBySlug(slug);

    if (!resource) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (!isResourceCurrentlyFree(resource)) {
        const { hasAccess } = await getSubscriptionAccess();

        if (!hasAccess) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }
    }

    const filePath = path.join(process.cwd(), "content", "resources", resource.contentFile);
    let html: string;
    try {
        html = await readFile(filePath, "utf-8");
    } catch {
        console.error(`resource content file missing or unreadable: ${resource.contentFile}`);
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return new NextResponse(html, {
        headers: { "Content-Type": "text/html; charset=utf-8" },
    });
}
