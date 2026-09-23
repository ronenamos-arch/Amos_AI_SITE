import { getSubscriptionAccess } from "@/lib/subscription-access";
import { SkillVaultClient } from "@/components/skill-vault/SkillVaultClient";

export const dynamic = "force-dynamic";

export default async function SkillVaultPage() {
    const { user, hasAccess } = await getSubscriptionAccess();
    return <SkillVaultClient userEmail={user?.email || null} isPro={hasAccess} />;
}
