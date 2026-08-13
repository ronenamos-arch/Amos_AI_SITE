/**
 * Shape of a resource-hub carousel card.
 *
 * Lives in a plain module rather than beside the component: importing a type
 * out of a "use client" file makes the client-reference proxy resolve to
 * undefined at hydration time.
 */
export type ResourceCard = {
    href: string;
    title: string;
    category: string;
    desc: string;
    /** Placeholder artwork is used until a path is supplied here. */
    image?: string;
};
