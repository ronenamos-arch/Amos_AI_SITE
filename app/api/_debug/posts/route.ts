import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";

export async function GET() {
  const posts = getAllPosts();
  return NextResponse.json({
    count: posts.length,
    slugs: posts.map((p) => p.slug),
    cwd: process.cwd(),
  });
}
