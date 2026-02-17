"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { GlassCard } from "@/components/ui/GlassCard";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Loader2, Mail, Lock, Chrome } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const supabase = createClient();

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setMessage({ type: "error", text: "שגיאה בהתחברות: " + error.message });
        } else {
            window.location.href = "/";
        }
        setLoading(false);
    };

    const handleSignUp = async () => {
        setLoading(true);
        setMessage(null);

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        if (error) {
            setMessage({ type: "error", text: "שגיאה בהרשמה: " + error.message });
        } else {
            setMessage({ type: "success", text: "נשלח אימייל אישור לתיבה שלך." });
        }
        setLoading(false);
    };

    const handleGoogleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
    };

    return (
        <div className="pt-32 pb-20 min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <SectionHeading title="התחברות למערכת" subtitle="גש לתכני הפרימיום ולקהילה שלנו" gradient />
                </div>

                <GlassCard className="p-8">
                    {message && (
                        <div className={`mb-6 p-4 rounded-xl text-sm ${message.type === 'success' ? 'bg-teal-400/10 text-teal-400 border border-teal-400/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleEmailLogin} className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-text-muted mr-1">אימייל</label>
                            <div className="relative">
                                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                                <Input
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pr-10"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-medium text-text-muted mr-1">סיסמה</label>
                            <div className="relative">
                                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pr-10"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 pt-2">
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "התחבר"}
                            </Button>
                            <Button type="button" onClick={handleSignUp} variant="ghost" className="w-full" disabled={loading}>
                                צור חשבון חדש
                            </Button>
                        </div>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-white/5"></span>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-transparent px-2 text-text-muted">או התחבר באמצעות</span>
                        </div>
                    </div>

                    <Button
                        onClick={handleGoogleLogin}
                        variant="secondary"
                        className="w-full gap-3"
                        disabled={loading}
                    >
                        <Chrome className="h-4 w-4" />
                        התחבר עם Google
                    </Button>
                </GlassCard>

                <p className="mt-8 text-center text-sm text-text-muted">
                    בעצם ההתחברות אתה מסכים לתנאי השימוש ומדיניות הפרטיות שלנו.
                </p>
            </div>
        </div>
    );
}
