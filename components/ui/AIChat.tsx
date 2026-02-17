"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { X, Send, Sparkles, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
    role: "user" | "assistant";
    content: string;
}

export function AIChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "שלום! אני עמוס Intelligence. איך אני יכול לעזור לך לייעל את מחלקת הכספים שלך היום?" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");
        setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
        setIsLoading(true);

        try {
            // Use absolute path for safety if relative is failing
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    message: userMessage,
                    history: messages.map(m => ({
                        role: m.role,
                        content: m.content
                    })),
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.details || errorData.error || `Server returned ${response.status}`);
            }

            const data = await response.json();
            if (data.text) {
                setMessages((prev) => [...prev, { role: "assistant", content: data.text }]);
            } else {
                throw new Error("לא התקבלה תשובה תקינה מהשרת");
            }
        } catch (error: any) {
            console.error("Chat Error Detail:", error);
            let userFriendlyError = `שגיאה בתקשורת: ${error.message}`;

            if (error.message.includes("fetch failed")) {
                userFriendlyError = "החיבור לשרת נכשל. נסה לרענן את הדף או לבדוק אם השרת (npm run dev) עדיין רץ.";
            }

            setMessages((prev) => [...prev, { role: "assistant", content: userFriendlyError }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Floating Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-24 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 border-2 ${isOpen ? "bg-space-800 border-white/20" : "bg-white p-0 border-white overflow-hidden"
                    }`}
            >
                {isOpen ? (
                    <X className="h-6 w-6 text-white" />
                ) : (
                    <div className="relative h-full w-full">
                        <Image
                            src="/images/avatar-hero-2.jpg"
                            alt="רונן עמוס AI"
                            fill
                            className="object-cover"
                        />
                    </div>
                )}
                {!isOpen && (
                    <span className="absolute -top-1 -left-1 flex h-5 w-5 z-10">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-5 w-5 bg-teal-500 border-2 border-space-950"></span>
                    </span>
                )}
            </button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-44 right-6 z-50 w-[92vw] max-w-[420px] h-[550px] md:h-[650px] flex flex-col shadow-2xl"
                    >
                        <div className="flex-1 flex flex-col overflow-hidden rounded-3xl border border-white/20 bg-space-900 shadow-2xl shadow-black/50">
                            {/* Header */}
                            <div className="p-4 bg-space-800 border-b border-white/10 flex items-center justify-between">
                                <div className="flex items-center gap-3 text-right" dir="rtl">
                                    <div className="h-10 w-10 rounded-full border border-teal-400/30 overflow-hidden relative bg-white">
                                        <Image
                                            src="/images/avatar-hero-2.jpg"
                                            alt="רונן עמוס AI"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-white">עמוס Intelligence</h3>
                                        <div className="flex items-center gap-1.5 justify-end">
                                            <span className="text-[10px] text-teal-400 font-bold uppercase">מחובר כרגע</span>
                                            <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => setIsOpen(false)} className="text-text-muted hover:text-white p-2">
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Messages Area */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-space-900/50" dir="rtl">
                                {messages.map((msg, i) => (
                                    <div
                                        key={i}
                                        className={`flex ${msg.role === "user" ? "justify-start" : "justify-end"} items-start gap-3`}
                                    >
                                        <div className={`p-4 rounded-2xl max-w-[85%] text-sm leading-relaxed shadow-sm ${msg.role === "user"
                                                ? "bg-royal-500 text-white rounded-tr-none"
                                                : "bg-white/10 text-white border border-white/5 rounded-tl-none"
                                            }`}>
                                            {msg.content}
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex justify-end items-start gap-3 animate-pulse">
                                        <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/10">
                                            <Loader2 className="h-4 w-4 text-teal-400 animate-spin" />
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <form onSubmit={handleSubmit} className="p-4 bg-space-800 border-t border-white/10">
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="שאל אותי משהו..."
                                        className="w-full bg-space-950 border border-white/10 rounded-2xl py-4 px-5 pl-14 text-sm focus:outline-none focus:border-teal-400/50 transition-all text-white placeholder:text-text-muted"
                                        dir="rtl"
                                    />
                                    <button
                                        type="submit"
                                        disabled={isLoading || !input.trim()}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-royal-500 text-white hover:bg-royal-400 disabled:opacity-50 transition-all"
                                    >
                                        <Send className="h-5 w-5 rotate-180" />
                                    </button>
                                </div>
                                <div className="mt-3 text-[10px] text-center text-text-muted font-medium flex items-center justify-center gap-2">
                                    <Sparkles className="h-3 w-3 text-teal-400" />
                                    מופעל ע"י Gemini 1.5 Flash • רונן עמוס AI
                                </div>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
