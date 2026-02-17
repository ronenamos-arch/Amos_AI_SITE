"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/Button";
import { LogOut, User as UserIcon } from "lucide-react";
import Link from "next/link";

export function UserMenu() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            setLoading(false);
        };

        getUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, [supabase]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        window.location.reload();
    };

    if (loading) return <div className="h-10 w-24 bg-white/5 animate-pulse rounded-lg" />;

    if (!user) {
        return (
            <Button href="/login" size="sm" variant="ghost">
                התחבר
            </Button>
        );
    }

    return (
        <div className="flex items-center gap-4">
            <Link href="/dashboard" className="flex items-center gap-2 group">
                <div className="h-8 w-8 rounded-full bg-teal-400/10 flex items-center justify-center border border-teal-400/20 group-hover:bg-teal-400/20 transition-all">
                    <UserIcon className="h-4 w-4 text-teal-400" />
                </div>
                <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary hidden sm:block">
                    {user.email?.split('@')[0]}
                </span>
            </Link>
            <button
                onClick={handleSignOut}
                className="p-2 text-text-muted hover:text-red-400 transition-colors"
                title="התנתק"
            >
                <LogOut className="h-4 w-4" />
            </button>
        </div>
    );
}
