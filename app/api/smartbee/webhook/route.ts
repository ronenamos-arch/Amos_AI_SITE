/**
 * SmartBee Webhook endpoint redirect/alias.
 * Re-exports the primary handler from app/api/webhooks/smartbee/route.ts
 * so that both /api/smartbee/webhook and /api/webhooks/smartbee work identically.
 */

export const runtime = "nodejs";
export { POST } from "@/app/api/webhooks/smartbee/route";
