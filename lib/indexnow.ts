const INDEXNOW_KEY = 'f9826b1b81c34964b0fa14797b4af314';
const BASE_URL = 'https://www.ronenamoscpa.co.il';
const KEY_LOCATION = `${BASE_URL}/${INDEXNOW_KEY}.txt`;

export async function pingIndexNow(slug: string): Promise<void> {
    const url = `${BASE_URL}/blog/${encodeURIComponent(slug)}`;
    const endpoint =
        `https://api.indexnow.org/indexnow` +
        `?url=${encodeURIComponent(url)}` +
        `&key=${INDEXNOW_KEY}` +
        `&keyLocation=${encodeURIComponent(KEY_LOCATION)}`;
    try {
        const res = await fetch(endpoint, { method: 'GET' });
        if (res.ok) {
            console.log(`[IndexNow] Pinged: ${url}`);
        } else {
            console.warn(`[IndexNow] Failed (${res.status}): ${url}`);
        }
    } catch (err) {
        // Non-blocking — IndexNow failure must never affect the save flow
        console.error('[IndexNow] Error:', err);
    }
}
