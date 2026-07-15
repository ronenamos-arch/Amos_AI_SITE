import { notFound, redirect } from "next/navigation";
import { getResourceBySlug } from "@/lib/resources-data";
import { getSubscriptionAccess } from "@/lib/subscription-access";
import { Paywall } from "@/components/blog/Paywall";

export const dynamic = "force-dynamic";

export default async function ResourceDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const resource = getResourceBySlug(slug);
    if (!resource) return notFound();

    const { hasAccess } = await getSubscriptionAccess();

    if (hasAccess || resource.free) {
        redirect(`/api/resources/${resource.slug}`);
    }

    return (
        <div className="pt-24 pb-16">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-black text-white mb-3">{resource.title}</h1>
                    <p className="text-slate-400">{resource.description}</p>
                </header>

                <Paywall
                    title="משאב פרימיום נעול"
                    description="שדרג למנוי פרימיום כדי לגשת למשאב זה ולכל משאבי הפרימיום האחרים."
                />
            </div>
        </div>
    );
}
