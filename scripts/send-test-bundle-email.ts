import { loadEnvConfig } from '@next/env';
import { resolve } from 'path';

// Load .env.local
const projectDir = resolve(process.cwd());
loadEnvConfig(projectDir);

// Now import mailer which depends on env vars
import { sendBundlePurchaseEmail } from "../lib/mailer";

async function run() {
    console.log("Sending test bundle email...");
    const result = await sendBundlePurchaseEmail({
        to: "ronenamos@gmail.com",
        name: "רונן עמוס (בדיקה)",
        accessToken: "test-token-123456789"
    });
    console.log("Result:", result);
}

run();
