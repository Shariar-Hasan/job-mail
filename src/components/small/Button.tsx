import { cn } from "@/lib/cn";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    loadingText?: string;
    variant?: "solid" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
}

const spinner = (
    <svg className="animate-spin mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
);

const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded transition focus:outline-none focus:ring-2 focus:ring-green-400 disabled:opacity-60 disabled:cursor-not-allowed";

const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
};

const variantStyles = {
    solid: "bg-green-600 text-white hover:bg-green-700",
    outline: "border border-green-600 text-green-700 bg-white hover:bg-green-50",
    ghost: "text-green-700 bg-transparent hover:bg-green-50",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        { children, loading, loadingText = "Loading...", variant = "solid", size = "md", className, ...props },
        ref
    ) => (
        <button
            ref={ref}
            className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
            disabled={loading || props.disabled}
            {...props}
        >
            {loading ? (
                <>
                    {spinner}
                    {loadingText}
                </>
            ) : (
                children
            )}
        </button>
    )
);
Button.displayName = "Button";

export default Button;
