import { SectionHeading } from "@/components/ui/SectionHeading";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export function Newsletter() {
    return (
        <section className="py-20">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                <SectionHeading
                    title="הישאר מעודכן"
                    subtitle="קבל טיפים, מדריכים ותובנות על AI וכספים — ישירות למייל, פעם בשבוע"
                    gradient
                />
                <div className="mt-8">
                    <NewsletterForm source="homepage" variant="card" />
                </div>
            </div>
        </section>
    );
}
