"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { X, Send, Sparkles, Loader2 } from "lucide-react";

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
            setTimeout(scrollToBottom, 100);
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
                throw new Error(errorData.details || errorData.error || `שגיאת שרת ${response.status}`);
            }

            const data = await response.json();
            if (data.text) {
                setMessages((prev) => [...prev, { role: "assistant", content: data.text }]);
            } else {
                throw new Error("לא התקבלה תשובה תקינה מהשרת");
            }
        } catch (error: unknown) {
            console.error("Chat Error:", error);
            const errMsg = error instanceof Error ? error.message : "שגיאה לא ידועה";
            let userFriendlyError = `שגיאה: ${errMsg}`;

            if (errMsg.includes("fetch failed") || errMsg.includes("network")) {
                userFriendlyError = "החיבור לשרת נכשל. נסה לרענן את הדף.";
            } else if (errMsg.includes("429") || errMsg.includes("Quota")) {
                userFriendlyError = "חריגה ממכסת השימוש. נסה שוב בעוד דקה.";
            }

            setMessages((prev) => [...prev, { role: "assistant", content: userFriendlyError }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Chat Window - CSS transitions instead of framer-motion */}
            <div
                className="fixed z-50"
                style={{
                    bottom: "12.5rem",
                    right: "1.5rem",
                    width: "min(92vw, 420px)",
                    height: isOpen ? "min(600px, 80vh)" : "0px",
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
                    transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                    pointerEvents: isOpen ? "auto" : "none",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <div
                    className="flex-1 flex flex-col overflow-hidden shadow-2xl"
                    style={{
                        borderRadius: "1.5rem",
                        border: "1px solid rgba(255,255,255,0.15)",
                        background: "#0f172a",
                        boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
                    }}
                >
                    {/* Header */}
                    <div
                        className="p-4 flex items-center justify-between flex-shrink-0"
                        style={{
                            background: "#1e293b",
                            borderBottom: "1px solid rgba(255,255,255,0.08)",
                            borderRadius: "1.5rem 1.5rem 0 0",
                        }}
                    >
                        <div className="flex items-center gap-3" dir="rtl">
                            <div
                                className="h-10 w-10 rounded-full overflow-hidden relative flex-shrink-0"
                                style={{ border: "1px solid rgba(45,212,191,0.3)", background: "white" }}
                            >
                                <Image
                                    src="/images/avatar-hero-2.jpg"
                                    alt="רונן עמוס AI"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-white">עמוס Intelligence</h3>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-[10px] font-bold uppercase" style={{ color: "#2dd4bf" }}>מחובר כרגע</span>
                                    <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: "#2dd4bf" }} />
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 rounded-lg transition-colors hover:bg-white/10"
                            style={{ color: "#94a3b8" }}
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div
                        className="flex-1 overflow-y-auto p-4 space-y-3"
                        dir="rtl"
                        style={{ background: "rgba(15,23,42,0.5)" }}
                    >
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`flex ${msg.role === "user" ? "justify-start" : "justify-end"} items-start gap-2`}
                            >
                                <div
                                    className="p-3 rounded-2xl max-w-[85%] text-sm leading-relaxed"
                                    style={msg.role === "user"
                                        ? {
                                            background: "#3b82f6",
                                            color: "white",
                                            borderTopRightRadius: "4px",
                                        }
                                        : {
                                            background: "rgba(255,255,255,0.08)",
                                            color: "#e2e8f0",
                                            border: "1px solid rgba(255,255,255,0.08)",
                                            borderTopLeftRadius: "4px",
                                        }
                                    }
                                >
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-end items-start">
                                <div
                                    className="p-4 rounded-2xl"
                                    style={{
                                        background: "rgba(255,255,255,0.05)",
                                        border: "1px solid rgba(255,255,255,0.08)",
                                        borderTopLeftRadius: "4px",
                                    }}
                                >
                                    <Loader2 className="h-4 w-4 animate-spin" style={{ color: "#2dd4bf" }} />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form
                        onSubmit={handleSubmit}
                        className="p-4 flex-shrink-0"
                        style={{
                            background: "#1e293b",
                            borderTop: "1px solid rgba(255,255,255,0.08)",
                            borderRadius: "0 0 1.5rem 1.5rem",
                        }}
                    >
                        <div className="relative">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="שאל אותי משהו..."
                                className="w-full rounded-2xl py-4 px-5 pl-14 text-sm focus:outline-none transition-all"
                                style={{
                                    background: "#020617",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    color: "white",
                                }}
                                dir="rtl"
                                onFocus={(e) => {
                                    e.target.style.borderColor = "rgba(45,212,191,0.5)";
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = "rgba(255,255,255,0.1)";
                                }}
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl text-white transition-all disabled:opacity-40 hover:opacity-90"
                                style={{ background: "#3b82f6" }}
                            >
                                <Send className="h-4 w-4 rotate-180" />
                            </button>
                        </div>
                        <div className="mt-2 text-[10px] text-center flex items-center justify-center gap-2" style={{ color: "#64748b" }}>
                            <Sparkles className="h-3 w-3" style={{ color: "#2dd4bf" }} />
                            מופעל ע&quot;י Gemini 1.5 Flash • רונן עמוס AI
                        </div>
                    </form>
                </div>
            </div>

            {/* Floating Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed z-50 flex h-16 w-16 items-center justify-center rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
                style={{
                    bottom: "6.5rem",
                    right: "1.5rem",
                    background: isOpen ? "#1e293b" : "white",
                    border: isOpen ? "2px solid rgba(255,255,255,0.2)" : "2px solid white",
                    overflow: "hidden",
                }}
                aria-label="פתח צ'אט"
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
                    <span className="absolute -top-1 -left-1 flex h-4 w-4 z-10">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "#2dd4bf" }}></span>
                        <span className="relative inline-flex rounded-full h-4 w-4" style={{ background: "#14b8a6", border: "2px solid #020617" }}></span>
                    </span>
                )}
            </button>
        </>
    );
}
