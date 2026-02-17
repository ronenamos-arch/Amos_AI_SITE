import * as React from "react";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, error, ...props }, ref) => {
        return (
            <div className="w-full">
                <input
                    type={type}
                    className={`flex h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-text-primary ring-offset-space-950 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all ${error ? "border-red-500/50 focus-visible:ring-red-500/50" : ""
                        } ${className}`}
                    ref={ref}
                    {...props}
                />
                {error && (
                    <p className="mt-1.5 text-xs font-medium text-red-500/80">{error}</p>
                )}
            </div>
        );
    }
);
Input.displayName = "Input";

export { Input };
