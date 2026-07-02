import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";

// Maps URL slug → HTML filename on disk
const SLUG_TO_FILE: Record<string, string> = {
    "index": "course-index.html",
    "module-00": "module-00.html",
    "module-01": "module-01.html",
    "module-02": "module-02.html",
    "module-03": "module-03.html",
    "module-04": "module-04.html",
    "module-05": "module-05.html",
    "module-06": "module-06.html",
    "module-07": "module-07.html",
    "module-08": "module-08.html",
    "module-09": "module-09.html",
    "module-10": "module-10.html",
    "module-11": "module-11.html",
    "module-12": "module-12.html",
    "module-13": "module-13.html",
    "module-14": "module-14.html",
    "module-15": "module-15.html",
    "102-prompt": "102-Prompt.html",
    "50-ways-ai": "50-ways-ai.html",
    "claude-code-guide": "claude-code-guide.html",
    "opus47-playbook-he": "opus47-playbook-he.html",
    "price-framework": "price-framework.html",
    "ronen-claude-playbook-he": "ronen-claude-playbook-he.html",
    "sell-page": "sell-page.html",
    "steps": "steps.html",
};

const COURSE_BASE = "/courses/ai-master-course";
const CONTENT_DIR = path.join(process.cwd(), "course-content", "ai-master-course");
const IMAGES_BASE = "/course-assets/ai-master-course/images";

function rewriteLinks(html: string): string {
    // Rewrite HTML file links → Next.js paths
    for (const [slug, filename] of Object.entries(SLUG_TO_FILE)) {
        // Escape special chars in filename for regex (handles spaces and parens)
        const escaped = filename.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const target = slug === "index" ? COURSE_BASE + "/" : `${COURSE_BASE}/${slug}`;
        html = html.replace(new RegExp(`href=["']${escaped}["']`, "g"), `href="${target}"`);
    }

    // Rewrite image src paths: Images/ → CDN path
    html = html.replace(/src=["']Images\/([^"']+)["']/g, `src="${IMAGES_BASE}/$1"`);

    // Rewrite download links: FILES/ → authenticated download API
    html = html.replace(/href=["']FILES\/([^"']+)["']/g, `href="/api/course/download/$1"`);

    return html;
}

export default async function CourseHtmlPage({
    params,
}: {
    params: Promise<{ slug?: string[] }>;
}) {
    const { slug } = await params;
    const slugKey = slug && slug.length > 0 ? slug[0] : "index";
    const filename = SLUG_TO_FILE[slugKey];

    if (!filename) {
        notFound();
    }

    const filePath = path.join(CONTENT_DIR, filename);
    if (!fs.existsSync(filePath)) {
        notFound();
    }

    let html = fs.readFileSync(filePath, "utf-8");
    html = rewriteLinks(html);

    return (
        <div
            dangerouslySetInnerHTML={{ __html: html }}
            className="course-html-wrapper"
        />
    );
}

export async function generateStaticParams() {
    return [
        { slug: undefined },
        ...Object.keys(SLUG_TO_FILE)
            .filter((k) => k !== "index")
            .map((slug) => ({ slug: [slug] })),
    ];
}
