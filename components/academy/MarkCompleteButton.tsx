'use client';

import { useState, useTransition } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { updateContentProgress } from '@/lib/actions/progress';
import type { ContentType } from '@/lib/academy-data';

interface MarkCompleteButtonProps {
  contentType: ContentType;
  contentSlug: string;
  initialCompleted?: boolean;
}

export function MarkCompleteButton({
  contentType,
  contentSlug,
  initialCompleted = false,
}: MarkCompleteButtonProps) {
  const [completed, setCompleted] = useState(initialCompleted);
  const [isPending, startTransition] = useTransition();

  const toggle = () => {
    const nextState = !completed;
    setCompleted(nextState);

    startTransition(async () => {
      const res = await updateContentProgress(
        contentType,
        contentSlug,
        nextState ? 'completed' : 'not_started'
      );

      if (!res.success) {
        // Rollback state if server action fails
        setCompleted(!nextState);
      }
    });
  };

  return (
    <button
      onClick={toggle}
      disabled={isPending}
      className={`
        inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200
        ${
          completed
            ? 'bg-neon-teal/20 text-neon-teal border border-neon-teal/40 hover:bg-neon-teal/30'
            : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10 hover:text-white'
        }
        ${isPending ? 'opacity-50 cursor-wait' : ''}
      `}
      title={completed ? 'סמן כלא הושלם' : 'סמן כהושלם'}
    >
      {completed ? (
        <>
          <CheckCircle2 size={14} className="text-neon-teal" />
          <span>הושלם</span>
        </>
      ) : (
        <>
          <Circle size={14} />
          <span>סמן כהושלם</span>
        </>
      )}
    </button>
  );
}
