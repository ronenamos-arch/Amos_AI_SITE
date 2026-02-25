"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { ImagePlus, Loader2, Save, X, ArrowLeft } from "lucide-react";
import RichTextEditor from "@/components/admin/RichTextEditor";

interface Article {
    slug: string;
    title: string;
    description: string | null;
    content: string;
    image_url: string | null;
    is_premium: boolean;
    tags: string[] | null;
}

export default function EditArticleClient({ article }: { article: Article }) {
    const router = useRouter();
    const supabase = createClient();

    // Form State — pre-populated from article
    const [title, setTitle] = useState(article.title);
    const [description, setDescription] = useState(article.description ?? "");
    const [content, setContent] = useState(article.content);
    const [isPremium, setIsPremium] = useState(article.is_premium);
    const [tags, setTags] = useState((article.tags ?? []).join(", "));

    // UI State
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState(article.image_url ?? "");
    const [error, setError] = useState("");

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            setUploading(true);
            const formData = new FormData();
            formData.append("file", file);
            formData.append("folder", "blog");
            const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
            if (!res.ok) {
                const { error } = await res.json();
                throw new Error(error || "Upload failed");
            }
            const { publicUrl } = await res.json();
            setImageUrl(publicUrl);
        } catch (err: any) {
            console.error("Upload error:", err);
            setError("חלה שגיאה בהעלאת התמונה.");
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async () => {
        if (!title || !content) {
            setError("נא למלא את שדות החובה (כותרת ותוכן)");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const { error: saveError } = await supabase
                .from('articles')
                .update({
                    title,
                    description,
                    content,
                    image_url: imageUrl,
                    is_premium: isPremium,
                    tags: tags.split(',').map(t => t.trim()).filter(Boolean),
                })
                .eq('slug', article.slug);

            if (saveError) throw saveError;

            router.push('/admin/blog');
            router.refresh();
        } catch (err: any) {
            console.error("Save error:", err);
            setError(err.message || "חלה שגיאה בשמירת המאמר.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-24 pb-16 min-h-screen">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        <button onClick={() => router.push('/admin/blog')} className="p-2 hover:bg-white/5 rounded-full transition-colors text-text-secondary">
                            <ArrowLeft className="h-6 w-6" />
                        </button>
                        <h1 className="text-3xl font-bold">עריכת מאמר</h1>
                    </div>
                    <div className="flex gap-4">
                        <Button onClick={handleSave} disabled={loading} className="px-8">
                            {loading ? <Loader2 className="h-4 w-4 animate-spin ml-2" /> : <Save className="h-4 w-4 ml-2" />}
                            שמור שינויים
                        </Button>
                    </div>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-center font-medium">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-right" dir="rtl">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <GlassCard className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold mb-2 text-teal-400">כותרת המאמר *</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-teal-400 text-2xl font-black transition-all"
                                    placeholder="הכנס כותרת מושכת..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-2 text-teal-400">תיאור קצר (תקציר)</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-teal-400 min-h-[100px] text-lg leading-relaxed transition-all"
                                    placeholder="תקציר שיופיע בכרטיס המאמר בבלוג..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-2 text-teal-400">תוכן המאמר *</label>
                                <RichTextEditor value={content} onChange={setContent} />
                            </div>
                        </GlassCard>
                    </div>

                    {/* Sidebar Settings */}
                    <div className="space-y-6">
                        <GlassCard className="space-y-6">
                            {/* Featured Image */}
                            <div>
                                <label className="block text-sm font-bold mb-3 text-teal-400">תמונת נושא</label>
                                {imageUrl ? (
                                    <div className="relative rounded-2xl overflow-hidden aspect-[16/10] border border-white/10 shadow-2xl">
                                        <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                                        <button
                                            onClick={() => setImageUrl("")}
                                            className="absolute top-3 right-3 p-2 bg-black/60 backdrop-blur-md rounded-full hover:bg-red-500 transition-all transform hover:scale-110"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <label className="flex flex-col items-center justify-center aspect-[16/10] rounded-2xl border-2 border-dashed border-white/10 hover:border-teal-400/50 hover:bg-teal-400/5 cursor-pointer transition-all group">
                                        {uploading ? (
                                            <Loader2 className="h-10 w-10 animate-spin text-teal-400" />
                                        ) : (
                                            <ImagePlus className="h-10 w-10 text-text-muted group-hover:text-teal-400 transition-colors" />
                                        )}
                                        <span className="mt-3 text-sm text-text-muted group-hover:text-teal-400 transition-colors">
                                            {uploading ? "מעלה תמונה..." : "לחץ להעלאת תמונת נושא"}
                                        </span>
                                        <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" disabled={uploading} />
                                    </label>
                                )}
                            </div>

                            {/* Slug — read-only to prevent breaking live URLs */}
                            <div>
                                <label className="block text-sm font-bold mb-2 text-teal-400">כתובת המאמר (Slug)</label>
                                <input
                                    type="text"
                                    value={article.slug}
                                    readOnly
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm font-mono text-text-muted text-left cursor-not-allowed opacity-60"
                                    dir="ltr"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-2 text-teal-400">תגיות (מופרד בפסיק)</label>
                                <input
                                    type="text"
                                    value={tags}
                                    onChange={(e) => setTags(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-teal-400"
                                    placeholder="AI, Excel, Finance..."
                                />
                            </div>

                            <div
                                onClick={() => setIsPremium(!isPremium)}
                                className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 cursor-pointer hover:bg-white/10 transition-all group"
                            >
                                <span className="text-sm font-bold group-hover:text-teal-400 transition-colors">מאמר פרימיום (נעול)</span>
                                <div className={`w-12 h-6 rounded-full transition-all relative ${isPremium ? 'bg-teal-500' : 'bg-white/20'}`}>
                                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-sm ${isPremium ? 'left-1' : 'left-7'}`} />
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </div>
        </div>
    );
}
