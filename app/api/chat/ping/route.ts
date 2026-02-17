export async function GET() {
    return new Response(JSON.stringify({ status: "ok", message: "API is reachable" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}
