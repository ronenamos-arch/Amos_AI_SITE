"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { subscribeToNewsletter } from "@/lib/actions/newsletter";
import { Button } from "./Button";
import { Input } from "./Input";
import { X, CheckCircle, ArrowRight } from "lucide-react";

const GIFT_URL = "https://gamma.app/docs/13--arjgfdjt26gnn74?mode=doc";
const DISMISSAL_KEY = "newsletter-popup-dismissed";
const DISMISSAL_DURATION = 14 * 24 * 60 * 60 * 1000; // 14 days

export function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if popup was dismissed recently
    const dismissed = localStorage.getItem(DISMISSAL_KEY);
    if (dismissed) {
      const dismissalTime = parseInt(dismissed);
      if (Date.now() - dismissalTime < DISMISSAL_DURATION) {
        return; // Don't show popup
      } else {
        localStorage.removeItem(DISMISSAL_KEY); // Clear old dismissal
      }
    }

    // Show popup after 3 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem(DISMISSAL_KEY, Date.now().toString());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setError("");

    try {
      const result = await subscribeToNewsletter(email, "popup");
      if (result.success) {
        setIsSuccess(true);
        // Auto-close after 4 seconds to keep gift link visible briefly
        setTimeout(() => {
          handleClose();
        }, 4000);
      } else {
        setError(result.error || "An error occurred. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/85 z-[60] flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            dir="rtl"
          >
            <div className="bg-gradient-to-b from-slate-900/95 to-slate-950/95 border border-teal-400/20 rounded-3xl p-8 max-w-md backdrop-blur-xl shadow-2xl shadow-teal-500/20 relative">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute left-4 top-4 text-text-muted hover:text-teal-400 hover:bg-white/5 rounded-full p-2 transition-all"
                aria-label="סגור"
              >
                <X size={20} />
              </button>

              {!isSuccess ? (
                <>
                  {/* Gift emoji and heading */}
                  <div className="text-center mb-8 mt-2">
                    <div className="text-6xl mb-4 inline-block">🎁</div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent mb-3">
                      קיבלת מתנה ממני
                    </h2>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      מדריך מעשי: איך לבנות מודל תזרים מזומנים ל-13 שבועות עם Claude — צעד
                      אחר צעד
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                    <Input
                      type="email"
                      placeholder="הכנס את האימייל שלך"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isSubmitting}
                      error={error}
                      required
                    />

                    <Button
                      type="submit"
                      disabled={isSubmitting || !email}
                      className="w-full bg-gradient-to-r from-teal-400 to-cyan-400 text-black font-semibold hover:shadow-lg hover:shadow-teal-400/30"
                    >
                      {isSubmitting ? "שולח..." : "פתח את המדריך"}
                    </Button>
                  </form>
                </>
              ) : (
                <>
                  {/* Success state */}
                  <div className="text-center space-y-5 py-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <CheckCircle
                        size={64}
                        className="mx-auto text-emerald-400"
                      />
                    </motion.div>

                    <div>
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent mb-3">
                        נרשמת בהצלחה!
                      </h3>
                      <p className="text-sm text-slate-300 mb-6">
                        הנה הלינק למצגת:
                      </p>
                    </div>

                    <a
                      href={GIFT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block w-full bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 font-semibold px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-teal-400/50 transition-all hover:scale-105 active:scale-95 break-all text-center text-sm"
                    >
                      {GIFT_URL}
                    </a>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
